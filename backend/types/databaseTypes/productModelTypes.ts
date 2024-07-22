import { Document, Types } from "mongoose";

export interface IReviewSchema {
  user: Types.ObjectId;
  name: string;
  rating: number;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProductSchema extends Document {
  user: Types.ObjectId;
  name: string;
  image: string;
  brand: string;
  category: string;
  description: string;
  reviews: IReviewSchema[];
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
  createdAt?: Date;
  updatedAt?: Date;
}
