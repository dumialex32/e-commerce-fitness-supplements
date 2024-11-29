import { IOrderSchema } from "../models/orderModelTypes";
import { Document } from "mongoose";

// Interface for populated order with user field as a document
export interface IPopulatedOrderSchema extends Omit<IOrderSchema, "user"> {
  user: {
    _id: string;
    name: string;
  } & Document;
}
