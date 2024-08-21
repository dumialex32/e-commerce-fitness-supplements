import { Response } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export const createToken = (res: Response, userId: Types.ObjectId): void => {
  // create token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });

  // add token to cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in ms
  });
};
