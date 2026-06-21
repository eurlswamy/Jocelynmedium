"use client";

import { CreditCard, Lock, Mail } from "lucide-react";

// Liens de paiement Stripe par formule. Stripe collecte lui-même les
// coordonnées du client : pas besoin de formulaire en amont.
const PAYMENT_LINKS: Record<"au-cabinet" | "a-distance", string> = {
  "au-cabinet": "https://buy.stripe.com/bJefZjfKm6vy9jd46Ecwg01", // 120 € (1 heure, cabinet ou à distance)
  "a-distance": "https://buy.stripe.com/4gM3cx0Ps8DG3YT32Acwg00", // 85 € (30 minutes, téléphone)
};

// Adresse qui reçoit les demandes de lien de paiement par mail (Celsus).
// Le client envoie ensuite, via Celsus, un lien de paiement directement
// sur l'adresse mail du visiteur. POUR ACTIVER : remplacer cette adresse
// par celle reliée au compte Celsus, ou un lien Celsus dédié si disponible.
const CELSUS_EMAIL = "contact@jocelynamir.com";

type Props = {
  formuleSlug: "au-cabinet" | "a-distance";
  priceEur: number;
  accentHex: string;
};

export function PaymentButton({ formuleSlug, priceEur, accentHex }: Props) {
  const href = PAYMENT_LINKS[formuleSlug];
  const isLive = href !== "#";

  // Demande de lien de paiement par mail via Celsus : on pré-remplit un mail
  // pour que le visiteur reçoive ensuite son lien directement sur sa boîte.
  const formuleLabel =
    formuleSlug === "au-cabinet"
      ? "Une heure (cabinet ou à distance)"
      : "30 minutes (par téléphone)";
  const celsusHref =
    "mailto:" +
    CELSUS_EMAIL +
    "?subject=" +
    encodeURIComponent(`Lien de paiement par mail · ${formuleLabel}`) +
    "&body=" +
    encodeURIComponent(
      `Bonjour,\n\nJe souhaite recevoir un lien de paiement par mail pour la formule : ${formuleLabel} (${priceEur} €).\n\nMon nom :\nMon adresse mail :\n\nMerci.`
    );

  return (
    <div>
      <a
        href={isLive ? href : undefined}
        role="button"
        aria-disabled={!isLive}
        onClick={(e) => {
          if (!isLive) e.preventDefault();
        }}
        className="group relative flex items-center justify-center gap-3 w-full py-5 rounded-2xl text-ivoire overflow-hidden transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
        style={{
          background: `linear-gradient(135deg, ${accentHex} 0%, ${accentHex}D0 100%)`,
          boxShadow: `0 18px 44px -12px ${accentHex}, inset 0 1px 0 rgba(255,255,255,0.25)`,
        }}
      >
        {/* Reflet qui traverse au survol */}
        <span aria-hidden className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-20deg] bg-white/20 transition-transform duration-700 group-hover:translate-x-[420%]" />
        <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white/20 shrink-0">
          <Lock size={15} strokeWidth={2.2} />
        </span>
        <span className="relative flex flex-col items-start leading-tight">
          <span className="text-sm tracking-[0.16em] uppercase font-semibold">Procéder au paiement</span>
          <span className="text-[10px] tracking-[0.12em] text-ivoire/80 font-normal normal-case">Sécurisé · {priceEur}&nbsp;€</span>
        </span>
        <CreditCard size={17} strokeWidth={2} className="relative ml-1 transition-transform duration-300 group-hover:translate-x-1" />
      </a>

      {/* Option secondaire, volontairement plus discrète : recevoir le lien
          de paiement par mail (via Celsus) au lieu de payer sur le site. */}
      <div className="flex items-center gap-3 my-4">
        <span className="h-px flex-1 bg-encre/10" />
        <span className="font-sans text-encre/40 text-[10px] tracking-[0.25em] uppercase">ou</span>
        <span className="h-px flex-1 bg-encre/10" />
      </div>

      <a
        href={celsusHref}
        className="group/celsus flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-encre/12 bg-transparent text-encre/70 hover:text-encre hover:border-encre/25 transition-colors"
      >
        <Mail size={14} strokeWidth={1.8} className="shrink-0" />
        <span className="font-sans text-[12.5px] tracking-wide">
          Recevoir le lien de paiement par mail
        </span>
      </a>
      <p className="font-sans text-center text-encre/45 text-[11px] leading-relaxed mt-2 px-2">
        Vous préférez ne pas payer sur le site&nbsp;? Recevez votre lien de
        paiement directement par mail (service Celsus) et réglez quand vous le
        souhaitez.
      </p>

      <p className="font-sans text-center text-encre/50 text-[11px] tracking-wide mt-4 flex items-center justify-center gap-1.5">
        <Lock size={11} strokeWidth={2} />
        Paiement sécurisé. Annulation possible jusqu&apos;à 24h avant.
      </p>

      <p className="font-sans text-center text-encre/55 text-[12px] leading-relaxed mt-3 px-2">
        Une fois le paiement effectué, vous êtes recontacté sous 24h pour
        confirmer votre rendez-vous et convenir du créneau.
      </p>

      {!isLive && (
        <p className="font-serif italic text-center text-encre/45 text-[12px] mt-2">
          (Lien de paiement à activer)
        </p>
      )}
    </div>
  );
}
