import { Request } from "express";
import { IUserSchema } from "../models/userModelTypes";

export interface ICustomRequest extends Request {
  user?: IUserSchema;
}
