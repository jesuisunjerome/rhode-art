import { Link } from "react-router";

export default function HeroSection() {
  return (
    <header className="mb-20 relative">
      <div className="space-y-10 md:space-y-20 pl-5 md:pl-10 xl:pl-30">
        <div className="flex flex-col md:flex-row md:items-center md:py-5 gap-5 pr-5 md:pr-10 xl:pr-30">
          <div className="flex-1 md:w-2/3">
            <div className="max-w-lg">
              <h1 className="text-3xl sm:text-4xl font-semibold text-primary-dark">
                El arte lava del alma el polvo de la vida cotidiana
              </h1>
              <div className="mt-2 flex gap-2 items-center">
                <span className="h-0.5 w-5 bg-primary" />
                <span className="text-accent">Pablo Picasso</span>
              </div>
            </div>
          </div>
          <div className="hidden md:flex flex-1 gap-10">
            <div className="ms-auto">
              <h4 className="text-lg font-medium text-primary-dark">
                Pinturas acrílicas sobre tela
              </h4>
              <p className="text-sm text-slate-500">
                Ponte en contacto con nosotros
              </p>
            </div>
            <div className="flex flex-col gap-3 text-sm">
              <a
                href="mailto:rhodeexy@gmail.com"
                className="hover:underline text-slate-500 hover:text-accent"
              >
                Envíame un correo
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-slate-500 hover:text-accent"
              >
                Instagram
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-slate-500 hover:text-accent"
              >
                Twitter
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-slate-500 hover:text-accent"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row md:items-center gap-5 pr-5 md:pr-0">
          <div className="md:max-w-md lg:max-w-lg">
            <p className="flex items-center gap-2 mb-4 text-sm text-slate-400">
              <span className="h-0.5 w-5 bg-slate-200" />
              <span>Arte que nace del corazón</span>
            </p>
            <h4 className="text-lg font-semibold text-primary-dark">
              Paisajes vibrantes desde Haití
            </h4>
            <p className="mb-4">
              Descubre la obra de Ralph Pierre Rhode Exy, un artista haitiano
              que plasmó la belleza de los paisajes caribeños en acrílico sobre
              tela. Sus obras capturan la esencia de la naturaleza con una
              perspectiva única entre lo figurativo y lo abstracto.
            </p>
            <Link to="/collection" className="btn-primary group">
              Ver colección
            </Link>
          </div>
          <div className="flex-1">
            <div className="h-100 md:h-120">
              <img
                src="/images/4.png"
                alt="Artistic representation"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
