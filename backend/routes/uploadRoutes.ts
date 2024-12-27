import express from "express";
import { uploadProductImage } from "../controllers/uploadController";
import { uploadImage } from "../middleware/uploadImageMiddleware";

const router = express.Router();

router.post("/", uploadImage, uploadProductImage);

export default router;
