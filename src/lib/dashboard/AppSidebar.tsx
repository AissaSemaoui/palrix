"use client";

import React from "react";
import { usePathname } from "next/navigation";

import { Anchor } from "@/components/ui/anchor";
import { Icons } from "@/components/Icons";

import { cn } from "@/lib/utils";
import { paths } from "@/config/navigations";

import type { NavItem, WithRequired } from "@/types";

interface AppSidebarProps {
  className?: string;
}

type SidebarNavItem = WithRequired<NavItem, "Icon">;

interface SidebarItemProps {
  item: SidebarNavItem;
  active?: boolean;
}

const items: SidebarNavItem[] = [
  {
    Icon: Icons.playground,
    title: "Playground",
    href: paths.dashboard.playground,
    fullMatch: false,
  },
  {
    Icon: Icons.settings,
    title: "Settings",
    href: paths.dashboard.settings,
    fullMatch: false,
  },
];

const SidebarItem = ({ item, active }: SidebarItemProps) => {
  const sidebarItemVariants = {
    active: {
      className: "text-accent-600 dark:text-accent-50 bg-accent-50 dark:bg-accent-950",
      variant: "secondary",
    },
    inactive: {
      className: "",
      variant: "ghost",
    },
  } as const;

  const activeStyle = sidebarItemVariants[active ? "active" : "inactive"];

  return (
    <Anchor
      href={item.href}
      variant={activeStyle?.variant}
      className={cn("h-10 w-full justify-start", activeStyle?.className)}
    >
      <item.Icon className="mr-2 h-5 w-5" /> {item.title}
    </Anchor>
  );
};

const AppSidebar = ({ className }: AppSidebarProps) => {
  const pathname = usePathname();

  return (
    <aside className={cn("hidden border-r bg-background p-4 lg:block", className)} id="app-sidebar">
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li key={item.title}>
            <SidebarItem item={item} active={item.fullMatch ? item.href === pathname : pathname.includes(item.href)} />
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default AppSidebar;
