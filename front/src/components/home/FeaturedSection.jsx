import { useGetLatestProduct } from "../../hooks/products/queries";
import ArtWorkDetails from "../collection/ArtWorkDetails";

export default function FeaturedSection() {
  // get latest product
  const { latestProduct, isPending } = useGetLatestProduct();

  return (
    <section className="py-20 relative bg-light">
      <div className="space-y-10 md:space-y-20 px-5 md:px-10 xl:px-30">
        <ArtWorkDetails artwork={latestProduct} isPending={isPending} />
      </div>
    </section>
  );
}
