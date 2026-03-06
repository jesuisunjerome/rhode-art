import express from "express";
import {
  handleStripeWebhook,
  handleMPWebhook,
} from "../controllers/payment.controller.js";

const router = express.Router();

// POST /api/payments/webhook
// IMPORTANT: express.raw() is applied at the server level for this route.
router.post("/webhook", handleStripeWebhook);

// POST /api/payments/webhook/mercadopago
router.post("/webhook/mercadopago", handleMPWebhook);

export default router;
