import { Request, Response } from "express";
import Product from "../models/productModel";
import { IProductSchema } from "../types/models/productModelTypes";
import asyncHandler from "../middleware/asyncHandler";
import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from "../constants";

const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const pageSize = Math.min(
    Math.max(
      parseInt(req.query.pageSize as string, 10) || DEFAULT_PAGE_SIZE,
      1
    ),
    MAX_PAGE_SIZE
  );

  const page = Math.max(parseInt(req.query.page as string, 10) || 1, 1);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filter: Record<string, any> = {};

  const sort: Record<string, 1 | -1> = {};

  if (req.query.category) {
    filter.category = req.query.category;
  }

  if (req.query.searchKey) {
    filter.name = { $regex: req.query.searchKey, $options: "i" };
  }

  const SORTABLE_FIELDS = ["price", "date", "rating", "name"];

  const sortBy = req.query.sortBy as string;
  const order = req.query.order === "desc" ? -1 : 1;

  if (SORTABLE_FIELDS.includes(sortBy)) {
    sort[sortBy] = order;
  }
  const [count, products] = await Promise.all([
    Product.countDocuments(filter),
    Product.find(filter)
      .sort(sort)
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .select("-__v"),
  ]);

  res.json({
    products,
    count,
    pageCount: Math.ceil(count / pageSize),
  });
});

const getProductCategories = asyncHandler(
  async (req: Request, res: Response) => {
    const productCategories = await Product.distinct("category");

    res.status(200).json(productCategories);
  }
);

const getTopFiveRatedProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const topFiveRatedProducts = await Product.find()
      .sort({ rating: -1, numReviews: -1 })
      .limit(5);

    res.status(200).json(topFiveRatedProducts);
  }
);

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

  res
    .status(200)
    .json({ createdProduct, message: "Product sucessfully created" });
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

    res
      .status(200)
      .json({ productUpdated, message: "Product successfully updated" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const createProductReview = asyncHandler(
  async (req: Request, res: Response) => {
    const { id: productId } = req.params;
    const { rating, comment } = req.body;

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
  getProductCategories,
  getTopFiveRatedProducts,
  deleteProduct,
  createProduct,
  editProduct,
  createProductReview,
};
