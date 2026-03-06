import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import toast from "react-hot-toast";
import { ORDER_API } from "../../../services/orders";
import { useCartStore } from "../../../store/useCartStore";
import { PAYMENT_METHOD_NAMES } from "../../../utils/constants";

export default function StripeButton({ formData, disabled, onSuccess }) {
  const stripe = useStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const { cart, clearCart } = useCartStore();

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    try {
      // 1. Create order on backend to get clientSecret
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
        paymentMethod: PAYMENT_METHOD_NAMES.STRIPE,
      };

      const { order, clientSecret } = await ORDER_API.createOrder(orderPayload);

      // 2. Use stripe.confirmCardPayment with the clientSecret
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: formData.customer.name,
              email: formData.customer.email,
              phone: formData.customer.phone,
              address: {
                line1: formData.shippingAddress.address,
                city: formData.shippingAddress.city,
                postal_code: formData.shippingAddress.postalCode,
                country: formData.shippingAddress.country,
              },
            },
          },
        },
      );

      if (error) {
        throw new Error(error.message);
      }

      if (paymentIntent.status === "succeeded") {
        clearCart();
        // toast.success("¡Pago completado con éxito!");
        onSuccess(order._id);
      } else {
        throw new Error("El pago no se pudo completar.");
      }
    } catch (err) {
      console.error("Stripe Error:", err);
      toast.error(err.message || "Error al procesar el pago con Stripe");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-4 border border-slate-200 bg-slate-50 rounded-lg">
        <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
          Información de Tarjeta
        </label>
        <div className="p-3 bg-white border border-slate-200 rounded shadow-sm">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
              hidePostalCode: true, // We already collect this in our form
            }}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={handlePayment}
        disabled={disabled || isProcessing || !stripe}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>
            <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full font-bold"></span>
            Procesando Pago...
          </>
        ) : (
          "Pagar con Tarjeta"
        )}
      </button>

      <p className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-3 h-3"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        Pagos seguros encriptados por Stripe
      </p>
    </div>
  );
}
