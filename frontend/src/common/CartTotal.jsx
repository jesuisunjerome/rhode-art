import { useCartStore } from "../store/useCartStore";
import { IVA } from "../utils/mockupData";

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
          {subtotal.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </span>
      </div>
      <div className="flex justify-between text-slate-500 text-sm">
        <span>IVA ({IVA * 100}%):</span>
        <span>
          {ivaAmount.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </span>
      </div>
      <div className="flex justify-between font-semibold text-sm">
        <span>Total:</span>
        <span>
          {total.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </span>
      </div>
    </>
  );
}
