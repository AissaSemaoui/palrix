import type { LucideIcon } from "lucide-react";
import { WithRequired } from "@tanstack/react-query";
import { DbUser } from "@/server/types";

type Maybe<T> = T | undefined;

// redeclare WithRequired here
interface NavItem {
  Icon?: LucideIcon;
  title: string;
  href: string;
  disabled?: boolean;
  fullMatch?: boolean;
}

type User = DbUser;

export { Maybe, NavItem, User, WithRequired };
