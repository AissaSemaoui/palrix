import type { NextFunction, Request, Response } from "express";
import { Session as LuciaSession } from "lucia";

import { lucia } from "@server/config/lucia";

export enum UserRoles {
  USER = "user",
  ADMIN = "admin",
}
export interface DbUser {
  id: string;
  email: string;
  displayName: string;
  avatar_url: string | null;
  role: UserRoles;
}

export type User = DbUser;

export type Session = LuciaSession;

export type ExpressMiddleware = (req: Request, res: Response, next: NextFunction) => Promise<void>;

declare global {
  namespace Express {
    interface Locals {
      user: User | null;
      session: Session | null;
    }

    interface User extends DbUser {}
  }
}

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DbUser;
  }
}
