import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import dotenv from "dotenv";
dotenv.config();

// Initialize Mercado Pago with Access Token
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

/**
 * Get payment details by ID
 * @param {string} paymentId - Mercado Pago payment ID
 */
export const getMPPayment = async (paymentId) => {
  const payment = new Payment(client);
  console.log(payment);
  const response = await payment.get({ id: paymentId });
  console.log(response);
  return response;
};

/**
 * Create a Mercado Pago Preference for the given order.
 * @param {object} order - The order document from MongoDB
 * @param {Array} orderItems - Array of order items
 */
export const createMPPreference = async (order, orderItems) => {
  const preference = new Preference(client);

  const response = await preference.create({
    body: {
      items: orderItems.map((item) => ({
        id: item.product.toString(),
        title: item.name,
        quantity: item.qty,
        unit_price: item.price,
        currency_id: "USD", // Adjust if needed, Mercado Pago supports multiple
      })),
      shipments: {
        cost: order.shippingPrice,
        mode: "not_specified",
      },
      back_urls: {
        success: `${process.env.FRONTEND_URL}/order/${order._id}?status=success`,
        failure: `${process.env.FRONTEND_URL}/order/${order._id}?status=failure`,
        pending: `${process.env.FRONTEND_URL}/order/${order._id}?status=pending`,
      },
      auto_return: "approved",
      // redirectMode:"modal",
      notification_url: `${process.env.BACKEND_URL}/api/payments/webhook/mercadopago`,
      external_reference: order._id.toString(),
      metadata: {
        order_id: order._id.toString(),
      },
    },
  });

  return {
    preferenceId: response.id,
    initPoint: response.init_point,
    sandboxInitPoint: response.sandbox_init_point,
  };
};
