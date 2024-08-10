import type { NextFunction, Request, Response } from "express";
import { Session as LuciaSession } from "lucia";

import { users, palettes } from "@server/db/schema";
import { lucia } from "@server/config/lucia";

export enum UserRoles {
  USER = "user",
  ADMIN = "admin",
}

export interface Shade {
  name: string;
  shades: string[];
  mainShade?: string;
}

export type Palette = typeof palettes.$inferSelect;

export type DbUser = typeof users.$inferSelect;

export type User = DbUser;

export type Session = LuciaSession;

export type ExpressMiddleware = (req: Request, res: Response, next: NextFunction) => Promise<any>;

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
