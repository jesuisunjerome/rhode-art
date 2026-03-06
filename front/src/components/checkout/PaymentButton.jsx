import { PAYMENT_METHOD_NAMES } from "../../utils/constants";
import ApplePayButton from "./payments/ApplePayButton";
import MercadoPagoButton from "./payments/MercadoPagoButton";
import PayPalButton from "./payments/PayPalButton";
import StripeButton from "./payments/StripeButton";

export default function PaymentButton({
  paymentMethod,
  formData,
  disabled,
  onSuccess,
}) {
  switch (paymentMethod) {
    case PAYMENT_METHOD_NAMES.PAYPAL:
      return (
        <PayPalButton
          formData={formData}
          disabled={disabled}
          onSuccess={onSuccess}
        />
      );
    case PAYMENT_METHOD_NAMES.APPLEPAY:
      return <ApplePayButton formData={formData} onSuccess={onSuccess} />;
    case PAYMENT_METHOD_NAMES.MERCADOPAGO:
      return (
        <MercadoPagoButton
          formData={formData}
          disabled={disabled}
          onSuccess={onSuccess}
        />
      );
    case PAYMENT_METHOD_NAMES.STRIPE:
      return (
        <StripeButton
          formData={formData}
          disabled={disabled}
          onSuccess={onSuccess}
        />
      );
    default:
      return null;
  }
}
