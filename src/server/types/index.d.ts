import type { NextFunction, Request, Response } from "express";
import type { Session } from "lucia";

import { lucia } from "@/config/lucia";

import type { UserMe } from "@/types";

export type ExpressMiddleware = (req: Request, res: Response, next: NextFunction) => Promise<void>;

declare global {
  namespace Express {
    interface Locals {
      user: User | null;
      session: Session | null;
    }

    interface User {
      id: string;
    }
  }
}

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
  }
}
