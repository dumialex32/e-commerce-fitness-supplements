import { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import { hostname } from "os";

export const uploadProductImage = asyncHandler(
  async (req: Request, res: Response) => {
    res.send({
      message: "Image uploaded",
      imagePath: `${req.protocol}://${req.get("host")}/uploads/images/${
        req.file?.filename
      }`,
    });
  }
);
