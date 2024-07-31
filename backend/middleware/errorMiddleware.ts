import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

// 404 error handler
const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// general error handler
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let message: string = err.message;

  let statusCode: number = res.statusCode === 200 ? 500 : res.statusCode; // ensure that the response status code reflects an error condition, not a successful one.

  if (
    err instanceof mongoose.Error.CastError &&
    err.name === "CastError" &&
    err.kind === "ObjectId"
  ) {
    statusCode = 404;
    message = "Resources not found";
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? "🍞" : err.stack,
  });
};

export { notFound, errorHandler };
