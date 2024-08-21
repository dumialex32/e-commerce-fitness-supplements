// responseUtils.ts

import { Response } from "express";

const sendSuccess = (
  res: Response,
  message: string,
  statusCode: number = 200
): void => {
  res.status(statusCode).json({ message });
};

const sendError = (
  res: Response,
  message: string,
  statusCode: number = 400
): void => {
  res.status(statusCode).json({ error: message });
};

export default {
  sendSuccess,
  sendError,
};
