import type { LucideIcon } from "lucide-react";
import { WithRequired } from "@tanstack/react-query";

type Maybe<T> = T | undefined;

// redeclare WithRequired here
interface NavItem {
  Icon?: LucideIcon;
  title: string;
  href: string;
  disabled?: boolean;
  fullMatch?: boolean;
}

interface UserMe {
  id: string;
  name: string;
  email: string;
  image: Maybe<string>;
}

export { NavItem, UserMe, WithRequired };
