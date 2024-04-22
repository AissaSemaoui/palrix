import type { LucideIcon } from "lucide-react";
import { WithRequired } from "@tanstack/react-query";

import { Session, User } from "@/server/types";

type Maybe<T> = T | undefined;

// redeclare WithRequired here
interface NavItem {
  Icon?: LucideIcon;
  title: string;
  href: string;
  disabled?: boolean;
  fullMatch?: boolean;
}

interface AppSession {
  user: User;
  session: Session;
}

export { Maybe, NavItem, User, WithRequired, AppSession };
