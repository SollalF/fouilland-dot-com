"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

type NavItemProps = {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
};

// Component for simple navigation items without children
function SimpleNavItem({ title, url, icon: Icon }: NavItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton tooltip={title} asChild>
        <a href={url}>
          {Icon && <Icon />}
          <span>{title}</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

// Component for collapsible navigation items with children
function CollapsibleNavItem({
  title,
  icon: Icon,
  isActive,
  items = [],
}: NavItemProps) {
  return (
    <Collapsible asChild defaultOpen={isActive} className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={title}>
            {Icon && <Icon />}
            <span>{title}</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {items.map((subItem) => (
              <SidebarMenuSubItem key={subItem.title}>
                <SidebarMenuSubButton asChild>
                  <a href={subItem.url}>
                    <span>{subItem.title}</span>
                  </a>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

export function NavMain({ items }: { items: NavItemProps[] }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const hasSubItems = !!item.items?.length;

          return hasSubItems ? (
            <CollapsibleNavItem key={item.title} {...item} />
          ) : (
            <SimpleNavItem key={item.title} {...item} />
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
