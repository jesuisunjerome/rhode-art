import { Link } from "react-router";
import SEORender from "../common/SEORender";
import AboutSection from "../components/home/AboutSection";
import CollectionSection from "../components/home/CollectionSection";
import FeaturedSection from "../components/home/FeaturedSection";
import HeroSection from "../components/home/HeroSection";

export default function Homepage() {
  return (
    <>
      <SEORender
        title="Rhode Art :: Galería de Arte"
        description="Descubre la vibrante colección de obras de arte de Ralph Pierre Rhode Art, un artista haitiano que captura la esencia del Caribe a través de paisajes y abstracciones en acrílico sobre tela."
      />

      <HeroSection />

      <main>
        <CollectionSection />
        <FeaturedSection />
        <AboutSection />
        <section className="mb-10 py-50 relative">
          <div className="space-y-10 md:space-y-20 px-5 md:pr-10 md:pl-0 xl:pr-30 xl:pl-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="md:order-1">
                <div className="max-w-lg">
                  <h3 className="text-2xl sm:text-3xl font-semibold text-primary-dark">
                    El arte es la expresión más pura del alma humana
                  </h3>
                  <div className="mt-2 flex gap-2 items-center text-accent">
                    <span className="h-0.5 w-5 bg-primary" />
                    <span>Ralph Pierre Rhode Exy</span>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 md:order-0">
                <div className="lg:w-[80%] h-90">
                  <img
                    src="/images/5.png"
                    alt="Artistic representation"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div className="md:col-span-3 lg:col-start-2 lg:col-span-2 lg:-mt-40 flex flex-col md:flex-row gap-10 md:order-3">
                <div className="flex-1 md:w-[60%] h-90 ring-8 ring-white">
                  <img
                    src="https://images.unsplash.com/photo-1707259731001-230e11a23fcb?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1">
                  <div className="mb-2">
                    <img
                      src="/dark-logo.png"
                      alt="RhodeArt Logo"
                      className="h-20 inline-block"
                    />
                  </div>
                  <p className="mb-4">
                    El arte es un lenguaje universal que trasciende fronteras y
                    profesiones. A través del color y la forma, Ralph Pierre
                    Rhode Exy crea espacios donde convergen paisajes y
                    abstracciones, invitando al espectador a un viaje visual que
                    despierta emociones y estimula la imaginación.
                  </p>
                  <Link to="/collection" className="btn-primary group">
                    Ver toda la colección
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
