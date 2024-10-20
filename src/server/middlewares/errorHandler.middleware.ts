import httpStatus from "http-status";
import type { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger";

type ErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => void;

export const errorHandler: ErrorHandler = async (err: Error & { status?: number }, req, res, next) => {
  logger.error(err);

  if (err) {
    return res.status(err.status ?? httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }

  next();
};
