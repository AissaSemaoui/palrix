"use client";

import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";

import { siteConfig } from "@/config/site";
import { useUserMe } from "@/hooks/use-user";

import type { User } from "@/types";

import { requests } from "@/api-client";
import { useSignOut } from "@/hooks/use-sign-out";

type AppNavProps = {};

const AvatarMenu = ({ user }: { user: User }) => {
  const { mutate: signOut } = useSignOut();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.avatar_url ?? ""} />
          <AvatarFallback className="border border-accent-300">{user.displayName.substring(0, 2)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
          <Icons.logout className="mr-2 h-4 w-4" /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const AppNav = ({}: AppNavProps) => {
  const user = useUserMe<true>();

  return (
    <nav className="flex items-center justify-between border px-4 py-2">
      <div className="flex gap-2">
        <Icons.logo />
        {siteConfig.name}
      </div>

      <div>
        <AvatarMenu user={user} />
      </div>
    </nav>
  );
};

export default AppNav;
