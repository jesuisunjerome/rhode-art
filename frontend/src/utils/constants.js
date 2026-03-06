// axios instance
import axios from "axios";
import {
  ApplePayIcon,
  MercadoPagoIcon,
  PayPalIcon,
  StripeIcon,
} from "../components/checkout/PaymentIcons";

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const API_ENDPOINTS = {
  PRODUCTS: "/products",
  CATEGORIES: "/categories",
  AUTH: "/auth",
  CART: "/cart",
  ORDERS: "/orders",
  WISHLIST: "/wishlist",
  REVIEWS: "/reviews",
  PAYMENTS: "/payments",
  USERS: "/users",
  ADMIN: "/admin",
  SEARCH: "/search",
  FILTER: "/filter",
  SORT: "/sort",
  PAGINATION: "/pagination",
};

export const PAYMENT_METHOD_NAMES = {
  MERCADOPAGO: "Mercado Pago",
  PAYPAL: "PayPal",
  STRIPE: "Stripe",
  APPLEPAY: "Apple Pay",
};

export const PAYMENT_METHODS = [
  {
    id: "mercadopago",
    name: PAYMENT_METHOD_NAMES.MERCADOPAGO,
    Icon: MercadoPagoIcon,
  },
  { id: "paypal", name: PAYMENT_METHOD_NAMES.PAYPAL, Icon: PayPalIcon },
  { id: "stripe", name: PAYMENT_METHOD_NAMES.STRIPE, Icon: StripeIcon },
  { id: "applepay", name: PAYMENT_METHOD_NAMES.APPLEPAY, Icon: ApplePayIcon },
];
