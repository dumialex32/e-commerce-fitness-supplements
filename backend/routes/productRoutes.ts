import express from "express";

import {
  createProduct,
  createProductReview,
  deleteProduct,
  editProduct,
  getProduct,
  getProducts,
} from "../controllers/productController";
import { admin, protect } from "../middleware/authMiddleware";

// initialize router
const router = express.Router();

router
  .route("/:id")
  .get(getProduct)
  .delete(protect, admin, deleteProduct)
  .patch(protect, admin, editProduct);

router.route("/").get(getProducts).post(protect, admin, createProduct);

router.route("/:id/reviews").post(protect, createProductReview);

export default router;
