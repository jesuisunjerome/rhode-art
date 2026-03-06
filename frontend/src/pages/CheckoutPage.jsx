import { MoveLeftIcon } from "lucide-react";
import { Link } from "react-router";
import SEORender from "../common/SEORender";
import CheckoutForm from "../components/checkout/CheckoutForm";
import CheckoutSummary from "../components/checkout/CheckoutSummary";
import StripeProvider from "../providers/StripeProvider";

export default function CheckoutPage() {
  return (
    <>
      <SEORender
        title="Checkout - RhodeArt"
        description="Completa la información a continuación para finalizar tu compra."
        keywords={["checkout", "rhodeart", "compra"]}
      />

      <main>
        <section className="pb-20 relative">
          <div className="space-y-10 md:space-y-20 px-5 md:px-10 xl:px-30">
            <div>
              <div className="flex items-center gap-2 mb-7">
                <Link
                  to="/collection"
                  className="flex items-center gap-2 text-slate-400 hover:text-slate-700"
                >
                  <MoveLeftIcon className="w-5 h-5" />
                  <span>Volver a la colección</span>
                </Link>
              </div>
              <h2 className="text-2xl font-semibold uppercase text-primary-dark">
                Checkout
              </h2>
              <p className="text-slate-400">
                Completa la información a continuación para finalizar tu compra.
              </p>
            </div>
            <div className="flex flex-col-reverse lg:flex-row gap-10">
              <div className="flex-1 bg-white">
                {/* StripeProvider must wrap CheckoutForm so useStripe() hooks work */}
                <StripeProvider>
                  <CheckoutForm />
                </StripeProvider>
              </div>
              <div className="lg:w-1/3">
                <CheckoutSummary />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
