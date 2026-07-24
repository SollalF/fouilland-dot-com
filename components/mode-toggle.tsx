"use client";

import { Moon, Palette, Sun } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  applySiteThemePreset,
  isDarkLikeTheme,
  resolveActiveThemeId,
  SITE_CUSTOM_THEME_ID,
  SITE_THEMES,
  type SiteThemeChangeDetail,
  type SiteThemeId,
} from "@/lib/site";

const iconClassName = "h-[1.2rem] w-[1.2rem] text-foreground";

export function ModeToggle() {
  const [activeThemeId, setActiveThemeId] = useState<SiteThemeId | null>(null);
  const [appearanceRevision, setAppearanceRevision] = useState(0);

  useEffect(() => {
    setActiveThemeId(resolveActiveThemeId());

    const onThemeChange = (event: Event) => {
      const { themeId } = (event as CustomEvent<SiteThemeChangeDetail>).detail;
      setActiveThemeId(themeId);
    };

    const onAppearanceChange = () => {
      setAppearanceRevision((revision) => revision + 1);
    };

    window.addEventListener("site-theme-change", onThemeChange);
    window.addEventListener("site-color-change", onAppearanceChange);

    return () => {
      window.removeEventListener("site-theme-change", onThemeChange);
      window.removeEventListener("site-color-change", onAppearanceChange);
    };
  }, []);

  const isCustom = activeThemeId === SITE_CUSTOM_THEME_ID;
  const isDarkLike =
    activeThemeId && appearanceRevision >= 0
      ? isDarkLikeTheme(activeThemeId)
      : false;

  const toggleMode = useCallback(() => {
    const nextTheme = isDarkLike ? SITE_THEMES.light : SITE_THEMES.dark;
    applySiteThemePreset(nextTheme);
    setActiveThemeId(nextTheme.id);
  }, [isDarkLike]);

  if (!activeThemeId) {
    return (
      <Button
        variant="ghost"
        type="button"
        size="icon"
        className="px-2"
        disabled
        aria-label="Loading theme"
      >
        <Sun className={iconClassName} aria-hidden="true" />
      </Button>
    );
  }

  const nextMode = isDarkLike ? "light" : "dark";
  const ariaLabel = isCustom
    ? `Custom theme active. Switch to ${nextMode} mode`
    : `Switch to ${nextMode} mode`;

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
        <Palette className={iconClassName} aria-hidden="true" />
      ) : isDarkLike ? (
        <Sun className={iconClassName} aria-hidden="true" />
      ) : (
        <Moon className={iconClassName} aria-hidden="true" />
      )}
    </Button>
  );
}
