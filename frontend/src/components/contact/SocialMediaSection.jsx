import { MailIcon } from "lucide-react";
import { SOCIAL_MEDIA } from "../../utils/constants";

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
          {SOCIAL_MEDIA.map((social) => (
            <div key={social.name}>
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary-hover flex-col py-10! w-full"
              >
                <social.icon size={60} />
                <span className="lowercase">{social.username}</span>
              </a>
            </div>
          ))}
          <div>
            <a
              href="mailto:rhodeexy@gmail.com?subject=Información&body=Hola%20Rhode,%20quiero%20información%20sobre..."
              className="btn-primary-hover flex-col py-10! w-full"
            >
              <MailIcon size={60} />
              <span className="lowercase">rhodeexy@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
