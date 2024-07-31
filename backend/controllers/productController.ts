import { Request, Response } from "express";
import Product from "../models/productModel";
import { IProductSchema } from "../types/databaseTypes/productModelTypes";
import asyncHandler from "../middleware/asyncHandler";

const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products: IProductSchema[] = await Product.find({});

  if (!products || products.length === 0) {
    throw new Error("Products not found");
  }

  res.json(products);
});

const getProduct = asyncHandler(async (req: Request, res: Response) => {
  const product: IProductSchema | null = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error(`Product with id: ${req.params.id} not found`);
  }

  res.json(product);
});

export { getProducts, getProduct };
