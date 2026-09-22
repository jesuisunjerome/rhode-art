export default function Hero() {
  return (
    <header className="mb-20 relative">
      <div className="space-y-10 md:space-y-20 pl-5 md:pl-10 xl:pl-30 bg-white">
        <div className="flex flex-col md:flex-row md:py-5 gap-5 pr-5 md:pr-10 xl:pr-30">
          <div className="flex-1">
            <div className="max-w-xl space-y-5">
              <div className="border-b border-slate-200 pb-7">
                <p className="flex items-center gap-2 mb-4 text-sm text-slate-400">
                  <span className="h-0.5 w-5 bg-slate-200" />
                  <span>Conecta con Rhode Art</span>
                </p>
                <h2 className="text-2xl sm:text-3xl font-semibold uppercase text-primary-dark">
                  Iniciemos una conversación
                </h2>
                <p className="text-primary-dark mt-5">
                  Ya sea que estés interesado en adquirir una pieza, solicitar
                  una obra personalizada o simplemente quieras compartir tus
                  impresiones sobre mis creaciones, me encantaría saber de ti.
                  Tus mensajes inspiran y guían mi camino artístico.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <h4 className="text-primary-dark font-semibold">
                    Correo Electrónico
                  </h4>
                  <a
                    href="mailto:rhodeexy@gmail.com"
                    className="text-sm block hover:underline text-accent"
                  >
                    rhodeexy@gmail.com
                  </a>
                  <p className="text-xs text-slate-400 leading-5 block">
                    Para consultas generales, ventas y colaboraciones
                    artísticas.
                  </p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-primary-dark font-semibold">Teléfono</h4>
                  <a
                    href="tel:+7532137159"
                    className="text-sm block hover:underline text-accent"
                  >
                    (+52) 753 213-7159
                  </a>
                  <p className="text-xs text-slate-400 leading-5 block">
                    Disponible para llamadas y WhatsApp en horario comercial.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-3 gap-4 items-end">
              <div className="col-span-2">
                <img
                  src="/images/products/1.webp"
                  alt="Artistic representation"
                  className="object-cover w-full h-40 bg-gray-50"
                />
              </div>
              <div>
                <img
                  src="/images/products/2.webp"
                  alt="Artistic representation"
                  className="object-cover w-full h-60 bg-gray-50"
                />
              </div>
              <div>
                <img
                  src="/images/products/3.webp"
                  alt="Artistic representation"
                  className="object-cover w-full h-50 bg-gray-50"
                />
              </div>
              <div className="col-span-2 self-start">
                <img
                  src="/images/products/6.webp"
                  alt="Artistic representation"
                  className="object-cover w-full h-40 bg-gray-50"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
