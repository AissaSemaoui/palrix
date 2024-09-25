"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import * as React from "react";

import { Icons } from "@/components/Icons";
import { MobileNav } from "@/components/MainMobileNav";
import { ModeToggle } from "@/components/ModeToggle";
import { buttonVariants } from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import Show from "@/components/Show";

import { paths } from "@/config/navigations";
import { useUserMe } from "@/hooks/use-user";
import { cn } from "@/lib/utils";

import type { NavItem } from "@/types";

interface MainNavProps {
  items?: NavItem[];
  children?: React.ReactNode;
}

export function MainNav({ items, children }: MainNavProps) {
  const segment = useSelectedLayoutSegment();
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);

  const { isSignedIn } = useUserMe();
  const isAuthenticated = isSignedIn;

  return (
    <div className="flex w-full justify-between">
      <div className="flex gap-6 md:gap-10">
        <Logo />
        {items?.length ? (
          <nav className="hidden gap-6 md:flex">
            {items?.map((item, index) => (
              <Link
                key={index}
                href={item.disabled ? "#" : item.href}
                className={cn(
                  "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                  item.href.startsWith(`/${segment || ""}`) ? "text-foreground" : "text-foreground/60",
                  item.disabled && "cursor-not-allowed opacity-80",
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        ) : null}

        <button className="flex items-center space-x-2 md:hidden" onClick={() => setShowMobileMenu(!showMobileMenu)}>
          <Logo />

          {showMobileMenu ? <Icons.close /> : <Icons.menu />}
        </button>
        {showMobileMenu && items && <MobileNav items={items}>{children}</MobileNav>}
      </div>

      <div className="flex gap-2">
        <ModeToggle />
        <Show>
          <Show.If condition={!isAuthenticated}>
            <Link href={paths.auth.login} className={buttonVariants({ variant: "secondary" })}>
              Login
            </Link>

            <Link href={paths.auth.register} className={buttonVariants({ variant: "default" })}>
              Register
            </Link>
          </Show.If>

          <Show.Else>
            <Link href={paths.dashboard.home} className={buttonVariants({ variant: "default" })}>
              Dashboard
            </Link>
          </Show.Else>
        </Show>
      </div>
    </div>
  );
}
