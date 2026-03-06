import { MoveLeftIcon } from "lucide-react";
import { Link } from "react-router";
import { useCartStore } from "../store/useCartStore";
import CartItem from "./CartItem";
import CartTotal from "./CartTotal";

export default function ShoppingCart({ isOpen, onClose }) {
  const { cart, clearCart } = useCartStore();

  return (
    <aside
      className={`fixed top-0 right-0 w-full h-full z-50 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div
        onClick={onClose}
        className={`w-full h-full bg-black/70 backdrop-blur-xs shadow-lg z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      />
      <div
        className={`fixed top-0 right-0 w-full sm:w-96 h-full flex flex-col bg-light shadow-lg z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center gap-2 p-4 border-b border-slate-100">
          <button
            className="text-slate-500 hover:text-slate-700"
            onClick={onClose}
          >
            <MoveLeftIcon className="w-5 h-5" />
          </button>
          <h4 className="text-lg font-semibold text-primary-dark">
            Carrito de compras ({cart.length})
          </h4>
        </div>
        {cart.length === 0 ? (
          <div className="p-4">
            <p className="mb-2">El carrito está vacío</p>
            <Link
              to="/collection"
              onClick={onClose}
              className="text-accent underline text-sm"
            >
              Ver toda la colección
            </Link>
          </div>
        ) : (
          <>
            <div className="p-4 flex-1 overflow-y-auto">
              <div className="space-y-5">
                {cart.map((item) => (
                  <CartItem
                    key={item._id}
                    item={item}
                    showRemoveButton={true}
                  />
                ))}
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-1.5 mb-3">
                <CartTotal />
              </div>
              <div className="flex flex-col justify-center gap-2">
                <Link
                  to="/checkout"
                  onClick={onClose}
                  className="btn-primary w-full"
                >
                  Proceder al pago
                </Link>
                <button onClick={clearCart} className="btn-secondary w-full">
                  Vaciar carrito
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
