import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_PORT === "465", // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOrderEmail = async (order, type = "client") => {
  const isAdmin = type === "admin";
  const recipient = isAdmin ? process.env.ADMIN_EMAIL : order.customer.email;
  const subject = isAdmin
    ? `🔔 Nuevo Pedido Recibido #${order._id}`
    : `🎨 Confirmación de tu pedido en Rhode Art #${order._id}`;

  const itemsHtml = order.orderItems
    .map(
      (item) => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.qty}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">$${item.price}</td>
    </tr>
  `,
    )
    .join("");

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
      <h2 style="color: #fa7132; text-align: center;">Rhode Art</h2>
      <h3>${isAdmin ? "Resumen de venta" : "¡Gracias por tu compra!"}</h3>
      <p>ID del pedido: <strong>${order._id}</strong></p>
      
      <h4>Detalles del Cliente:</h4>
      <ul>
        <li>Nombre: ${order.customer.name}</li>
        <li>Email: ${order.customer.email}</li>
        <li>Teléfono: ${order.customer.phone || "No proporcionado"}</li>
      </ul>

      <h4>Dirección de Envío:</h4>
      <p>${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}</p>

      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background-color: #f9f9f9;">
            <th style="text-align: left; padding: 10px;">Producto</th>
            <th style="text-align: left; padding: 10px;">Cant.</th>
            <th style="text-align: left; padding: 10px;">Precio</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>

      <div style="margin-top: 20px; text-align: right;">
        <p>Subtotal: $${order.itemsPrice}</p>
        <p>Envío: $${order.shippingPrice}</p>
        <p style="font-size: 18px; font-weight: bold; color: #fa7132;">Total: $${order.totalPrice}</p>
      </div>

      <p style="font-size: 12px; color: #888; margin-top: 30px; text-align: center;">
        Este es un correo automático, por favor no respondas a este mensaje.
      </p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Rhode Art" <${process.env.EMAIL_USER}>`,
      to: recipient,
      subject: subject,
      html: html,
    });
    console.log(`Email sent successfully to ${recipient} (${type})`);
  } catch (error) {
    console.error(`Error sending email to ${recipient}:`, error);
    // Don't throw here to avoid failing the order creation if only the email fails
  }
};
