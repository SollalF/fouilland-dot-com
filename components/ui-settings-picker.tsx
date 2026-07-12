"use client";

import {
  Check,
  GraduationCap,
  Moon,
  Palette,
  SlidersHorizontal,
  Sun,
  Terminal,
  type LucideIcon,
} from "lucide-react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  applySiteColors,
  applySiteFonts,
  applySiteShape,
  applySiteThemePreset,
  colorsMatch,
  DEFAULT_SITE_COLORS,
  DEFAULT_SITE_FONT,
  DEFAULT_SITE_SHAPE,
  fontFamilyValue,
  getSiteColorConfig,
  getSiteFontConfig,
  getSiteShapeConfig,
  normalizeHex,
  preloadSiteFont,
  resolveActiveThemeId,
  ROLE_COLOR_PRESETS,
  saveSiteColorConfig,
  saveSiteFontConfig,
  saveSiteShapeConfig,
  setActiveThemeId as persistActiveThemeId,
  SITE_CUSTOM_THEME,
  SITE_CUSTOM_THEME_ID,
  SITE_BORDER_WIDTH,
  SITE_BORDER_WIDTH_ORDER,
  SITE_COLOR_LABELS,
  SITE_COLOR_ROLES,
  SITE_FONT_ORDER,
  SITE_FONTS,
  SITE_RADIUS,
  SITE_RADIUS_ORDER,
  SITE_THEME_ORDER,
  SITE_THEMES,
  themeSelected,
  type RoleColorPreset,
  type SiteBorderWidthId,
  type SiteColorChangeDetail,
  type SiteColorRole,
  type SiteColorValues,
  type SiteFontChangeDetail,
  type SiteFontId,
  type SiteRadiusId,
  type SiteShapeChangeDetail,
  type SiteShapeValues,
  type SiteTheme,
  type SiteThemeChangeDetail,
  type SiteThemeId,
} from "@/lib/site";

function PresetButton({
  label,
  icon: Icon,
  selected,
  disabled,
  onSelect,
}: {
  label: string;
  icon?: LucideIcon;
  selected: boolean;
  disabled?: boolean;
  onSelect?: () => void;
}) {
  return (
    <Button
      type="button"
      variant={selected ? "default" : "outline"}
      size="sm"
      onClick={onSelect}
      disabled={disabled}
      className="flex-1 gap-1.5"
      aria-pressed={selected}
    >
      {Icon ? <Icon className="size-4 shrink-0" /> : null}
      {label}
    </Button>
  );
}

function RoleColorPicker({
  role,
  label,
  value,
  onChange,
}: {
  role: SiteColorRole;
  label: string;
  value: string;
  onChange: (color: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex flex-wrap items-center gap-1.5">
        {ROLE_COLOR_PRESETS[role].map((preset: RoleColorPreset) => (
          <Tooltip key={preset.color}>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={() => onChange(preset.color)}
                style={{ backgroundColor: preset.color }}
                className="relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={`${preset.label} preset`}
              >
                {colorsMatch(value, preset.color) && (
                  <Check className="size-4 text-white drop-shadow-sm" />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent side="top">{preset.label}</TooltipContent>
          </Tooltip>
        ))}
        <ColorPicker value={normalizeHex(value)} onChange={onChange} />
      </div>
    </div>
  );
}

type UiSettingsPickerProps = {
  variant?: "dock" | "sidebar";
};

export function UiSettingsPicker({ variant = "dock" }: UiSettingsPickerProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [colors, setColors] = useState<SiteColorValues>(DEFAULT_SITE_COLORS);
  const [activeThemeId, setActiveThemeId] = useState<SiteThemeId>("light");
  const [font, setFont] = useState<SiteFontId>(DEFAULT_SITE_FONT);
  const [shape, setShape] = useState<SiteShapeValues>(DEFAULT_SITE_SHAPE);

  useEffect(() => {
    setMounted(true);

    const initialColors = getSiteColorConfig();
    const initialFont = getSiteFontConfig();
    const initialShape = getSiteShapeConfig();

    setColors(initialColors);
    setActiveThemeId(resolveActiveThemeId());
    setFont(initialFont);
    setShape(initialShape);
    preloadSiteFont(initialFont);

    const onColorChange = (event: Event) => {
      const { colors: next } = (event as CustomEvent<SiteColorChangeDetail>)
        .detail;
      setColors(next);
    };

    const onThemeChange = (event: Event) => {
      const { themeId } = (event as CustomEvent<SiteThemeChangeDetail>).detail;
      setActiveThemeId(themeId);
    };

    const onFontChange = (event: Event) => {
      const { font: next } = (event as CustomEvent<SiteFontChangeDetail>)
        .detail;
      setFont(next);
      preloadSiteFont(next);
    };

    const onShapeChange = (event: Event) => {
      const { shape: next } = (event as CustomEvent<SiteShapeChangeDetail>)
        .detail;
      setShape(next);
    };

    window.addEventListener("site-color-change", onColorChange);
    window.addEventListener("site-theme-change", onThemeChange);
    window.addEventListener("site-font-change", onFontChange);
    window.addEventListener("site-shape-change", onShapeChange);

    return () => {
      window.removeEventListener("site-color-change", onColorChange);
      window.removeEventListener("site-theme-change", onThemeChange);
      window.removeEventListener("site-font-change", onFontChange);
      window.removeEventListener("site-shape-change", onShapeChange);
    };
  }, []);

  useEffect(() => {
    if (open) preloadSiteFont(font);
  }, [open, font]);

  const applyTheme = useCallback(
    (theme: SiteTheme) => {
      if (activeThemeId === theme.id) return;

      applySiteThemePreset(theme);
      setColors({ ...theme.colors });
      setFont(theme.font);
      setShape(theme.shape);
      setActiveThemeId(theme.id);
      preloadSiteFont(theme.font);
    },
    [activeThemeId],
  );

  const updateRoleColor = useCallback((role: SiteColorRole, color: string) => {
    let next: SiteColorValues | null = null;

    setColors((current) => {
      if (colorsMatch(current[role], color)) return current;
      next = { ...current, [role]: color };
      return next;
    });

    if (next) {
      saveSiteColorConfig(next);
      applySiteColors(next);
      persistActiveThemeId(SITE_CUSTOM_THEME_ID);
    }
  }, []);

  const updateFont = useCallback((fontId: SiteFontId) => {
    setFont((current) => {
      if (current === fontId) return current;
      saveSiteFontConfig(fontId);
      applySiteFonts(fontId);
      persistActiveThemeId(SITE_CUSTOM_THEME_ID);
      return fontId;
    });
  }, []);

  const updateRadius = useCallback((radiusId: SiteRadiusId) => {
    setShape((current) => {
      if (current.radius === radiusId) return current;
      const next = { ...current, radius: radiusId };
      saveSiteShapeConfig(next);
      applySiteShape(next);
      persistActiveThemeId(SITE_CUSTOM_THEME_ID);
      return next;
    });
  }, []);

  const updateBorderWidth = useCallback((borderWidth: SiteBorderWidthId) => {
    setShape((current) => {
      if (current.borderWidth === borderWidth) return current;
      const next = { ...current, borderWidth };
      saveSiteShapeConfig(next);
      applySiteShape(next);
      persistActiveThemeId(SITE_CUSTOM_THEME_ID);
      return next;
    });
  }, []);

  const popoverContent = (
    <PopoverContent
      side={variant === "sidebar" ? "right" : "top"}
      align={variant === "sidebar" ? "start" : "center"}
      className="mx-4 w-80"
      sideOffset={variant === "sidebar" ? 8 : 16}
      onOpenAutoFocus={(event) => event.preventDefault()}
    >
      <div className="max-h-[min(42rem,85vh)] space-y-4 overflow-y-auto px-2">
        <div className="space-y-1">
          <p className="text-sm font-medium">UI settings</p>
          <p className="text-muted-foreground text-xs">
            Customize colors, font, and shape.
          </p>
        </div>

        <div className="space-y-2">
          <Label>Theme</Label>
          <div className="flex flex-wrap items-center gap-2">
            {SITE_THEME_ORDER.map((id) => (
              <PresetButton
                key={id}
                label={SITE_THEMES[id].label}
                icon={
                  id === "light"
                    ? Sun
                    : id === "dark"
                      ? Moon
                      : id === "polyu"
                        ? GraduationCap
                        : Terminal
                }
                selected={themeSelected(activeThemeId, id)}
                onSelect={() => applyTheme(SITE_THEMES[id])}
              />
            ))}
            <PresetButton
              label={SITE_CUSTOM_THEME.label}
              icon={Palette}
              selected={activeThemeId === SITE_CUSTOM_THEME_ID}
              disabled
            />
          </div>
        </div>

        <div className="space-y-3">
          {SITE_COLOR_ROLES.map((role) => (
            <RoleColorPicker
              key={role}
              role={role}
              label={SITE_COLOR_LABELS[role]}
              value={colors[role]}
              onChange={(color) => updateRoleColor(role, color)}
            />
          ))}
        </div>

        <div className="space-y-2">
          <Label htmlFor="site-font-select">Font</Label>
          <Select value={font} onValueChange={updateFont}>
            <SelectTrigger id="site-font-select" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SITE_FONT_ORDER.map((id) => (
                <SelectItem
                  key={id}
                  value={id}
                  style={{ fontFamily: fontFamilyValue(SITE_FONTS[id]) }}
                >
                  {SITE_FONTS[id].label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="site-radius-select">Rounding</Label>
          <Select value={shape.radius} onValueChange={updateRadius}>
            <SelectTrigger id="site-radius-select" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SITE_RADIUS_ORDER.map((radiusId) => (
                <SelectItem key={radiusId} value={radiusId}>
                  {SITE_RADIUS[radiusId].label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="site-border-width-select">Border weight</Label>
          <Select value={shape.borderWidth} onValueChange={updateBorderWidth}>
            <SelectTrigger id="site-border-width-select" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SITE_BORDER_WIDTH_ORDER.map((widthId) => (
                <SelectItem key={widthId} value={widthId}>
                  {SITE_BORDER_WIDTH[widthId].label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </PopoverContent>
  );

  const iconClassName =
    variant === "sidebar" ? "h-[1.2rem] w-[1.2rem] text-foreground" : "size-4";

  const triggerButton = (
    <Button
      variant="ghost"
      type="button"
      size="icon"
      className={variant === "sidebar" ? "px-2" : "size-12 px-2"}
      disabled={!mounted}
    >
      <SlidersHorizontal className={iconClassName} />
      <span className="sr-only">UI settings</span>
    </Button>
  );

  if (variant === "sidebar") {
    return (
      <Tooltip>
        <Popover open={open} onOpenChange={setOpen}>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>{triggerButton}</PopoverTrigger>
          </TooltipTrigger>
          {popoverContent}
        </Popover>
        <TooltipContent>
          <p>UI settings</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Tooltip>
      <Popover open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>{triggerButton}</PopoverTrigger>
        </TooltipTrigger>
        {popoverContent}
      </Popover>
      <TooltipContent>
        <p>UI settings</p>
      </TooltipContent>
    </Tooltip>
  );
}
