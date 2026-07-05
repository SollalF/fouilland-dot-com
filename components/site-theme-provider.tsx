"use client";

import { useEffect } from "react";
import { applySiteTheme, getSiteThemeConfig } from "@/lib/site-theme";

export function SiteThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    applySiteTheme(getSiteThemeConfig());
  }, []);

  return children;
}
