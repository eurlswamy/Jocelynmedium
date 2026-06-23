"use client";

import Image from "next/image";
import { MapPin, Phone, Mail, Tv, Radio } from "lucide-react";

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

// Contenu editable injecte depuis Sanity (singleton "pageGlobale", groupe
// Pied de page). Tous les champs sont optionnels : repli sur les textes
// d'origine en dur ci-dessous.
export type FooterContent = {
  titre?: string;
  description?: string;
  contactTitre?: string;
  ville?: string;
  region?: string;
  telephone?: string;
  email?: string;
  retrouveTitre?: string;
  tv?: string;
  radio?: string;
  social?: string;
  copyright?: string;
  credit?: string;
};

function val(value: string | undefined, fallback: string): string {
  return value && value.trim().length > 0 ? value : fallback;
}

export function Footer({ content }: { content?: FooterContent } = {}) {
  const annee = new Date().getFullYear();
  const copyright = val(content?.copyright, "{annee} Jocelyn Amir. Tous droits réservés.").replace(
    "{annee}",
    String(annee)
  );
  // Le credit du createur conserve le lien vers Fondationstudio.fr : seul le
  // texte avant le lien est editable, le mot "Fondationstudio.fr" reste cliquable.
  return (
    // pb large sur mobile : le CTA flottant « Réserver » ne recouvre plus le crédit
    <footer className="relative text-ivoire pt-20 pb-28 md:pb-10 overflow-hidden">
      {/* ═══ Background : paysage La Réunion ═══ */}
      <div className="absolute inset-0 z-0 bg-encre">
        <Image
          src="/images/paysage-reunion.webp"
          alt=""
          fill
          className="object-cover object-center opacity-40"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(28,28,28,0.95) 0%, rgba(28,28,28,0.85) 30%, rgba(28,28,28,0.9) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">

        {/* Grille principale */}
        <div className="grid md:grid-cols-12 gap-12 mb-16">

          <div className="md:col-span-5">
            <div className="font-serif text-xl tracking-[0.3em] mb-3">
              {val(content?.titre, "JOCELYN AMIR")}
              <span className="text-or-clair"> · </span>
              <span className="text-ivoire/70">MÉDIUM</span>
            </div>
            <p className="font-sans text-ivoire/65 text-sm leading-relaxed max-w-sm mb-6">
              {val(content?.description, "Médium voyant à La Réunion. Clairvoyance, clairaudience, tirage de cartes et voyance sur photo. Au cabinet à Saint-Clotilde ou à distance.")}
            </p>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-serif text-or-clair text-xs tracking-[0.4em] uppercase mb-5">
              {val(content?.contactTitre, "Me contacter")}
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3 items-start text-ivoire/80">
                <MapPin size={16} className="text-or-doux mt-1 shrink-0" />
                <span>
                  {val(content?.ville, "Saint-Clotilde")}
                  <br />
                  {val(content?.region, "La Réunion (974)")}
                </span>
              </li>
              <li className="flex gap-3 items-center text-ivoire/80">
                <Phone size={16} className="text-or-doux shrink-0" />
                <a
                  href={`tel:${val(content?.telephone, "+262 692 81 36 06").replace(/\s+/g, "")}`}
                  className="hover:text-or-clair transition-colors"
                >
                  {val(content?.telephone, "+262 692 81 36 06")}
                </a>
              </li>
              <li className="flex gap-3 items-center text-ivoire/80">
                <Mail size={16} className="text-or-doux shrink-0" />
                <a
                  href={`mailto:${val(content?.email, "contact@jocelynamir.com")}`}
                  className="hover:text-or-clair transition-colors"
                >
                  {val(content?.email, "contact@jocelynamir.com")}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-serif text-or-clair text-xs tracking-[0.4em] uppercase mb-5">
              {val(content?.retrouveTitre, "On me retrouve")}
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3 items-center text-ivoire/80">
                <Tv size={16} className="text-or-doux shrink-0" />
                <span>{val(content?.tv, "Télé Kréol · mercredis 19h30")}</span>
              </li>
              <li className="flex gap-3 items-center text-ivoire/80">
                <Radio size={16} className="text-or-doux shrink-0" />
                <span>{val(content?.radio, "Kréol FM")}</span>
              </li>
              <li className="flex gap-3 items-center text-ivoire/80">
                <span className="text-or-doux shrink-0">
                  <FacebookIcon size={16} />
                </span>
                <a href="#" className="hover:text-or-clair transition-colors">
                  {val(content?.social, "Facebook")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-ivoire/10 text-xs text-ivoire/40">
          <p>© {copyright}</p>
          <ul className="flex gap-6 items-center">
            <li><a href="/mentions-legales" className="hover:text-or-clair transition-colors">Mentions légales</a></li>
            <li><a href="/cgv" className="hover:text-or-clair transition-colors">CGV</a></li>
            <li><a href="/confidentialite" className="hover:text-or-clair transition-colors">Confidentialité</a></li>
          </ul>
        </div>

        <p className="text-center font-sans text-[13px] md:text-sm text-ivoire/70 mt-8">
          {val(content?.credit, "Créé par Fondationstudio.fr").replace(/Fondationstudio\.fr/i, "").trim()}{" "}
          <a
            href="https://fondationstudio.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-or-clair font-medium underline underline-offset-4 decoration-or-clair/40 hover:text-or-doux transition-colors"
          >
            Fondationstudio.fr
          </a>
        </p>
      </div>
    </footer>
  );
}
