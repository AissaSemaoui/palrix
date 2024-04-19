import { Session } from "lucia";
import type { NextFunction, Request, Response } from "express";

import type { UserMe } from "@/types";

export type ExpressMiddleware = (req: Request, res: Response, next: NextFunction) => Promise<void>;
