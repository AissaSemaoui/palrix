"use client";

import React from "react";
import { usePathname } from "next/navigation";

import { Anchor } from "@/components/ui/anchor";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import HistoryPopover from "@/lib/palettes/components/HistoryPopover";

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

const sidebarItemVariants = {
  active: {
    className: "h-10 w-full justify-start text-accent-600 dark:text-accent-50 bg-accent-50 dark:bg-accent-950",
    variant: "secondary",
  },
  inactive: {
    className: "h-10 w-full justify-start",
    variant: "ghost",
  },
} as const;

const items: SidebarNavItem[] = [
  {
    Icon: Icons.playground,
    title: "Playground",
    href: paths.dashboard.home,
    fullMatch: false,
  },
  {
    Icon: Icons.history,
    title: "History",
    href: paths.dashboard.history,
    Component: () => (
      <HistoryPopover side="right">
        <Button variant={"outline"} className={sidebarItemVariants.inactive.className}>
          <Icons.history className="mr-2 h-5 w-5" />
          History
        </Button>
      </HistoryPopover>
    ),
  },
  {
    Icon: Icons.settings,
    title: "Settings",
    href: paths.dashboard.settings,
    fullMatch: false,
  },
];

const SidebarItem = ({ item, active }: SidebarItemProps) => {
  const activeStyle = sidebarItemVariants[active ? "active" : "inactive"];

  if (item.Component) return <item.Component />;

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
