import { NextFunction, Request, Response } from "express";
import rateLimit from "express-rate-limit";

// general rate limits
export const generalRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 999, // limit for each UP to 100 req / windowMs
  message: "To many requests from this IP, please try again later",
});

// user rate limits
export const userRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 5, // limit for each UP to 100 req / windowMs

  message: "To many user requests from this IP, please try again later",
});

//order rate limits
export const orderRateLimit = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 10,
  message: "To many order requests from this IP, please try again later",
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
