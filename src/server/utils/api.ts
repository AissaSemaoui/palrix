import type { NextFunction, Request, Response } from "express";

import { logger } from "@server/utils/logger";
import type { ExpressMiddleware } from "@server/types";

export const catchController =
  (controller: ExpressMiddleware, trace?: string) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("within the controller");
      await controller(req, res, next);
    } catch (err) {
      const error = err as Error;

      logger.error({ ...error, cause: error.cause }, trace);
      console.log("within the controller error");
      next(error);
    }
  };
