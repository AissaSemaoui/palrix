import type { NextFunction, Request, Response } from "express";

import { StrictAuthProp } from "@clerk/clerk-sdk-node";
import { palettes } from "@server/db/schema";
import { ColorSpaces } from "chroma-js";

export enum UserRoles {
  USER = "user",
  SUPER_ADMIN = "super_admin",
}

export interface Shade {
  name: string;
  shades: string[];
  mainShade?: string;
}

export type Palette = typeof palettes.$inferSelect;

export type ExportFormat = "json" | "css" | "scss" | "tailwind";

export type ColorSpace = keyof ColorSpaces | "hex";

export type ExpressMiddleware = (req: Request, res: Response, next: NextFunction) => Promise<any>;

declare global {
  namespace Express {
    interface Request extends StrictAuthProp {}
  }
}
