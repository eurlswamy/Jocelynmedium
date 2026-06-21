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

export function Footer() {
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
              JOCELYN AMIR
              <span className="text-or-clair"> · </span>
              <span className="text-ivoire/70">MÉDIUM</span>
            </div>
            <p className="font-sans text-ivoire/65 text-sm leading-relaxed max-w-sm mb-6">
              Médium voyant à La Réunion. Clairvoyance, clairaudience, tirage
              de cartes et voyance sur photo. Au cabinet à Saint-Clotilde ou à
              distance.
            </p>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-serif text-or-clair text-xs tracking-[0.4em] uppercase mb-5">
              Me contacter
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3 items-start text-ivoire/80">
                <MapPin size={16} className="text-or-doux mt-1 shrink-0" />
                <span>
                  Saint-Clotilde
                  <br />
                  La Réunion (974)
                </span>
              </li>
              <li className="flex gap-3 items-center text-ivoire/80">
                <Phone size={16} className="text-or-doux shrink-0" />
                <a href="tel:+262692813606" className="hover:text-or-clair transition-colors">
                  +262 692 81 36 06
                </a>
              </li>
              <li className="flex gap-3 items-center text-ivoire/80">
                <Mail size={16} className="text-or-doux shrink-0" />
                <a
                  href="mailto:contact@jocelynamir.com"
                  className="hover:text-or-clair transition-colors"
                >
                  contact@jocelynamir.com
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-serif text-or-clair text-xs tracking-[0.4em] uppercase mb-5">
              On me retrouve
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3 items-center text-ivoire/80">
                <Tv size={16} className="text-or-doux shrink-0" />
                <span>Télé Kréol · mercredis 19h30</span>
              </li>
              <li className="flex gap-3 items-center text-ivoire/80">
                <Radio size={16} className="text-or-doux shrink-0" />
                <span>Kréol FM</span>
              </li>
              <li className="flex gap-3 items-center text-ivoire/80">
                <span className="text-or-doux shrink-0">
                  <FacebookIcon size={16} />
                </span>
                <a href="#" className="hover:text-or-clair transition-colors">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-ivoire/10 text-xs text-ivoire/40">
          <p>
            © {new Date().getFullYear()} Jocelyn Amir. Tous droits réservés.
          </p>
          <ul className="flex gap-6 items-center">
            <li><a href="#" className="hover:text-or-clair transition-colors">Mentions légales</a></li>
            <li><a href="#" className="hover:text-or-clair transition-colors">CGV</a></li>
            <li><a href="#" className="hover:text-or-clair transition-colors">Confidentialité</a></li>
          </ul>
        </div>

        <p className="text-center font-sans text-[13px] md:text-sm text-ivoire/70 mt-8">
          Créé par{" "}
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
