"use client";

import * as React from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import { MobileNav } from "@/components/main-mobile-nav";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import Show from "./show";

import { cn } from "@/lib/utils";
import { paths } from "@/config/navigations";
import { siteConfig } from "@/config/site";
import { useUserMe } from "@/hooks/use-user";

import type { NavItem } from "@/types";

interface MainNavProps {
  items?: NavItem[];
  children?: React.ReactNode;
}

export function MainNav({ items, children }: MainNavProps) {
  const segment = useSelectedLayoutSegment();
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);

  const userMe = useUserMe();
  const isAuthenticated = !!userMe?.id;

  return (
    <div className="flex w-full justify-between">
      <div className="flex gap-6 md:gap-10">
        <Link href="/" className="hidden items-center space-x-2 md:flex">
          <Icons.logo />
          <span className="hidden font-bold sm:inline-block">{siteConfig.name}</span>
        </Link>
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
          <Icons.logo />

          {showMobileMenu ? <Icons.close /> : <Icons.menu />}
        </button>
        {showMobileMenu && items && <MobileNav items={items}>{children}</MobileNav>}
      </div>

      <div className="flex gap-2">
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
            <Link href="/dashboard" className={buttonVariants({ variant: "default" })}>
              Dashboard
            </Link>
          </Show.Else>
        </Show>
      </div>
    </div>
  );
}
