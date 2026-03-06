import { CheckCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useCartStore } from "../../store/useCartStore";

export default function ArtWorkDetails({ artwork, isPending }) {
  const { addToCart, isProductInCart } = useCartStore();
  const [mainImage, setMainImage] = useState(null);
  useEffect(() => {
    if (!isPending) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMainImage(artwork?.images[0]);
    }
  }, [artwork, isPending]);

  const handleImageClick = (imageUrl) => setMainImage(imageUrl);

  if (isPending) return <ArtWorkDetailsSkeleton />;

  return (
    <>
      <div className="max-w-lg mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold uppercase text-primary-dark mb-4">
          {artwork.name}
        </h2>
        <h3 className="text-lg sm:text-xl text-slate-400">
          {artwork.shortDescription}
        </h3>
      </div>
      <div className="lg:max-w-6xl mx-auto flex flex-col md:flex-row md:gap-10">
        <div className="flex-1 md:w-[45%] space-y-4">
          <div
            role="img"
            className="w-full min-h-120"
            style={{
              background: `url('${mainImage}') center center / cover no-repeat`,
            }}
          ></div>
          <div className="flex gap-2 overflow-x-scroll scrollbar-hide">
            {artwork.images.map((image, index) => (
              <div key={index}>
                <button className="w-20">
                  <img
                    src={image}
                    alt={artwork.name}
                    className="w-full object-cover h-20"
                    onClick={() => handleImageClick(image)}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 space-y-10 py-5">
          <div className="space-y-2">
            {artwork.soldOut && (
              <h3 className="text-slate-400">
                <span className="line-through">
                  {artwork.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </span>{" "}
                (Vendido)
              </h3>
            )}
            <p>{artwork.description}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div className="border border-slate-200 p-2 space-y-2">
              <p className="text-slate-500 text-sm">Técnica</p>
              <p className="font-medium">{artwork.medium}</p>
            </div>
            <div className="border border-slate-200 p-2 space-y-2">
              <p className="text-slate-500 text-sm">Dimensiones</p>
              <p className="font-medium">{artwork.dimensions}</p>
            </div>
            <div className="border border-slate-200 p-2 space-y-2">
              <p className="text-slate-500 text-sm">Año</p>
              <p className="font-medium">{artwork.year}</p>
            </div>
            <div className="border border-slate-200 p-2 space-y-2">
              <p className="text-slate-500 text-sm">Tipo</p>
              <p className="font-medium">{artwork.type}</p>
            </div>
          </div>

          <div className="space-y-4">
            {!artwork.soldOut && (
              <>
                <div className="flex items-center gap-5">
                  <h3 className="text-xl font-medium text-accent">
                    {artwork.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </h3>
                  <div className="flex items-center gap-1 text-emerald-600 text-sm">
                    <CheckCircleIcon className="w-4 h-4" />
                    Disponible
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => addToCart(artwork)}
                    type="button"
                    title={
                      isProductInCart(artwork._id)
                        ? "Ya agregado al carrito"
                        : "Agregar al carrito"
                    }
                    disabled={isProductInCart(artwork._id)}
                    className="btn-primary-hover group"
                  >
                    Agregar al carrito
                  </button>
                  <Link
                    to="/checkout"
                    onClick={() =>
                      !isProductInCart(artwork._id) && addToCart(artwork)
                    }
                    className="btn-primary group"
                  >
                    Adquirir obra
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function ArtWorkDetailsSkeleton() {
  return (
    <>
      <div className="max-w-lg mx-auto space-y-4">
        <div className="w-64 h-4 mx-auto bg-slate-50 animate-pulse" />
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="w-full h-4 mx-auto bg-slate-50 animate-pulse"
            />
          ))}
        </div>
      </div>
      <div className="lg:max-w-6xl mx-auto flex flex-col md:flex-row md:gap-10">
        <div className="flex-1 md:w-[45%] space-y-4">
          <div className="w-full h-64 bg-slate-50 animate-pulse" />
          <div className="flex gap-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="w-20 h-20 bg-slate-50 animate-pulse"
              />
            ))}
          </div>
        </div>
        <div className="flex-1 space-y-10 py-5">
          <div className="space-y-2">
            <div className="w-64 h-5 bg-slate-50 animate-pulse" />
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="w-full h-5 bg-slate-50 animate-pulse"
              />
            ))}
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-slate-50 h-10" />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
