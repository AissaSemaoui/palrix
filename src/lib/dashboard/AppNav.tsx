"use client";

import { ModeToggle } from "@/components/ModeToggle";
import Logo from "@/components/ui/logo";

import { cn } from "@/lib/utils";

import { UserButton } from "@clerk/nextjs";

type AppNavProps = {
  className?: string;
};

const AppNav = ({ className }: AppNavProps) => {
  return (
    <nav className={cn("flex items-center justify-between border-b bg-background px-4 py-2", className)}>
      <div className="flex gap-2">
        <Logo />
      </div>

      <div className="flex items-center gap-2">
        <ModeToggle />
        <UserButton />
      </div>
    </nav>
  );
};

export default AppNav;
