import type { NextFunction, Request, Response } from "express";

import { StrictAuthProp } from "@clerk/clerk-sdk-node";
import { palettes } from "@server/db/schema";

import type { User as ClerkUser } from "@clerk/clerk-sdk-node";

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

export type ExpressMiddleware = (req: Request, res: Response, next: NextFunction) => Promise<any>;

declare global {
  namespace Express {
    interface Locals {
      user: ClerkUser | null;
      session: null;
    }

    interface Request extends StrictAuthProp {}
  }
}
