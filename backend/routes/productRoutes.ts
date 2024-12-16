import express from "express";
const router = express.Router();

import {
  createProduct,
  deleteProduct,
  editProduct,
  getProduct,
  getProducts,
} from "../controllers/productController";
import { admin, protect } from "../middleware/authMiddleware";

// initialize router

router.route("/").get(getProducts).post(protect, admin, createProduct);

router
  .route("/:id")
  .get(getProduct)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, editProduct);

export default router;
