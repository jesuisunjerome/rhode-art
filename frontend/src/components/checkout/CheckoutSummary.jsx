import CartItem from "../../common/CartItem";
import CartTotal from "../../common/CartTotal";
import { useCartStore } from "../../store/useCartStore";

export default function CheckoutSummary() {
  const { cart } = useCartStore();

  if (cart.length === 0) {
    return (
      <div className="bg-slate-50 p-8 text-center border border-slate-200">
        <p className="text-slate-500">Tu carrito está vacío</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 p-8 border border-slate-200 space-y-8 sticky top-24">
      <h2 className="text-lg font-semibold uppercase text-primary-dark mb-6">
        Resumen del Pedido
      </h2>

      <div className="space-y-4">
        {cart.map((item) => (
          <CartItem key={item._id} item={item} showSmallDescription={true} />
        ))}
      </div>

      <div className="pt-6 border-t border-slate-200 space-y-3">
        <CartTotal />
      </div>

      <div className="text-[10px] text-slate-400 uppercase tracking-widest text-center mt-4">
        Transacción Segura · Rhode Art
      </div>
    </div>
  );
}
