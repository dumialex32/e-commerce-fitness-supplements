import express from "express";
import {
  addOrderItems,
  getAllOrders,
  getOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrdeToDelivered,
} from "../controllers/orderController";
import { admin, protect } from "../middleware/authMiddleware";

const router = express.Router();

router
  .route("/")
  .get(protect, admin, getAllOrders)
  .post(protect, addOrderItems);
router.route("/orders").get(protect, getOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/deliver").put(protect, admin, updateOrdeToDelivered);
router.route("/:id/pay").put(protect, admin, updateOrderToPaid);

export default router;
