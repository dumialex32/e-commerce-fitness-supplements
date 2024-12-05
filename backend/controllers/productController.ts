import { Request, Response } from "express";
import Product from "../models/productModel";
import { IProductSchema } from "../types/models/productModelTypes";
import asyncHandler from "../middleware/asyncHandler";

const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products: IProductSchema[] = await Product.find({});

  // if no products return an empty array

  res.json(products);
});

const getProduct = asyncHandler(async (req: Request, res: Response) => {
  const product: IProductSchema | null = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error(`Resource with id: ${req.params.id} not found`);
  }

  res.json(product);
});

const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Product deleted successfully" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { getProducts, getProduct, deleteProduct };
