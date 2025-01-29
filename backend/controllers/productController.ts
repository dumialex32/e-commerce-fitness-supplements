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
  const { name, price, category, brand, countInStock, description, image } =
    req.body.patch;
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.category = category;
    product.brand = brand;
    product.countInStock = countInStock;
    product.description = description;
    product.image = image;
    const productUpdated = await product.save();

    res.status(200).json(productUpdated);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const createProductReview = asyncHandler(
  async (req: Request, res: Response) => {
    const { id: productId } = req.params;
    const { rating, comment } = req.body;
    console.log(rating, comment);
    console.log(req.body);

    const product = await Product.findById(productId);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (review) => review.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already reviewed");
      }

      const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
      };

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, review) => acc + review.rating, 0) /
        product.reviews.length;

      await product.save();

      res
        .status(200)
        .json({ message: "Product review successfully done", product });
    } else {
      res.send(404);
      throw new Error("Product not found");
    }
  }
);

export {
  getProducts,
  getProduct,
  deleteProduct,
  createProduct,
  editProduct,
  createProductReview,
};
