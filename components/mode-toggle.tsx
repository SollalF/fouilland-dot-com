"use client";

import { Moon, Sun } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  applyThemePalette,
  getActivePaletteId,
  getSiteThemeConfig,
  paletteSelected,
  THEME_PALETTES,
  type SiteColorValues,
  type SiteThemeChangeDetail,
} from "@/lib/site-theme";

export function ModeToggle() {
  const [config, setConfig] = useState<SiteColorValues | null>(null);
  const [activePaletteId, setActivePaletteId] = useState<string | null>(null);

  useEffect(() => {
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

  const isDark = config
    ? paletteSelected(config, THEME_PALETTES.dark, activePaletteId)
    : false;

  const toggleMode = useCallback(() => {
    const nextPalette = isDark ? THEME_PALETTES.light : THEME_PALETTES.dark;
    const next = applyThemePalette(nextPalette);
    setConfig(next);
    setActivePaletteId(nextPalette.id);
  }, [isDark]);

  if (!config) {
    return (
      <Button
        variant="ghost"
        type="button"
        size="icon"
        className="px-2"
        disabled
      >
        <Sun className="h-[1.2rem] w-[1.2rem] text-foreground" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      type="button"
      size="icon"
      className="px-2"
      onClick={toggleMode}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun className="h-[1.2rem] w-[1.2rem] text-foreground" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] text-foreground" />
      )}
    </Button>
  );
}
