import { useGetProducts } from "../../hooks/products/queries";
import ArtCard, { ArtCardSkeleton } from "./ArtCard";

export default function ProductsSection() {
  // get all products
  const { products, isPending } = useGetProducts();

  return (
    <section className="my-10 py-10 relative">
      <div className="space-y-10 px-5 md:px-10 xl:px-30">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6 gap-y-10 xl:gap-10 xl:gap-y-20">
          {isPending
            ? Array.from({ length: 6 }).map((_, index) => (
                <ArtCardSkeleton key={index} />
              ))
            : products.map((artwork) => (
                <ArtCard key={artwork._id} artwork={artwork} />
              ))}
        </div>
      </div>
    </section>
  );
}
