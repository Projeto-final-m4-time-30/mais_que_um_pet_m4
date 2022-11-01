import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";

function handleError(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { statusCode, message } = err;

  if (err instanceof AppError) {
    return res.status(statusCode).json({
      status: "error",
      statusCode,
      message,
    });
  }

  return res.status(500).json({ message: "Internal server error" });
}

export default handleError;
