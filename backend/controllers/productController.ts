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

const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const { name, price, category, brand, countInStock, description, image } =
    req.body;

  const product = {
    user: req.user?._id,
    name,
    price,
    category,
    brand,
    countInStock,
    description,
    image,
    rating: 0,
    numReviews: 0,
    reviews: [],
  };

  const createdProduct = await Product.create(product);

  res.status(200).json(createdProduct);
});

const editProduct = asyncHandler(async (req: Request, res: Response) => {
  const { name, price, category, brand, countInStock, description } =
    req.body.patch;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.category = category;
    product.brand = brand;
    product.countInStock = countInStock;
    product.description = description;
    const productUpdated = await product.save();

    res.status(200).json(productUpdated);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { getProducts, getProduct, deleteProduct, createProduct, editProduct };
