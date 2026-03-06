import SEORender from "../common/SEORender";
import HeroSection from "../components/collection/HeroSection";
import ProductsSection from "../components/collection/ProductsSection";

export default function CollectionPage() {
  return (
    <>
      <SEORender
        title="Rhode Art :: Art Gallery"
        description="Explora nuestra colección de obras de arte originales y prints de alta calidad."
      />

      <HeroSection />
      <main>
        <ProductsSection />
      </main>
    </>
  );
}
