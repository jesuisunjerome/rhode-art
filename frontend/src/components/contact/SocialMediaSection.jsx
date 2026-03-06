import {
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  TwitterIcon,
} from "lucide-react";

export default function SocialMediaSection() {
  return (
    <section className="py-20 relative">
      <div className="space-y-10 md:space-y-20 px-5 md:px-10 xl:px-30">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold uppercase text-primary-dark mb-4">
            Sígueme en redes sociales
          </h2>
          <h3 className="text-lg sm:text-xl text-slate-400">
            Acompaña mi proceso creativo, descubre nuevas obras y mantente al
            día con mis próximas exposiciones y proyectos.
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <div>
            <a
              href=""
              target="_blank"
              className="btn-primary-hover flex-col py-10! w-full"
            >
              <InstagramIcon size={60} />
              <span className="lowercase">@rhodeart</span>
            </a>
          </div>
          <div>
            <a
              href=""
              target="_blank"
              className="btn-primary-hover flex-col py-10! w-full"
            >
              <FacebookIcon size={60} />
              <span className="lowercase">@rhodeart</span>
            </a>
          </div>
          <div>
            <a
              href=""
              target="_blank"
              className="btn-primary-hover flex-col py-10! w-full"
            >
              <TwitterIcon size={60} />
              <span className="lowercase">@rhodeart</span>
            </a>
          </div>
          <div>
            <a
              href=""
              target="_blank"
              className="btn-primary-hover flex-col py-10! w-full"
            >
              <MailIcon size={60} />
              <span className="lowercase">@rhodeart</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
