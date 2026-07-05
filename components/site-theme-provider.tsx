"use client";

import { useEffect } from "react";
import { applySiteFromStorage } from "@/lib/site";

export function SiteThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    applySiteFromStorage();
  }, []);

  return children;
}
