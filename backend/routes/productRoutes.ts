import express from "express";
import {
  deleteProduct,
  getProduct,
  getProducts,
} from "../controllers/productController";
import { admin, protect } from "../middleware/authMiddleware";

// initialize router
const router = express.Router();

// get all products
router.get("/", getProducts);

// get product
router.get("/:id", getProduct);

// delete product
router.delete("/:id", protect, admin, deleteProduct);

export default router;
