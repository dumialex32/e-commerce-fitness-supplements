import { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import Order from "../models/orderModel";
import { IOrderSchema } from "../types/models/orderModelTypes";
import { IProductSchema } from "../types/models/productModelTypes";
import mongoose from "mongoose";

/**
 * @desc: Get logged in user orders
 * @route: GET /api/orders/myorders
 * @access: Private
 */

const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

/**
 * @desc: Create new order
 * @route: POST /api/orders
 * @access: Private
 */

const addOrderItems = asyncHandler(async (req: Request, res: Response) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order: IOrderSchema = new Order({
      user: req.user._id,
      orderItems: orderItems.map((item: IProductSchema) => {
        return { ...item, product: item._id, _id: undefined }; // retrieve product _id and store it within the product property of each orderItem and remove the _id from orderItem obj
      }),
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

/**
 * @desc: Get order by ID
 * @route: GET /api/orders/:id
 * @access: Private
 */

const getOrderById = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid order ID");
  }

  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

/**
 * @desc: Get all orders
 * @route: GET /api/orders/
 * @access: Private/Admin
 */

const getAllOrders = asyncHandler(async (req: Request, res: Response) => {
  const orders = await Order.find({});

  res.status(200).json(orders);
});

/**
 * @desc: Update order to delivered
 * @route: PUT /api/orders/:id/deliver
 * @access: Private
 */

const updateOrdeToDelivered = asyncHandler(
  async (req: Request, res: Response) => {
    return res.send("Update order to delivered");
  }
);

/**
 *@desc: Update order to paid
 *@route: PUT /api/orders/:id/pay
 *@access: Private
 */

const updateOrderToPaid = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id);
  console.log(req.body);
  // if there is an order document matched, update it's specified fields
  if (order) {
    order.isPaid = true;
    order.paidAt = new Date();
    order.paymentResult = {
      id: req.body.details.id,
      status: req.body.details.status,
      update_time: req.body.details.update_time,
      email_address: req.body.details.payer.email_address,
    };

    // save the entire updated document within db
    const updatedOrder = await order.save();

    // return the document with the updated fields
    res.status(200).json(updatedOrder);
    console.log(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export {
  getMyOrders,
  addOrderItems,
  getOrderById,
  getAllOrders,
  updateOrdeToDelivered,
  updateOrderToPaid,
};
