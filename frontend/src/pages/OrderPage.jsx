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
import { formatCurrency } from "../utils/helper";

export default function OrderPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");
  const email = searchParams.get("email");
  const { order, isPending, error } = useGetOrderById(id, email);
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
      <div className="h-150 relative bg-slate-50/50 pt-24 pb-12 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-2 border-slate-200 border-t-primary-dark animate-spin"></div>
          <p className="mt-6 text-primary-dark font-medium tracking-[0.2em] uppercase text-[10px] animate-pulse">
            Procesando Información...
          </p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-slate-50/50 pt-32 pb-12 flex flex-col items-center">
        <div className="bg-white border border-slate-200 p-8 sm:p-12 text-center max-w-lg w-full mx-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-red-400"></div>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-50 text-red-500 mb-6">
            <XCircle className="w-10 h-10" />
          </div>
          <h1 className="text-3xl text-primary-dark mb-4">
            No Encontrado
          </h1>
          <p className="text-slate-500 mb-8 mx-auto leading-relaxed text-sm">
            No pudimos encontrar la información de tu pedido. Por favor, verifica
            el enlace o contacta a nuestro equipo de soporte.
          </p>
          <Link
            to="/"
            className="group flex items-center justify-center gap-2 w-full p-4 bg-primary-dark text-white text-xs font-bold uppercase tracking-[0.2em] transition-all hover:bg-accent ring-1 ring-primary-dark"
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    );
  }

  const isSuccess = order.isPaid || status === "success";

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Status Header */}
        <div className="relative overflow-hidden mb-20">
          <div className="absolute inset-0 bg-primary-dark"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-slate-700/40 via-transparent to-transparent"></div>

          <div className="relative p-12 sm:p-24 text-center flex flex-col items-center">
            {isSuccess ? (
              <>
                <div className="mb-8 relative group">
                  <div className="absolute inset-0 bg-emerald-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
                  <CheckCircle2 className="w-16 h-16 text-emerald-400" strokeWidth={1.5} />
                </div>
                <h1 className="text-4xl sm:text-6xl text-white mb-6 tracking-wide">
                  Tu arte está en camino
                </h1>
                <p className="text-slate-300 text-lg sm:text-xl mb-12 font-light max-w-xl leading-relaxed">
                  Hemos procesado tu pedido con éxito. Pronto podrás disfrutar de tu nueva pieza en casa.
                </p>
                <div className="inline-flex items-center gap-4 border border-slate-700 bg-slate-800/50 backdrop-blur-sm px-6 py-3">
                  <span className="text-slate-400 text-xs font-medium uppercase tracking-[0.3em]">
                    Orden
                  </span>
                  <span className="text-white text-sm tracking-wider font-mono">
                    #{order._id}
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="mb-8 relative group">
                  <div className="absolute inset-0 bg-amber-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
                  <Clock className="w-16 h-16 text-amber-400" strokeWidth={1.5} />
                </div>
                <h1 className="text-4xl sm:text-6xl text-white mb-6 tracking-wide">
                  Pago Pendiente
                </h1>
                <p className="text-slate-300 text-lg sm:text-xl mb-12 font-light max-w-xl leading-relaxed">
                  Estamos a la espera de la confirmación de tu pago para comenzar a preparar tu obra.
                </p>
                <div className="inline-flex items-center gap-4 border border-slate-700 bg-slate-800/50 backdrop-blur-sm px-6 py-3">
                  <span className="text-slate-400 text-xs font-medium uppercase tracking-[0.3em]">
                    Orden
                  </span>
                  <span className="text-white text-sm tracking-wider font-mono">
                    #{order._id}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Order Details - Takes up more space */}
          <div className="lg:col-span-7 space-y-12 bg-slate-50 relative">
            <div className="flex items-center gap-4">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary-dark">
                Tu Colección
              </h2>
              <div className="h-px bg-slate-200 flex-1"></div>
            </div>

            <div className="space-y-12">
              {order.orderItems.map((item) => (
                <div
                  key={item._id || item.product}
                  className="group flex gap-8 items-center"
                >
                  <div className="relative size-20 shrink-0 overflow-hidden bg-slate-100 shadow-md">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="text-primary-dark group-hover:text-accent transition-colors duration-500">
                      {item.name}
                    </h3>
                    <p className="text-slate-500 text-xs font-medium">
                      Cantidad: {item.qty}
                    </p>
                    <p className="text-primary-dark text-xs font-medium">
                      {formatCurrency(item.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals Section */}
            <div className="pt-10 border-t border-slate-200">
              <div className="space-y-2 max-w-sm ml-auto">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-light">Subtotal</span>
                  <span className="text-primary-dark font-medium">{formatCurrency(order.itemsPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-light">IVA</span>
                  <span className="text-primary-dark font-medium">{formatCurrency(order.iva)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-light">Envío</span>
                  <span className="text-primary-dark font-medium">{formatCurrency(order.shippingPrice)}</span>
                </div>
                <div className="flex justify-between items-end pt-3 mt-3 border-t border-slate-900">
                  <span className="text-primary-dark text-xs uppercase font-bold mb-1">Total</span>
                  <span className="text-primary-dark font-bold leading-none">{formatCurrency(order.totalPrice)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping & Payment Summary */}
          <div className="relative lg:col-span-5 space-y-8 lg:sticky lg:top-32">
            <div className="bg-white p-10 shadow-[0_20px_50px_rgb(0,0,0,0.05)] border border-slate-100">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-5 pb-4 border-b border-slate-100">
                Información de Envío
              </h2>
              <div className="text-slate-600 font-light">
                <p className="text-primary-dark">
                  {order.customer.name}
                </p>
                <p className="leading-relaxed">{order.shippingAddress.address}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                </p>
                <p className="text-primary-dark">{order.shippingAddress.country}</p>

                <div className="pt-5 mt-5 border-t border-slate-100">
                  <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] mb-2">Contacto</p>
                  <p>{order.customer.email}</p>
                  <p>{order.customer.phone}</p>
                </div>
              </div>
            </div>

            <div className="bg-primary-dark p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-5 pb-4 border-b border-slate-700">
                Detalles de Pago
              </h2>
              <div className="space-y-8">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-2">Método Utilizado</p>
                  <p className="tracking-wide">{order.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-2">Estado Actual</p>
                  <div className="inline-flex items-center gap-3 bg-slate-800/60 backdrop-blur-md py-3 px-5 border border-slate-600">
                    <div className={`w-2.5 h-2.5 ${order.isPaid ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)] animate-pulse' : 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]'}`}></div>
                    <span className={`text-xs font-medium tracking-wider uppercase ${order.isPaid ? 'text-emerald-300' : 'text-amber-300'}`}>
                      {order.isPaid ? "Pago Confirmado" : "Pendiente"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Link
              to="/collection"
              className="group relative flex items-center justify-center gap-4 w-full p-6 overflow-hidden bg-white border border-slate-200 mt-4"
            >
              <div className="absolute inset-0 bg-primary-dark translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
              <span className="relative text-primary-dark group-hover:text-white text-xs font-bold uppercase tracking-[0.2em] z-10 transition-colors duration-500">
                Seguir Explorando
              </span>
              <ChevronRight className="w-4 h-4 text-primary-dark group-hover:text-white relative z-10 transition-all duration-500 group-hover:translate-x-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
