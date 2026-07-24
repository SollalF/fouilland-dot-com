"use client";

import * as React from "react";
import { Folder, User } from "lucide-react";

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
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { ModeToggle } from "./mode-toggle";
import { UiSettingsPickerLazy } from "@/components/ui-settings-picker-lazy";
import { siteConfig } from "@/data/site";
import Image from "next/image";
import { TransitionLink } from "@/components/transition-link";

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

const formattedProjects = projects.map((project) => ({
  name: project.title,
  url: `/projects/${project.projectSlug ?? project.title.toLowerCase().replace(/\s+/g, "-")}`,
  icon: project.icon,
}));

function Home() {
  return (
    <SidebarMenu className="mt-2">
      <SidebarMenuItem>
        <SidebarMenuButton tooltip={siteConfig.name} asChild>
          <TransitionLink
            href="/"
            transitionTypes={["nav-back"]}
            className="flex items-center gap-2"
          >
            <Image
              src={siteConfig.logo.src}
              alt={siteConfig.logo.alt}
              width={siteConfig.logo.width}
              height={siteConfig.logo.height}
              className="rounded-full"
            />
            <span className="font-medium truncate">{siteConfig.name}</span>
          </TransitionLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      style={{ viewTransitionName: "projects-sidebar" }}
      {...props}
    >
      <SidebarHeader>
        <Home />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={formattedProjects} />
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <div className="flex items-center gap-1">
          {state === "expanded" ? (
            <UiSettingsPickerLazy variant="sidebar" />
          ) : null}
          <Tooltip>
            <TooltipTrigger asChild>
              <ModeToggle />
            </TooltipTrigger>
            <TooltipContent>
              <p>Theme</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
