import express from "express";
import {
  createOrder,
  getOrderById,
  captureOrder,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/:id", getOrderById);
router.post("/:id/pay", captureOrder);

export default router;
