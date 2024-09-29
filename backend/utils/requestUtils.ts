import { NextFunction, Request, Response } from "express";
import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 50, // limit for each UP to 100 req / windowMs
  message: "To many requests from this IP, please try again later",
});

export const requestTimeout = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.setTimeout(8000, () => {
    res.status(408).json({ message: "Request time out" });
  });
  next();
};
