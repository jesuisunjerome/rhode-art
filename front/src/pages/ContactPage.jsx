import SEORender from "../common/SEORender";
import ContactFormSection from "../components/contact/ContactFormSection";
import HeroSection from "../components/contact/HeroSection";
import SocialMediaSection from "../components/contact/SocialMediaSection";

export default function ContactPage() {
  return (
    <>
      <SEORender
        title="Rhode Art :: Contacto"
        description="Ponte en contacto con Rhode Art para consultas sobre obras de arte, colaboraciones o cualquier otra pregunta."
      />

      <HeroSection />

      <main>
        <section className="py-20 relative bg-amber-900">
          <div className="space-y-10 md:space-y-20 px-5 md:px-10 xl:px-30">
            <div className="max-w-lg py-10 mx-auto text-center lg:mx-0 lg:text-left">
              <h2 className="text-2xl sm:text-3xl font-semibold uppercase text-light mb-20 lg:mb-0">
                Comparte tu mensaje y te responderé lo antes posible.
              </h2>
            </div>
          </div>
        </section>
        <ContactFormSection />
        <SocialMediaSection />
      </main>
    </>
  );
}
