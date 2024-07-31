import express from "express";
import { getProduct, getProducts } from "../controllers/productController";

// initialize router
const router = express.Router();

// get all products
router.get("/", getProducts);

//get product
router.get("/:id", getProduct);

export default router;
