import { XIcon } from "lucide-react";
import { Link, NavLink } from "react-router";

export default function NavMobile({ isOpen, onClose }) {
  return (
    <aside
      className={`fixed top-0 right-0 w-full h-full z-50 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div
        onClick={onClose}
        className={`w-full absolute h-full bg-black/70 backdrop-blur-xs shadow-lg transition-transform duration-1000 ease-in-out ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      />
      <div
        className={`fixed top-2 left-1/2 -translate-x-1/2 w-[98%] mx-auto flex flex-col rounded-lg bg-light shadow-lg transition-transform duration-1000 ease-in-out ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <Link to="/" onClick={onClose}>
            <img
              src="/dark-logo.png"
              alt="RhodeArt Logo"
              className="h-17 inline-block"
            />
          </Link>
          <button
            className="text-slate-500 hover:text-slate-700"
            onClick={onClose}
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 pb-10">
          <ul className="flex flex-col gap-5 text-lg">
            <li className="text-center">
              <NavLink to="/" onClick={onClose} className="block py-2">
                Inicio
              </NavLink>
            </li>
            <li className="text-center">
              <NavLink
                to="/collection"
                onClick={onClose}
                className="block py-2"
              >
                Colección
              </NavLink>
            </li>
            <li className="text-center">
              <NavLink to="/contact" onClick={onClose} className="block py-2">
                Contacto
              </NavLink>
            </li>
            <li className="text-center">
              <NavLink to="/checkout" onClick={onClose} className="block py-2">
                Checkout
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
