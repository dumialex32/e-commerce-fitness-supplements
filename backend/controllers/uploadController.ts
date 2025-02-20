import { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";

export const uploadProductImage = asyncHandler(
  async (req: Request, res: Response) => {
    const baseUrl =
      process.env.BACKEND_URL || `${req.protocol}://${req.get("host")}`;
    res.send({
      message: "Image uploaded",
      imagePath: `${baseUrl}/uploads/images/${req.file?.filename}`,
    });
  }
);
