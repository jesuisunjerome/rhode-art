import { ShoppingCartIcon } from "lucide-react";
import { Link } from "react-router";
import { useCartStore } from "../../store/useCartStore";

export default function ArtCard({ artwork }) {
  const { addToCart, isProductInCart } = useCartStore();
  const isSoldOut = artwork.soldOut || artwork.countInStock === 0;

  return (
    <div className="flex-1">
      <div className="art-container bg-light">
        <Link to={`/collection/artwork/${artwork._id}`}>
          <img
            src={artwork.images[0]}
            alt={artwork.name}
            className={`object-cover h-110 sm:h-80 lg:h-90 w-full hover:-translate-y-1 transition-transform duration-500 ease-in-out pointer-events-none ${
              isSoldOut ? "grayscale-100" : ""
            }`}
          />
        </Link>
        <div className="flex items-start gap-1 mt-3 mb-0.5 justify-between">
          <div>
            <h4
              className={`text-sm font-medium ${artwork.soldOut ? "text-slate-400" : "text-primary-dark"}`}
            >
              {artwork.name}
            </h4>
            <p className="text-xs text-slate-400">
              {artwork.dimensions}, {artwork.medium}
            </p>
            {artwork.soldOut ? (
              <p className="text-sm text-slate-400 mt-1">
                <span className="line-through">
                  {artwork.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </span>{" "}
                (Vendido)
              </p>
            ) : (
              <p className="text-primary-dark mt-1">
                {artwork.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </p>
            )}
          </div>
          {!isSoldOut && (
            <button
              onClick={() => addToCart(artwork)}
              type="button"
              title={
                isProductInCart(artwork._id)
                  ? "Ya en el carrito"
                  : "Agregar al carrito"
              }
              className={`p-2 rounded-sm ${isProductInCart(artwork._id) ? "bg-accent text-light" : "bg-accent/15 text-accent hover:bg-slate-100"}`}
            >
              <ShoppingCartIcon className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function ArtCardSkeleton() {
  return (
    <div className="flex-1">
      <div className="art-container bg-light">
        <div className="w-full h-110 sm:h-80 lg:h-90 bg-slate-50 animate-pulse" />
        <div className="flex items-start gap-1 mt-3 mb-0.5 justify-between">
          <div className="space-y-1">
            <div className="w-64 h-4 bg-slate-50 animate-pulse" />
            <div className="w-64 h-4 bg-slate-50 animate-pulse" />
          </div>
          <div className="w-6 h-6 bg-slate-50 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
