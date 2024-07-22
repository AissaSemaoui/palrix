import {
  DefinedInitialDataOptions,
  MutationFunction,
  MutationOptions,
  QueryFunction,
  QueryKey,
  QueryOptions,
  WithRequired,
} from "@tanstack/react-query";
import type { LucideIcon } from "lucide-react";

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

type CustomMutationOptions<TFunction extends MutationFunction<any, any>> = MutationOptions<
  Awaited<ReturnType<TFunction>>,
  AxiosError,
  Parameters<TFunction>[0]
>;

type CustomQueryOptions<TFunction extends QueryFunction<any, any>> = QueryOptions<
  Awaited<ReturnType<TFunction>>,
  AxiosError,
  Awaited<ReturnType<TFunction>>,
  QueryKey,
  DefinedInitialDataOptions<TFunction>
>;

export { AppSession, CustomMutationOptions, CustomQueryOptions, Maybe, NavItem, User, WithRequired };
