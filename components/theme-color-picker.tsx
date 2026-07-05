"use client";

import { Check, Palette } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ColorPicker } from "@/components/ui/color-picker";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  applySiteTheme,
  applyThemePalette,
  colorsMatch,
  normalizeHex,
  DEFAULT_SITE_THEME,
  getActivePaletteId,
  getSiteThemeConfig,
  paletteSelected,
  ROLE_COLOR_PRESETS,
  saveSiteThemeConfig,
  SITE_COLOR_LABELS,
  SITE_COLOR_ROLES,
  THEME_PALETTE_ORDER,
  THEME_PALETTES,
  type RoleColorPreset,
  type SiteColorRole,
  type SiteColorValues,
  type SiteThemeChangeDetail,
  type ThemePalette,
} from "@/lib/site-theme";

function PaletteButton({
  palette,
  selected,
  onSelect,
}: {
  palette: ThemePalette;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <Button
      type="button"
      variant={selected ? "default" : "outline"}
      size="sm"
      onClick={onSelect}
      className="flex-1"
      aria-pressed={selected}
    >
      {palette.label}
    </Button>
  );
}

function RolePresetSwatch({
  preset,
  selected,
  onSelect,
}: {
  preset: RoleColorPreset;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={onSelect}
          style={{ backgroundColor: preset.color }}
          className="relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={`${preset.label} preset`}
        >
          {selected && <Check className="size-4 text-white drop-shadow-sm" />}
        </button>
      </TooltipTrigger>
      <TooltipContent side="top">{preset.label}</TooltipContent>
    </Tooltip>
  );
}

function RoleColorPicker({
  role,
  label,
  value,
  onChange,
}: {
  role: SiteColorRole;
  value: string;
  label: string;
  onChange: (color: string) => void;
}) {
  const hexValue = normalizeHex(value);

  return (
    <div className="flex items-center justify-between gap-3">
      <Label className="shrink-0">{label}</Label>
      <div className="flex shrink-0 items-center gap-1.5">
        {ROLE_COLOR_PRESETS[role].map((preset) => (
          <RolePresetSwatch
            key={preset.color}
            preset={preset}
            selected={colorsMatch(value, preset.color)}
            onSelect={() => onChange(preset.color)}
          />
        ))}
        <ColorPicker value={hexValue} onChange={onChange} />
      </div>
    </div>
  );
}

type ThemeColorPickerProps = {
  variant?: "dock" | "sidebar";
};

export function ThemeColorPicker({ variant = "dock" }: ThemeColorPickerProps) {
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState<SiteColorValues>(DEFAULT_SITE_THEME);
  const [activePaletteId, setActivePaletteId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setConfig(getSiteThemeConfig());
    setActivePaletteId(getActivePaletteId());

    const onThemeChange = (event: Event) => {
      const { colors, paletteId } = (
        event as CustomEvent<SiteThemeChangeDetail>
      ).detail;
      setConfig(colors);
      setActivePaletteId(paletteId);
    };

    window.addEventListener("site-theme-change", onThemeChange);
    return () => window.removeEventListener("site-theme-change", onThemeChange);
  }, []);

  const applyPalette = useCallback(
    (palette: ThemePalette) => {
      let shouldApply = false;

      setConfig((current) => {
        if (paletteSelected(current, palette, activePaletteId)) return current;
        shouldApply = true;
        return { ...palette.colors };
      });

      if (shouldApply) {
        applyThemePalette(palette);
        setActivePaletteId(palette.id);
      }
    },
    [activePaletteId],
  );

  const updateRoleColor = useCallback((role: SiteColorRole, color: string) => {
    let next: SiteColorValues | null = null;

    setConfig((current) => {
      if (colorsMatch(current[role], color)) return current;

      next = {
        ...current,
        [role]: color,
      };
      return next;
    });

    if (next) {
      saveSiteThemeConfig(next);
      applySiteTheme(next);
    }
  }, []);

  const popoverContent = (
    <PopoverContent
      side={variant === "sidebar" ? "right" : "top"}
      align={variant === "sidebar" ? "start" : "center"}
      className="w-80"
      sideOffset={variant === "sidebar" ? 8 : 16}
      onOpenAutoFocus={(event) => event.preventDefault()}
    >
      <div className="space-y-4">
        <div className="space-y-1">
          <p className="text-sm font-medium">Site colors</p>
          <p className="text-muted-foreground text-xs">
            Pick a palette or fine-tune each color.
          </p>
        </div>

        <div className="space-y-2">
          <Label>Palette</Label>
          <div className="flex items-center gap-2">
            {THEME_PALETTE_ORDER.map((id) => (
              <PaletteButton
                key={id}
                palette={THEME_PALETTES[id]}
                selected={paletteSelected(
                  config,
                  THEME_PALETTES[id],
                  activePaletteId,
                )}
                onSelect={() => applyPalette(THEME_PALETTES[id])}
              />
            ))}
          </div>
        </div>

        <div className="space-y-3 border-t pt-3">
          <p className="text-muted-foreground text-xs">Fine-tune colors</p>
          {SITE_COLOR_ROLES.map((role) => (
            <RoleColorPicker
              key={role}
              role={role}
              label={SITE_COLOR_LABELS[role]}
              value={config[role]}
              onChange={(color) => updateRoleColor(role, color)}
            />
          ))}
        </div>
      </div>
    </PopoverContent>
  );

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        type="button"
        size="icon"
        className={variant === "sidebar" ? "px-2" : "size-12 px-2"}
        disabled
      >
        <Palette
          className={
            variant === "sidebar"
              ? "h-[1.2rem] w-[1.2rem] text-foreground"
              : "size-4"
          }
        />
      </Button>
    );
  }

  if (variant === "sidebar") {
    return (
      <Tooltip>
        <Popover open={open} onOpenChange={setOpen}>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                type="button"
                size="icon"
                className="px-2"
              >
                <Palette className="h-[1.2rem] w-[1.2rem] text-foreground" />
                <span className="sr-only">Colors</span>
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          {popoverContent}
        </Popover>
        <TooltipContent>
          <p>Colors</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Tooltip>
      <Popover open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="size-12 px-2">
              <Palette className="size-4" />
              <span className="sr-only">Color theme</span>
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        {popoverContent}
      </Popover>
      <TooltipContent>
        <p>Colors</p>
      </TooltipContent>
    </Tooltip>
  );
}
