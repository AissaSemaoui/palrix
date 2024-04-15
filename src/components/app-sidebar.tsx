"use client";

import React from "react";

import { Button } from "@/components/ui/button";

import type { NavItem } from "@/types";
import { usePathname } from "next/navigation";
import { Anchor } from "./ui/anchor";
import { cn } from "@/lib/utils";

interface AppSidebarProps {}

interface SidebarItemProps {
  item: NavItem;
  active?: boolean;
}

const items: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    fullMatch: false,
  },
  {
    title: "Tools",
    href: "/tools",
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
      {item.title}
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
