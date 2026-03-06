import Order from "../models/Order.js";
import asyncHandler from "../utils/asyncHandler.js";
import { constructWebhookEvent } from "../services/stripe.service.js";
import { sendOrderEmail } from "../services/email.service.js";

// @desc    Handle Stripe webhook events (payment confirmations)
// @route   POST /api/payments/webhook
// @access  Stripe only (verified via signature)
export const handleStripeWebhook = asyncHandler(async (req, res) => {
  const sig = req.headers["stripe-signature"];

  if (!sig) {
    res.status(400);
    throw new Error("Missing stripe-signature header");
  }

  let event;
  try {
    // constructWebhookEvent verifies the signature — rejects tampered payloads
    event = constructWebhookEvent(req.body, sig);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    res.status(400);
    throw new Error(`Webhook Error: ${err.message}`);
  }

  // Handle the events we care about
  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;
      const orderId = paymentIntent.metadata?.orderId;

      if (!orderId) {
        console.warn(
          "Webhook: payment_intent.succeeded missing orderId metadata",
        );
        break;
      }

      const order = await Order.findById(orderId);
      if (!order) {
        console.warn(`Webhook: Order ${orderId} not found`);
        break;
      }

      if (order.isPaid) {
        // Idempotency guard — ignore duplicate webhooks
        console.log(`Webhook: Order ${orderId} already marked as paid`);
        break;
      }

      order.isPaid = true;
      order.paidAt = new Date();
      order.paymentResult = {
        id: paymentIntent.id,
        status: paymentIntent.status,
        update_time: new Date(paymentIntent.created * 1000).toISOString(),
        email_address: paymentIntent.receipt_email || "",
      };

      console.log("Order", order);
      await order.save();
      console.log("email client");
      // Send Emails after successful payment via Stripe webhook
      sendOrderEmail(order, "client");
      console.log("email admin");
      sendOrderEmail(order, "admin");
      break;
    }

    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object;
      console.warn(
        `Payment failed for order ${paymentIntent.metadata?.orderId}: ${paymentIntent.last_payment_error?.message}`,
      );
      break;
    }

    default:
      // Silently ignore other event types
      break;
  }

  // Stripe requires a 200 response within 5 seconds to acknowledge receipt
  res.json({ received: true });
});

/**
 * @desc    Handle Mercado Pago webhook events
 * @route   POST /api/payments/webhook/mercadopago
 * @access  Mercado Pago only
 */
export const handleMPWebhook = asyncHandler(async (req, res) => {
  // Since this route is under /api/payments/webhook, it might receive a Buffer (raw body)
  let body = req.body;
  if (Buffer.isBuffer(req.body)) {
    try {
      body = JSON.parse(req.body.toString());
    } catch (e) {
      console.error("Error parsing Mercado Pago webhook body:", e);
      return res.status(400).send("Invalid JSON");
    }
  }

  const { action, data, type } = body;

  // We are interested in payment created/updated
  if (
    action === "payment.created" ||
    action === "payment.updated" ||
    type === "payment"
  ) {
    const paymentId = data?.id || body.resource?.split("/").pop(); // Handle different MP webhook versions

    if (paymentId) {
      const { getMPPayment } =
        await import("../services/mercadopago.service.js");
      try {
        const payment = await getMPPayment(paymentId);

        if (payment.status === "approved") {
          const orderId =
            payment.external_reference || payment.metadata?.order_id;

          if (orderId) {
            const order = await Order.findById(orderId);
            if (order && !order.isPaid) {
              order.isPaid = true;
              order.paidAt = new Date();
              order.paymentResult = {
                id: payment.id.toString(),
                status: payment.status,
                update_time: payment.date_approved,
                email_address: payment.payer?.email || "",
              };
              await order.save();

              // Send Emails after successful payment via MP webhook
              sendOrderEmail(order, "client");
              sendOrderEmail(order, "admin");

              console.log(
                `✅ Order ${orderId} marked as paid via Mercado Pago webhook`,
              );
            }
          }
        }
      } catch (error) {
        console.error("Error processing Mercado Pago webhook:", error);
      }
    }
  }

  // Mercado Pago expects a 200 or 201 response
  res.status(200).send("OK");
});
