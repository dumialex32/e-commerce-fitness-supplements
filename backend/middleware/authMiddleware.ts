import asyncHandler from "./asyncHandler";
import User from "../models/userModel";
import { Request, NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;

    if (token) {
      try {
        if (!process.env.JWT_SECRET) {
          throw new Error("JWT_SECRET environment variable not set");
        }

        const decodedToken = jwt.verify(
          token,
          process.env.JWT_SECRET
        ) as CustomJwtPayload;

        if (decodedToken.userId) {
          const user = await User.findById(decodedToken.userId).select(
            "-password"
          );

          if (user) {
            console.log(req);
            req.user = user;

            next();
          } else {
            res.status(401);
            throw new Error("Not authorized, user not found");
          }
        } else {
          res.status(401);
          throw new Error("Not authorized, token is invalid");
        }
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error("Not authorized, token verification failed");
      }
    } else {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
);

export const admin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as admin");
  }
};
