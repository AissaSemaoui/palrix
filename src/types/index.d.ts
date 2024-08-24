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

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

// redeclare WithRequired here
interface NavItem {
  Icon?: LucideIcon;
  title: string;
  href: string;
  disabled?: boolean;
  fullMatch?: boolean;
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

interface ThemeVariables {
  background: string;
  foreground: string;
  card: string;
  "card-foreground": string;
  popover: string;
  "popover-foreground": string;
  primary: string;
  "primary-foreground": string;
  secondary: string;
  "secondary-foreground": string;
  muted: string;
  "muted-foreground": string;
  accent: string;
  "accent-foreground": string;
  destructive: string;
  "destructive-foreground": string;
  border: string;
  input: string;
  ring: string;
  radius: string;
  "chart-1": string;
  "chart-2": string;
  "chart-3": string;
  "chart-4": string;
  "chart-5": string;
}

interface Theme {
  label: string;
  name: string;
  cssVars: {
    light: ThemeVariables;
    dark: ThemeVariables;
  };
}

export { CustomMutationOptions, CustomQueryOptions, Maybe, Optional, NavItem, User, WithRequired, Theme };
