import React from "react";

import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { siteConfig } from "@/config/site";

type AppNavProps = {};

const AppNav = ({}: AppNavProps) => {
  return (
    <nav className="flex items-center justify-between border px-4 py-2">
      <div className="flex gap-2">
        <Icons.logo />
        {siteConfig.name}
      </div>

      <div>
        <Avatar>
          <AvatarFallback className="border-accent-300 border">Ai</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};

export default AppNav;
