import asyncHandler from "./asyncHandler";
import User from "../models/userModel";
import { Request, NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.cookies.jwt;

    if (token) {
      try {
        // verify token
        const decodedToken = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        ) as CustomJwtPayload;

        if (decodedToken.userId) {
          const user = await User.findById(decodedToken.userId).select(
            "-password"
          );

          if (user) {
            req.user = user;
            next();
          } else {
            res.status(401);
            throw new Error("Not authorized, user not found");
          }
        } else {
          res.status(401);
          throw new Error("Not authorized, invalid token");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      res.status(401);
      throw new Error("Not authorized. Missing token");
    }
  }
);

export const admin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(401);
      throw new Error("Not authorized as admin");
    }
  }
);
