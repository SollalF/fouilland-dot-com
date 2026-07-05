"use client";

import { Moon, Palette, Sun } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  applySiteThemePreset,
  resolveActiveThemeId,
  SITE_CUSTOM_THEME_ID,
  SITE_THEMES,
  type SiteThemeChangeDetail,
  type SiteThemeId,
} from "@/lib/site";

const iconClassName = "h-[1.2rem] w-[1.2rem] text-foreground";

export function ModeToggle() {
  const [activeThemeId, setActiveThemeId] = useState<SiteThemeId | null>(null);

  useEffect(() => {
    setActiveThemeId(resolveActiveThemeId());

    const onThemeChange = (event: Event) => {
      const { themeId } = (event as CustomEvent<SiteThemeChangeDetail>).detail;
      setActiveThemeId(themeId);
    };

    window.addEventListener("site-theme-change", onThemeChange);

    return () => {
      window.removeEventListener("site-theme-change", onThemeChange);
    };
  }, []);

  const isDark = activeThemeId === "dark";
  const isCustom = activeThemeId === SITE_CUSTOM_THEME_ID;

  const toggleMode = useCallback(() => {
    const nextTheme = isDark ? SITE_THEMES.light : SITE_THEMES.dark;
    applySiteThemePreset(nextTheme);
    setActiveThemeId(nextTheme.id);
  }, [isDark]);

  if (!activeThemeId) {
    return (
      <Button
        variant="ghost"
        type="button"
        size="icon"
        className="px-2"
        disabled
      >
        <Sun className={iconClassName} />
      </Button>
    );
  }

  const ariaLabel = isCustom
    ? "Custom theme active. Switch to dark mode"
    : isDark
      ? "Switch to light mode"
      : "Switch to dark mode";

  return (
    <Button
      variant="ghost"
      type="button"
      size="icon"
      className="px-2"
      onClick={toggleMode}
      aria-label={ariaLabel}
    >
      {isCustom ? (
        <Palette className={iconClassName} />
      ) : isDark ? (
        <Sun className={iconClassName} />
      ) : (
        <Moon className={iconClassName} />
      )}
    </Button>
  );
}
