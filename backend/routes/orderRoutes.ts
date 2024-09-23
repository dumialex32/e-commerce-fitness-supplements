import express from "express";
import {
  createOrder,
  getAllOrders,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrdeToDelivered,
} from "../controllers/orderController";
import { admin, protect } from "../middleware/authMiddleware";

const router = express.Router();
router.route("/").get(protect, admin, getAllOrders).post(protect, createOrder);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id/deliver").put(protect, admin, updateOrdeToDelivered);
router.route("/:id/pay").put(protect, admin, updateOrderToPaid);

export default router;
