import toast from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { IVA } from "../utils/mockupData";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product) => {
        const { cart } = get();
        const productExists = cart.find((item) => item._id === product._id);
        product.qty = 1;

        if (productExists) {
          get().removeFromCart(product);
          return;
        }

        set((state) => ({
          cart: [...state.cart, product],
        }));

        toast.success(`${product.name} agregado al carrito`, {
          iconTheme: {
            primary: "#fa7132",
            secondary: "#fff7ed",
          },
          style: {
            background: "#fff7ed",
            color: "#fa7132",
            boxShadow: "none",
            fontSize: "14px",
          },
        });
      },

      removeFromCart: (product) => {
        set((state) => ({
          cart: state.cart.filter((item) => item._id !== product._id),
        }));

        toast.success(`${product.name} eliminado del carrito`, {
          iconTheme: {
            primary: "#007a55",
            secondary: "#ecfdf5",
          },
          style: {
            fontSize: "14px",
          },
        });
      },

      getCartSubtotal: () => {
        const { cart } = get();
        const subtotal = cart.reduce((total, item) => total + item.price, 0);
        return subtotal;
      },

      getCartTotalWithIVA: () => {
        const { getCartSubtotal } = get();
        return getCartSubtotal() * (1 + IVA);
      },

      isProductInCart: (id) => {
        const { cart } = get();
        return cart.some((item) => item._id === id);
      },

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-rhodeart",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
