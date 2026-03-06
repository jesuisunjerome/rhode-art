import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2026-01-28.clover", // Lock to a specific API version for stability
});

/**
 * Creates a Stripe PaymentIntent for the given order.
 * Amount is always calculated server-side — never trust the frontend.
 *
 * @param {number} totalPriceInCents - Amount in smallest currency unit (e.g. cents)
 * @param {string} currency - ISO currency code (e.g. "usd", "mxn")
 * @param {string} orderId - MongoDB order ID used as idempotency key
 * @param {object} metadata - Extra info stored on the PaymentIntent in Stripe
 */
export const createPaymentIntent = async (
  totalPriceInCents,
  currency = "usd",
  orderId,
  metadata = {},
) => {
  return stripe.paymentIntents.create(
    {
      amount: totalPriceInCents,
      currency,
      payment_method_types: ["card"], // "apple_pay" is included automatically via card
      metadata: {
        orderId: orderId.toString(),
        ...metadata,
      },
    },
    {
      idempotencyKey: `order-${orderId}`, // Prevents duplicate charges on retries
    },
  );
};

/**
 * Verifies a Stripe webhook event using the raw request body and signature header.
 * IMPORTANT: This must receive the raw (un-parsed) body — use express.raw() on the route.
 *
 * @param {Buffer} rawBody - Raw request body buffer
 * @param {string} sig - Value of the `stripe-signature` header
 */
export const constructWebhookEvent = (rawBody, sig) => {
  return stripe.webhooks.constructEvent(
    rawBody,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET,
  );
};
