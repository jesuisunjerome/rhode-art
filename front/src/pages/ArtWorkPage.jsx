import { useParams } from "react-router";
import SEORender from "../common/SEORender";
import ArtWorkDetails from "../components/collection/ArtWorkDetails";
import { useGetProductById } from "../hooks/products/queries";

export default function ArtWorkPage() {
  // get product by id
  const { id } = useParams();
  const { product, isPending } = useGetProductById(id);

  return (
    <>
      <SEORender
        title={`Rhode Art :: ${product?.name}`}
        description={`Descubre "${product?.name}", ${product?.description}.`}
      />

      <main>
        <section className="pt-10 pb-20 relative bg-light">
          <div className="space-y-10 md:space-y-20 px-5 md:px-10 xl:px-30">
            <ArtWorkDetails artwork={product} isPending={isPending} />
          </div>
        </section>
      </main>
    </>
  );
}
