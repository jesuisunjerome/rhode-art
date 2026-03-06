import {
  CheckCircle2,
  ChevronRight,
  Clock,
  Package,
  XCircle,
} from "lucide-react";
import { useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router";
import { useGetOrderById } from "../hooks/orders/queries";
import { useCartStore } from "../store/useCartStore";

export default function OrderPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");
  const { order, isPending, error } = useGetOrderById(id);
  const { clearCart, cart } = useCartStore();

  useEffect(() => {
    // Clear cart if the order is successfully paid or MP status is success
    if (order?.isPaid || status === "success") {
      if (cart.length > 0) {
        clearCart();
      }
    }
  }, [order, status, clearCart, cart.length]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-slate-400 font-medium tracking-widest uppercase text-xs">
            Cargando pedido...
          </p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white text-center">
        <XCircle className="w-16 h-16 text-red-500 mb-6" />
        <h1 className="text-3xl font-serif text-primary-dark mb-4">
          Error al cargar el pedido
        </h1>
        <p className="text-slate-500 mb-8 max-w-md">
          No pudimos encontrar la información de tu pedido. Por favor, contacta
          a soporte.
        </p>
        <Link to="/" className="btn-primary">
          Volver al Inicio
        </Link>
      </div>
    );
  }

  const isSuccess = order.isPaid || status === "success";

  return (
    <div className="min-h-screen bg-slate-50/50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Status Header */}
        <div className="bg-white border border-slate-200 p-8 sm:p-12 mb-8 text-center shadow-sm">
          {isSuccess ? (
            <>
              <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif text-primary-dark mb-4 italic">
                ¡Gracias por tu compra!
              </h1>
              <p className="text-slate-500 text-lg mb-2">
                Tu pedido ha sido procesado con éxito.
              </p>
              <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">
                Orden #{order._id}
              </p>
            </>
          ) : (
            <>
              <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-50 text-amber-500 rounded-full mb-6">
                <Clock className="w-10 h-10" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif text-primary-dark mb-4 italic">
                Pago Pendiente
              </h1>
              <p className="text-slate-500 text-lg mb-2">
                Estamos esperando la confirmación de tu pago.
              </p>
              <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">
                Orden #{order._id}
              </p>
            </>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="md:col-span-2 space-y-8">
            <section className="bg-white border border-slate-200 overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/30 flex items-center gap-2">
                <Package className="w-4 h-4 text-accent" />
                <h2 className="text-xs font-bold uppercase tracking-widest text-primary-dark">
                  Resumen de la Orden
                </h2>
              </div>
              <div className="divide-y divide-slate-100">
                {order.orderItems.map((item) => (
                  <div
                    key={item._id || item.product}
                    className="p-6 flex gap-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover bg-slate-100"
                    />
                    <div className="flex-1">
                      <h3 className="text-primary-dark font-medium mb-1">
                        {item.name}
                      </h3>
                      <p className="text-slate-400 text-sm">
                        Cantidad: {item.qty}
                      </p>
                    </div>
                    <p className="font-medium text-primary-dark">
                      ${item.price.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
              <div className="p-6 bg-slate-50/30 border-t border-slate-100">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Subtotal</span>
                    <span className="text-primary-dark">
                      ${order.itemsPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">IVA</span>
                    <span className="text-primary-dark">
                      ${order.iva.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Envío</span>
                    <span className="text-primary-dark">
                      ${order.shippingPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-serif pt-4 border-t border-slate-200">
                    <span className="text-primary-dark">Total</span>
                    <span className="text-accent font-bold">
                      ${order.totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Shipping & Payment Summary */}
          <div className="space-y-8">
            <section className="bg-white border border-slate-200 p-6 shadow-sm">
              <h2 className="text-xs font-bold uppercase tracking-widest text-primary-dark mb-4 pb-4 border-b border-slate-100">
                Envío
              </h2>
              <div className="text-sm text-slate-600 space-y-1">
                <p className="font-semibold text-primary-dark mb-2">
                  {order.customer.name}
                </p>
                <p>{order.shippingAddress.address}</p>
                <p>
                  {order.shippingAddress.city},{" "}
                  {order.shippingAddress.postalCode}
                </p>
                <p>{order.shippingAddress.country}</p>
                <div className="pt-4 mt-4 border-t border-slate-100">
                  <p className="text-slate-400 text-xs italic mb-1">
                    Contacto:
                  </p>
                  <p>{order.customer.email}</p>
                  <p>{order.customer.phone}</p>
                </div>
              </div>
            </section>

            <section className="bg-white border border-slate-200 p-6 shadow-sm">
              <h2 className="text-xs font-bold uppercase tracking-widest text-primary-dark mb-4 pb-4 border-b border-slate-100">
                Pago
              </h2>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-slate-500">Método:</span>
                <span className="text-sm font-medium text-primary-dark">
                  {order.paymentMethod}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Estado:</span>
                <span
                  className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${
                    order.isPaid
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-amber-50 text-amber-600"
                  }`}
                >
                  {order.isPaid ? "Pagado" : "Pendiente"}
                </span>
              </div>
            </section>

            <Link
              to="/collection"
              className="group flex items-center justify-center gap-2 w-full p-4 bg-primary-dark text-white text-xs font-bold uppercase tracking-[0.2em] transition-all hover:bg-accent ring-1 ring-primary-dark"
            >
              Seguir Comprando
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
