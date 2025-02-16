import express from "express";
import {
  createProduct,
  createProductReview,
  deleteProduct,
  editProduct,
  getProduct,
  getProductCategories,
  getProducts,
  getTopFiveRatedProducts,
} from "../controllers/productController";
import { admin, protect } from "../middleware/authMiddleware";

// Initialize router
const router = express.Router();

router.route("/categories").get(getProductCategories);
router.route("/topfiverated").get(getTopFiveRatedProducts);
router.route("/:id/reviews").post(protect, createProductReview);

router.route("/").get(getProducts).post(protect, admin, createProduct);

router
  .route("/:id")
  .get(getProduct)
  .delete(protect, admin, deleteProduct)
  .patch(protect, admin, editProduct);

export default router;
