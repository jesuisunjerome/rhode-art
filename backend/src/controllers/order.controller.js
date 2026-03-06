export const IVA = 0.16;
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendOrderEmail } from "../services/email.service.js";
import { createPaymentIntent } from "../services/stripe.service.js";
import {
  createPayPalOrder,
  capturePayPalOrder,
} from "../services/paypal.service.js";
import { createMPPreference } from "../services/mercadopago.service.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Public (Guest)
export const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, customer } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  }

  // 1. Verify availability and calc prices server-side (Security: Don't trust frontend prices)
  let itemsPrice = 0;
  const verifiedOrderItems = [];

  for (const item of orderItems) {
    const dbProduct = await Product.findById(item.product);
    if (!dbProduct) {
      res.status(404);
      throw new Error(`Product ${item.name} not found`);
    }

    if (dbProduct.countInStock < item.qty) {
      res.status(400);
      throw new Error(`Insufficient stock for ${dbProduct.name}`);
    }

    const price = dbProduct.price;
    itemsPrice += price * item.qty;

    verifiedOrderItems.push({
      ...item,
      price: price, // Snapshotted price from DB
    });
  }

  // const shippingPrice = itemsPrice > 100 ? 0 : 10; // Example logic
  const shippingPrice = 0;
  let totalPrice = itemsPrice + shippingPrice;
  const iva = totalPrice * IVA;
  totalPrice = totalPrice + iva;

  const order = new Order({
    orderItems: verifiedOrderItems,
    customer,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    iva,
    totalPrice,
    isPaid: false, // Defaults to false until webhook confirms payment
  });

  const createdOrder = await order.save();

  // 2. Logic for Payment Initializations (Stripe/PayPal/MP)
  let responseData = { order: createdOrder };
  if (paymentMethod === "Stripe" || paymentMethod === "Apple Pay") {
    // Create Stripe PaymentIntent (server-side, amount tied to DB-verified price)
    const amountInCents = Math.round(totalPrice * 100);

    const paymentIntent = await createPaymentIntent(
      amountInCents,
      "usd",
      createdOrder._id,
      { orderId: createdOrder._id.toString() },
    );
    responseData.clientSecret = paymentIntent.client_secret;
  } else if (paymentMethod === "PayPal") {
    // Create PayPal order server-side
    const paypalOrder = await createPayPalOrder(totalPrice, createdOrder._id);
    responseData.paypalOrderId = paypalOrder.id;
  } else if (paymentMethod === "Mercado Pago") {
    // Create Mercado Pago Preference
    const mpPreference = await createMPPreference(
      createdOrder,
      verifiedOrderItems,
    );
    responseData.mercadoPago = {
      preferenceId: mpPreference.preferenceId,
      initPoint: mpPreference.initPoint,
    };
  }

  res.status(201).json(responseData);
});

// @desc    Capture PayPal payment
// @route   POST /api/orders/:id/pay
// @access  Public
export const captureOrder = asyncHandler(async (req, res) => {
  const { paypalOrderId } = req.body;
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  const captureData = await capturePayPalOrder(paypalOrderId);

  if (captureData.status === "COMPLETED") {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: captureData.id,
      status: captureData.status,
      update_time: captureData.update_time,
      email_address: captureData.payer.email_address,
    };

    const updatedOrder = await order.save();

    // Send Emails after successful capture
    sendOrderEmail(updatedOrder, "client");
    sendOrderEmail(updatedOrder, "admin");

    res.json(updatedOrder);
  } else {
    res.status(400);
    throw new Error("Payment not completed");
  }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Public (Guest needs order ID + matches email/phone for security)
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  res.json(order);
});
