import {
  PaymentRequestButtonElement,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ORDER_API } from "../../../services/orders";
import { useCartStore } from "../../../store/useCartStore";
import { PAYMENT_METHOD_NAMES } from "../../../utils/constants";

/**
 * ApplePayButton
 *
 * Uses Stripe's Payment Request API to show a native Apple Pay sheet.
 * Only renders if the browser + device supports Apple Pay (Safari on Apple hardware).
 *
 * Flow:
 * 1. User fills in shipping form → parent passes `formData` as prop.
 * 2. User clicks the Apple Pay button → native sheet opens.
 * 3. On `paymentmethod` event: we call createOrder (server validates stock + prices).
 * 4. Server returns `clientSecret` tied to the server-computed amount.
 * 5. We call stripe.confirmCardPayment with the clientSecret.
 * 6. Stripe fires a webhook → backend marks order as paid.
 */
export default function ApplePayButton({ disabled, formData, onSuccess }) {
  const stripe = useStripe();
  const { cart, getCartTotalWithIVA, clearCart } = useCartStore();
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [canPay, setCanPay] = useState(false);

  const total = getCartTotalWithIVA();

  useEffect(() => {
    if (!stripe || total <= 0 || disabled) return;

    const pr = stripe.paymentRequest({
      country: "US",
      currency: "usd",
      total: {
        label: "Rhode Art",
        amount: Math.round(total * 100), // Amount in cents
      },
      requestPayerName: true,
      requestPayerEmail: true,
      requestShipping: false, // We collect shipping in our form
    });

    // Check if Apple Pay / Payment Request is available
    pr.canMakePayment().then((result) => {
      if (result) {
        setPaymentRequest(pr);
        setCanPay(true);
      }
    });

    // Handle the payment method event (fires when user approves in Apple Pay sheet)
    pr.on("paymentmethod", async (ev) => {
      try {
        if (!formData?.customer?.email || !formData?.shippingAddress?.address) {
          toast.error("Por favor completa los datos de envío antes de pagar.");
          ev.complete("fail");
          return;
        }

        // 1. Create order on backend — server re-calculates the total (security)
        const orderPayload = {
          orderItems: cart.map((item) => ({
            product: item._id,
            name: item.name,
            qty: item.qty,
            image: item.images?.[0] || "",
            price: item.price, // Overridden server-side
          })),
          customer: formData.customer,
          shippingAddress: formData.shippingAddress,
          paymentMethod: PAYMENT_METHOD_NAMES.APPLEPAY,
        };

        const { order, clientSecret } =
          await ORDER_API.createOrder(orderPayload);

        // 2. Confirm the payment using the server-generated clientSecret
        const { error, paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          { payment_method: ev.paymentMethod.id },
          { handleActions: false },
        );

        if (error) {
          ev.complete("fail");
          toast.error(error.message || "El pago falló. Inténtalo de nuevo.");
          return;
        }

        // 3. Handle different payment statuses
        if (paymentIntent.status === "succeeded") {
          ev.complete("success");
          clearCart();
          // toast.success("¡Pago completado con Apple Pay!");
          onSuccess?.(order._id);
        } else if (paymentIntent.status === "requires_action") {
          // This case is for things like 3D Secure.
          // We complete the Apple Pay sheet first, then handle the next action.
          ev.complete("success");
          const { error: actionError, paymentIntent: updatedPI } =
            await stripe.confirmCardPayment(clientSecret);

          if (actionError) {
            throw new Error(actionError.message);
          }

          if (updatedPI.status === "succeeded") {
            clearCart();
            toast.success("¡Pago completado con Apple Pay!");
            onSuccess?.(order._id);
          } else {
            throw new Error(
              `El pago no se pudo completar. Estado: ${updatedPI.status}`,
            );
          }
        } else {
          // For other statuses like 'processing' or 'requires_payment_method'
          ev.complete("fail");
          throw new Error(`Estado de pago inesperado: ${paymentIntent.status}`);
        }
      } catch (err) {
        ev.complete("fail");
        toast.error(err.message || "Error al procesar el pago.");
        console.error("Apple Pay payment error:", err);
      }
    });
    // The payment request object and its event listeners are recreated
    // whenever the cart total or form validity changes.
  }, [stripe, total, disabled, cart, formData, clearCart, onSuccess]);

  if (!canPay) {
    return (
      <p className="text-center text-slate-400 text-sm py-2">
        Apple Pay no está disponible en este dispositivo o navegador.
      </p>
    );
  }

  return (
    <div className="w-full">
      <PaymentRequestButtonElement
        options={{
          paymentRequest,
          style: {
            paymentRequestButton: {
              type: "buy",
              theme: "dark",
              height: "48px",
            },
          },
        }}
      />
    </div>
  );
}
