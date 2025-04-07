"use client";

import * as React from "react";
import { Folder, User } from "lucide-react";
import Link from "next/link";

import { projects } from "@/app/projects";
import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { ModeToggle } from "./mode-toggle";
import { siteConfig } from "@/data/site";
import Image from "next/image";
// This is sample data.
const data = {
  user: {},
  teams: [],
  navMain: [
    {
      title: "About Me",
      url: "/",
      icon: User,
    },
    {
      title: "Projects",
      url: "/projects",
      icon: Folder,
      isActive: false,
      items: [],
    },
  ],
};

// Transform project data to match NavProjects component format
const formattedProjects = projects.map((project) => ({
  name: project.title,
  url: `/projects/${project.title.toLowerCase().replace(/\s+/g, "-")}`,
  icon: project.icon,
}));

function Home() {
  return (
    <SidebarMenu className="mt-2">
      <SidebarMenuItem>
        <SidebarMenuButton tooltip={siteConfig.name} asChild>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={siteConfig.logo.src}
              alt={siteConfig.logo.alt}
              width={siteConfig.logo.width}
              height={siteConfig.logo.height}
              className="rounded-full"
            />
            <span className="font-medium truncate">{siteConfig.name}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Home />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={formattedProjects} />
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <Tooltip>
          <TooltipTrigger asChild>
            <ModeToggle />
          </TooltipTrigger>
          <TooltipContent>
            <p>Theme</p>
          </TooltipContent>
        </Tooltip>
      </SidebarFooter>
    </Sidebar>
  );
}
