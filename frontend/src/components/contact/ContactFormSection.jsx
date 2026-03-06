import Form from "./Form";
import Map from "./Map";

export default function ContactFormSection() {
  return (
    <section className="pt-20 xl:pt-10 relative bg-slate-50">
      <div className="space-y-10 md:space-y-20 px-5 md:px-10 xl:px-30">
        <div className="flex flex-col-reverse lg:flex-row gap-30 lg:gap-10">
          <Map />
          <div className="-translate-y-60 lg:-translate-y-70">
            <div className="md:max-w-xl shadow-sm bg-white px-5 py-10 md:px-10 mx-auto">
              <Form />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
