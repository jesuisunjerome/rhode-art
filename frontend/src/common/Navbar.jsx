import { MenuIcon, ShoppingCartIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { useCartStore } from "../store/useCartStore";
import NavMobile from "./NavMobile";
import ShoppingCart from "./ShoppingCart";

export default function Navbar() {
  const { cart } = useCartStore();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNavMobileOpen, setIsNavMobileOpen] = useState(false);

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const toggleNavMobile = () => setIsNavMobileOpen(!isNavMobileOpen);

  useEffect(() => {
    if (isCartOpen || isNavMobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isCartOpen, isNavMobileOpen]);

  return (
    <>
      <nav className="mb-10 border-b border-slate-100 py-2 sticky top-0 bg-light z-10">
        <div className="px-5 md:px-10 xl:px-30">
          <div className="flex gap-2 items-center justify-between">
            <button
              className="p-1 inline-flex sm:hidden items-center relative"
              onClick={toggleNavMobile}
            >
              <MenuIcon className="w-6 h-6" />
            </button>
            <Link to="/">
              <img
                src="/dark-logo.png"
                alt="RhodeArt Logo"
                className="h-15 inline-block"
              />
            </Link>
            <button
              className="p-1 inline-flex sm:hidden items-center relative"
              onClick={toggleCart}
            >
              <ShoppingCartIcon className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
            <ul className="items-center gap-6 hidden sm:flex">
              <li>
                <NavLink className="p-1 inline-block" to="/">
                  Inicio
                </NavLink>
              </li>
              <li>
                <NavLink className="p-1 inline-block" to="/collection">
                  Colección
                </NavLink>
              </li>
              <li>
                <NavLink className="p-1 inline-block" to="/contact">
                  Contacto
                </NavLink>
              </li>
              <li>
                <Link
                  className="p-1 inline-flex items-center relative"
                  title="Carrito de compras"
                  onClick={toggleCart}
                >
                  <ShoppingCartIcon className="w-5 h-5" />
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-accent text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <NavMobile isOpen={isNavMobileOpen} onClose={toggleNavMobile} />
      <ShoppingCart isOpen={isCartOpen} onClose={toggleCart} />
    </>
  );
}
