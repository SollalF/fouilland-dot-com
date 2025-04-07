import { Folder, User, LayoutDashboard } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
}

export interface NavProject {
  name: string;
  url: string;
  icon: LucideIcon;
}

export interface UserInfo {
  name: string;
  email: string;
  avatar: string;
}

/**
 * Site configuration containing all navigation and branding elements
 */
export const siteConfig = {
  // Site metadata
  name: "Sollal Fouilland",
  description:
    "Full Stack Developer with a knack for crafting cutting-edge web applications and project management for small dynamic teams.",
  url: "https://fouilland.com",

  // Branding
  logo: {
    src: "/sollal_pfp.jpeg",
    alt: "Sollal Fouilland",
    width: 32,
    height: 32,
  },

  // Navigation
  mainNav: [
    {
      title: "About Me",
      url: "/",
      icon: User,
      isActive: true,
    },
    {
      title: "Projects",
      url: "/projects",
      icon: Folder,
      isActive: false,
    },
    {
      title: "Blog",
      url: "/blog",
      icon: LayoutDashboard,
      isActive: false,
    },
  ] satisfies NavItem[],

  // Default user for development
  defaultUser: {
    name: "Sollal Fouilland",
    email: "sollal@fouilland.com",
    avatar: "/me.png",
  } satisfies UserInfo,
};
