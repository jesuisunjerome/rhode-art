import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Load Stripe once outside component to avoid re-creating on each render
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const elementsOptions = {
  appearance: {
    theme: "stripe",
    variables: {
      colorPrimary: "#1a1a1a",
      borderRadius: "0px",
    },
  },
};

export default function StripeProvider({ children }) {
  return (
    <Elements stripe={stripePromise} options={elementsOptions}>
      {children}
    </Elements>
  );
}
