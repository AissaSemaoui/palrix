"use client";

import React from "react";
import { usePathname } from "next/navigation";

import { Anchor } from "@/components/ui/anchor";
import { Icons } from "@/components/icons";

import { cn } from "@/lib/utils";
import { paths } from "@/config/navigations";

import type { NavItem, WithRequired } from "@/types";

interface AppSidebarProps {}

type SidebarNavItem = WithRequired<NavItem, "Icon">;

interface SidebarItemProps {
  item: SidebarNavItem;
  active?: boolean;
}

const items: SidebarNavItem[] = [
  {
    Icon: Icons.home,
    title: "Home",
    href: paths.dashboard.root,
    fullMatch: false,
  },
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
      className: "text-accent-600 bg-accent-50",
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
      className={cn("w-full justify-start", activeStyle?.className)}
    >
      <item.Icon className="mr-2 h-5 w-5" /> {item.title}
    </Anchor>
  );
};

const AppSidebar = ({}: AppSidebarProps) => {
  const pathname = usePathname();

  return (
    <aside className="hidden w-2/12 border-r p-4 lg:block lg:w-[17rem]">
      <ul className="space-y-1">
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
