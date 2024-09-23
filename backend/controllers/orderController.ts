import { Request, Response, NextFunction } from "express";

/**
 * @desc: Get logged in user orders
 * @route: GET /api/orders/myorders
 * @access: Private
 */

const getMyOrders = (req: Request, res: Response, next: NextFunction) => {
  res.send("Get my orders");
};

/**
 * @desc: Create new order
 * @route: POST /api/orders
 * @access: Private
 */

const createOrder = (req: Request, res: Response, next: NextFunction) => {
  res.send("Create order");
};

/**
 * @desc: Get order by ID
 * @route: GET /api/orders/:id
 * @access: Private
 */

const getOrderById = (req: Request, res: Response, next: NextFunction) => {
  res.send("Get order by id");
};

/**
 * @desc: Get all orders
 * @route: GET /api/orders/
 * @access: Private/Admin
 */

const getAllOrders = (req: Request, res: Response, next: NextFunction) => {
  res.send("Get all orders");
};

/**
 * @desc: Update order to delivered
 * @route: PUT /api/orders/:id/deliver
 * @access: Private
 */

const updateOrdeToDelivered = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send("Update order to delivered");
};

/**
 *@desc: Update order to paid
 *@route: PUT /api/orders/:id/pay
 *@access: Private
 */

const updateOrderToPaid = (req: Request, res: Response, next: NextFunction) => {
  res.send("Update order to paid");
};

export {
  getMyOrders,
  createOrder,
  getOrderById,
  getAllOrders,
  updateOrdeToDelivered,
  updateOrderToPaid,
};
