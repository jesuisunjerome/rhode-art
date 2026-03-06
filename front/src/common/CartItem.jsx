import { useCartStore } from "../store/useCartStore";

export default function CartItem({
  item,
  showRemoveButton = false,
  showSmallDescription = false,
}) {
  const { removeFromCart } = useCartStore();

  return (
    <div key={item._id} className="flex gap-3">
      <div className="w-25 h-26">
        <img
          src={item.images[0]}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <div>
          <h4 className="text-sm text-slate-600">{item.name}</h4>
          {showSmallDescription && (
            <p className="text-slate-400 text-sm line-clamp-2 mb-2">
              {item.shortDescription}
            </p>
          )}
          <p className="text-sm text-primary-dark">
            {item.price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
        </div>
        {showRemoveButton && (
          <div className="mt-auto">
            <button
              className="text-slate-500 hover:text-accent text-sm py-1 border-b border-slate-300 hover:border-accent transition-colors"
              onClick={() => removeFromCart(item)}
            >
              Eliminar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
