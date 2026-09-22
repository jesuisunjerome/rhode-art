// axios instance
import axios from "axios";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react";

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
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

export const IVA = 0.16;

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
    img: "/images/payments/mercadopago-icon.webp",
  },
  { id: "paypal", name: PAYMENT_METHOD_NAMES.PAYPAL, img: "/images/payments/paypal-icon.webp" },
  { id: "stripe", name: PAYMENT_METHOD_NAMES.STRIPE, img: "/images/payments/stripe-icon.webp" },
  { id: "applepay", name: PAYMENT_METHOD_NAMES.APPLEPAY, img: "/images/payments/applepay-icon.webp" },
];

export const SOCIAL_MEDIA = [
  {
    label: "Instagram",
    url: "#",
    icon: InstagramIcon,
    username: "@rhodeart"
  },
  {
    label: "Facebook",
    url: "#",
    icon: FacebookIcon,
    username: "@rhodeart"
  },
  {
    label: "Twitter",
    url: "#",
    icon: TwitterIcon,
    username: "@rhode_exy"
  },
];

export const COUNTRY_LIST = [
  { value: "MX", label: "México", supportsStripe: true },
  { value: "US", label: "Estados Unidos", supportsStripe: true },
  {
    value: "HT",
    label: "Haití",
    supportsStripe: false,
  },
  { value: "DO", label: "República Dominicana", supportsStripe: false },
  { value: "CA", label: "Canadá", supportsStripe: true },
  { value: "BR", label: "Brasil", supportsStripe: true },
  { value: "CL", label: "Chile", supportsStripe: true },
];