import { Types } from "mongoose";

export interface IProductData {
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
}

export interface IProductWithUser extends IProductData {
  user: Types.ObjectId;
}
