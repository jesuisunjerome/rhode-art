import { useCartStore } from "../store/useCartStore";
import { IVA } from "../utils/constants";
import { formatCurrency } from "../utils/helper";

export default function CartTotal() {
  const { getCartSubtotal, getCartTotalWithIVA } = useCartStore();

  const subtotal = getCartSubtotal();
  const ivaAmount = subtotal * IVA;
  const total = getCartTotalWithIVA();

  return (
    <>
      <div className="flex justify-between text-slate-500 text-sm">
        <span>Subtotal:</span>
        <span>
          {formatCurrency(subtotal)}
        </span>
      </div>
      <div className="flex justify-between text-slate-500 text-sm">
        <span>IVA ({IVA * 100}%):</span>
        <span>
          {formatCurrency(ivaAmount)}
        </span>
      </div>
      <div className="flex justify-between font-semibold text-sm">
        <span>Total:</span>
        <span>
          {formatCurrency(total)}
        </span>
      </div>
    </>
  );
}
