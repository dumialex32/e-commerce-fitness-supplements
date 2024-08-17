import { Response, NextFunction } from "express";

import { ICustomRequest } from "../types/express/middlewareTypes";

type AsyncRequestHandler = (
  req: ICustomRequest,
  res: Response,
  next: NextFunction
) => Promise<unknown>;

const asyncHandler =
  (
    fn: AsyncRequestHandler
  ): ((req: ICustomRequest, res: Response, next: NextFunction) => void) =>
  (req: ICustomRequest, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export default asyncHandler;
