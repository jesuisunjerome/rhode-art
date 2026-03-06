import {
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  TwitterIcon,
} from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-20 relative bg-slate-50">
      <div className="space-y-10 md:space-y-20 px-5 md:px-10 xl:px-30">
        <div className="max-w-lg mx-auto text-center">
          <h3 className="text-lg sm:text-xl text-slate-400 mb-4">
            Conoce al artista
          </h3>
          <h2 className="text-2xl sm:text-3xl font-semibold uppercase text-primary-dark">
            Ralph Pierre Rhode Exy
          </h2>
        </div>
        <div className="flex flex-col-reverse md:flex-row gap-10">
          <div className="flex-1 space-y-6">
            <div className="space-y-6 border-b border-slate-100 pb-5">
              <p>
                Ralph Pierre Rhode Exy es un artista originario de Cavaillon,
                Haití, que radica en México desde hace más de 10 años. Aunque su
                profesión principal es el desarrollo web, la pintura representa
                para él un refugio creativo y una pasión que cultiva como hobby.
                A través del acrílico sobre tela, Ralph explora principalmente
                paisajes que reflejan la belleza natural del Caribe, aunque
                ocasionalmente se aventura en composiciones más abstractas.
              </p>
              <p>
                Sus obras, realizadas en formatos de 50x40 cm y 60x40 cm, han
                sido exhibidas en exposiciones locales. Su trabajo representa un
                testimonio auténtico de cómo el arte puede florecer desde la
                pasión genuina y el deseo de expresión personal.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-primary-dark">
                Conecta con el artista
              </h4>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex group items-center gap-2 border border-slate-200 px-4 py-2"
                >
                  <InstagramIcon className="w-5 h-5" />
                  <span className="group-hover:underline">@rhodeart</span>
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex group items-center gap-2 border border-slate-200 px-4 py-2"
                >
                  <FacebookIcon className="w-5 h-5" />
                  <span className="group-hover:underline">rhode96</span>
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex group items-center gap-2 border border-slate-200 px-4 py-2"
                >
                  <TwitterIcon className="w-5 h-5" />
                  <span className="group-hover:underline">@rhode_exy</span>
                </a>
                <a
                  href="mailto:rhodeexy@gmail.com"
                  className="flex group items-center gap-2 border border-slate-200 px-4 py-2"
                >
                  <MailIcon className="w-5 h-5" />
                  <span className="group-hover:underline">
                    rhodeexy@gmail.com
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="h-100 md:h-120">
              <img
                src="https://images.unsplash.com/photo-1606586740500-a98d83e65d1c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Artist portrait"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
