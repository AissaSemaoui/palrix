import httpStatus from "http-status";
import type { NextFunction, Request, Response } from "express";

type ErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => void;

export const errorHandler: ErrorHandler = async (err, req, res, next) => {
  if (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }

  next();
};
