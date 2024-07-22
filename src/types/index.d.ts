import type { LucideIcon } from "lucide-react";
import { MutationFunction, UseMutationOptions, WithRequired } from "@tanstack/react-query";

import { Session, User } from "@/server/types";
import { AxiosError } from "axios";

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

type CustomMutationOptions<TFunction extends MutationFunction<any, any>> = UseMutationOptions<
  Awaited<ReturnType<TFunction>>,
  AxiosError,
  Parameters<TFunction>[0]
>;

export { Maybe, NavItem, User, WithRequired, AppSession, CustomMutationOptions };
