export default function Map() {
  return (
    <div className="flex-1 -translate-y-60 lg:translate-y-0">
      <div className="md:mx-auto lg:mx-0 md:max-w-xl mb-10 lg:hidden text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold uppercase text-primary-dark">
          Te invitamos a visitarnos
        </h2>
        <h3 className="text-lg sm:text-xl text-slate-400">
          Ubicado en la Ciudad de México, disponible para visitas con cita
          previa en mi taller.
        </h3>
      </div>
      <div className="bg-light p-1 rounded-md">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.444454950449!2d-99.14418402388394!3d19.43639514055793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f92b75aa014d%3A0x17d810d20da6e8cf!2sPalacio%20de%20Bellas%20Artes!5e0!3m2!1ses!2smx!4v1771540278817!5m2!1ses!2smx"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full rounded-md"
        ></iframe>
      </div>
    </div>
  );
}
