import express from "express";

import {
  createProduct,
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

export default router;
