import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import {
  useCaptureOrder,
  useCreateOrder,
} from "../../../hooks/orders/mutations";
import { useCartStore } from "../../../store/useCartStore";
import { PAYMENT_METHOD_NAMES } from "../../../utils/constants";

export default function PayPalButton({ formData, disabled, onSuccess }) {
  const { cart, getCartTotalWithIVA, clearCart } = useCartStore();
  const { createOrder, isPending } = useCreateOrder();
  const { captureOrder } = useCaptureOrder();
  const total = getCartTotalWithIVA();

  const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
  const options = {
    "client-id": clientId,
    currency: "USD",
    intent: "capture",
  };

  const handlePayment = async () => {
    const orderPayload = {
      orderItems: cart.map((item) => ({
        product: item._id,
        name: item.name,
        qty: item.qty,
        image: item.images?.[0] || "",
        price: item.price,
      })),
      customer: formData.customer,
      shippingAddress: formData.shippingAddress,
      paymentMethod: PAYMENT_METHOD_NAMES.PAYPAL,
    };

    try {
      const { order, paypalOrderId } = await createOrder(orderPayload);
      window._currentOrderId = order._id;
      return paypalOrderId;
    } catch (error) {
      console.error("PayPal Create Order Error:", error);
      throw error;
    }
  };

  const onApprove = async (data) => {
    const orderId = window._currentOrderId;
    const paypalOrderId = data.orderID;

    try {
      await captureOrder(
        { orderId, paypalOrderId },
        {
          onSuccess: () => {
            clearCart();
            onSuccess(orderId);
          },
        },
      );
    } catch (error) {
      console.error("PayPal Capture Error:", error);
    }
  };

  return (
    <PayPalScriptProvider options={options}>
      <PayPalButtons
        disabled={disabled || total <= 0 || isPending}
        style={{
          layout: "vertical",
          // color: "black",
          disableMaxWidth: true,
        }}
        createOrder={handlePayment}
        onApprove={onApprove}
        // onError={onError}
      />
    </PayPalScriptProvider>
  );
}
