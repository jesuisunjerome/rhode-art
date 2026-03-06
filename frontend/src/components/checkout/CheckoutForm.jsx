import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { PAYMENT_METHODS } from "../../utils/constants";
import { checkoutData } from "../../utils/mockupData";
import { checkoutSchema } from "../../utils/schemas";
import PaymentButton from "./PaymentButton";

export default function CheckoutForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: checkoutData,
  });

  const disabled = Object.keys(errors).length > 0;
  const paymentMethod = watch("paymentMethod");

  const navigate = useNavigate();

  // Handles all non-Apple-Pay payment methods
  const onSubmit = async (data) => {
    return;
  };

  // Data shape expected by ApplePayButton
  const applePayFormData = {
    customer: {
      name: `${getValues("firstName")} ${getValues("lastName")}`.trim(),
      email: getValues("email"),
      phone: getValues("phone"),
    },
    shippingAddress: {
      address: getValues("address"),
      city: getValues("city"),
      postalCode: getValues("postalCode"),
      country: getValues("country"),
    },
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
      <div>
        <h2 className="text-lg font-semibold uppercase text-primary-dark mb-6">
          Detalles de Envío
        </h2>
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="space-y-1">
            <label htmlFor="firstName" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="Tu nombre"
              className="form-input"
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <label htmlFor="lastName" className="form-label">
              Apellido(s)
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Tu apellido"
              className="form-input"
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <label htmlFor="email" className="form-label">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              placeholder="correo@ejemplo.com"
              className="form-input"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <label htmlFor="phone" className="form-label">
              Télefono
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="Tu teléfono"
              className="form-input"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>
          <div className="space-y-1 sm:col-span-2">
            <label htmlFor="address" className="form-label">
              Dirección de Envío
            </label>
            <input
              type="text"
              id="address"
              placeholder="Calle, número"
              className="form-input"
              {...register("address")}
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <label htmlFor="city" className="form-label">
              Ciudad
            </label>
            <input
              type="text"
              id="city"
              placeholder="Ciudad"
              className="form-input"
              {...register("city")}
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <label htmlFor="state" className="form-label">
              Estado
            </label>
            <input
              type="text"
              id="state"
              placeholder="Estado"
              className="form-input"
              {...register("state")}
            />
            {errors.state && (
              <p className="text-red-500 text-sm">{errors.state.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <label htmlFor="country" className="form-label">
              País
            </label>
            <input
              type="text"
              id="country"
              placeholder="País"
              className="form-input"
              {...register("country")}
            />
            {/* <select
              id="country"
              className="form-input h-12.5"
              {...register("country")}
            >
              <option value="US">Estados Unidos</option>
              <option value="MX">México</option>
              <option value="AR">Argentina</option>
              <option value="BR">Brasil</option>
              <option value="CA">Canadá</option>
            </select> */}
            {errors.country && (
              <p className="text-red-500 text-sm">{errors.country.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <label htmlFor="postalCode" className="form-label">
              Código Postal
            </label>
            <input
              type="text"
              id="postalCode"
              placeholder="Código Postal"
              className="form-input"
              {...register("postalCode")}
            />
            {errors.postalCode && (
              <p className="text-red-500 text-sm">
                {errors.postalCode.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold uppercase text-primary-dark mb-6">
          Método de Pago
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {PAYMENT_METHODS.map(({ id, name, Icon }) => (
            <button
              key={id}
              onClick={() => {
                setValue("paymentMethod", name);
              }}
              className={`p-6 border transition-all flex flex-col items-center gap-3 hover:border-accent ${
                paymentMethod === name
                  ? "border-accent bg-accent/5 ring-1 ring-accent"
                  : "border-slate-200 bg-white shadow-sm hover:shadow-md"
              }`}
            >
              <div
                className={`w-10 h-10 ${
                  paymentMethod === name ? "text-accent" : "text-slate-400"
                }`}
              >
                <Icon />
              </div>
              <span
                className={`text-[10px] uppercase tracking-widest font-bold text-center ${
                  paymentMethod === name ? "text-accent" : "text-slate-500"
                }`}
              >
                {name}
              </span>
            </button>
          ))}
        </div>
        <p className="text-center text-slate-400 text-[10px] uppercase mt-4 tracking-widest">
          Al hacer clic, aceptas nuestros{" "}
          <Link to="/terms" className="underline">
            términos y condiciones
          </Link>{" "}
          y nuestra{" "}
          <Link to="/privacy" className="underline">
            política de privacidad
          </Link>
        </p>
      </div>

      <div className="pt-4 border-t border-slate-100">
        <PaymentButton
          paymentMethod={paymentMethod}
          formData={applePayFormData}
          disabled={disabled}
          onSuccess={(orderId) => navigate(`/order/${orderId}`)}
        />
      </div>
    </form>
  );
}
