import { useCreateOrder } from "../../../hooks/orders/mutations";
import { useCartStore } from "../../../store/useCartStore";
import { PAYMENT_METHOD_NAMES } from "../../../utils/constants";

export default function MercadoPagoButton({ formData, disabled, onSuccess }) {
  const { cart } = useCartStore();
  const { createOrder, isPending } = useCreateOrder();

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
      paymentMethod: PAYMENT_METHOD_NAMES.MERCADOPAGO,
    };

    await createOrder(orderPayload, {
      onSuccess: (data) => {
        if (data.mercadoPago?.initPoint) {
          // Redirect to Mercado Pago Checkout Pro
          window.location.href = data.mercadoPago.initPoint;
        } else {
          throw new Error("No se pudo iniciar el pago con Mercado Pago.");
        }
      },
    });
  };

  return (
    <button
      type="button"
      onClick={handlePayment}
      disabled={disabled || isPending}
      className="btn-primary w-full"
    >
      {isPending ? (
        <>
          <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
          Procesando...
        </>
      ) : (
        "Pagar con Mercado Pago"
      )}
    </button>
  );
}
