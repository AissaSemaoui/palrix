import httpStatus from "http-status";
import type { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger";

type ErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => void;

export const errorHandler: ErrorHandler = async (err, req, res, next) => {
  logger.error(err);

  if (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }

  next();
};
