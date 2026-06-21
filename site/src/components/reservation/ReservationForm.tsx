"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  CreditCard,
  Lock,
  Mail,
  MessageSquare,
  Phone,
  User,
} from "lucide-react";

export type ReservationFormProps = {
  formuleSlug: "au-cabinet" | "a-distance";
  formuleLabel: string;
  durationLabel: string;
  priceEur: number;
  accentHex: string;
};

type Status = "idle" | "submitting" | "success" | "error";

// Liens de paiement par formule. Remplacer ces URL placeholder par les vrais
// liens Stripe Payment Link (ou PayPal) une fois créés dans le dashboard.
// Tant que la valeur reste "#", on garde le parcours interne (message de confirmation).
const PAYMENT_LINKS: Record<ReservationFormProps["formuleSlug"], string> = {
  "au-cabinet": "https://buy.stripe.com/bJefZjfKm6vy9jd46Ecwg01", // 120 € (1 heure, cabinet ou à distance)
  "a-distance": "https://buy.stripe.com/4gM3cx0Ps8DG3YT32Acwg00", // 85 € (30 minutes, téléphone)
};

export function ReservationForm({
  formuleSlug,
  formuleLabel,
  durationLabel,
  priceEur,
  accentHex,
}: ReservationFormProps) {
  const [status, setStatus] = useState<Status>("idle");

  const today = new Date();
  const minDate = today.toISOString().split("T")[0];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const paymentUrl = PAYMENT_LINKS[formuleSlug];

    // Si un vrai lien de paiement est configuré, on redirige dessus.
    // Sinon (placeholder "#"), on garde le message de confirmation interne.
    if (paymentUrl && paymentUrl !== "#") {
      window.location.href = paymentUrl;
      return;
    }

    setTimeout(() => setStatus("success"), 1100);
  };

  if (status === "success") {
    return (
      <div
        className="relative overflow-hidden rounded-3xl border p-8 md:p-12 text-center"
        style={{
          borderColor: `${accentHex}55`,
          background:
            "linear-gradient(135deg, rgba(247,243,236,1) 0%, rgba(245,241,232,0.95) 100%)",
        }}
      >
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
          style={{ backgroundColor: `${accentHex}18` }}
        >
          <Lock size={26} strokeWidth={1.5} style={{ color: accentHex }} />
        </div>
        <h3 className="font-serif text-3xl md:text-4xl text-encre mb-4 leading-tight">
          Votre demande est{" "}
          <span className="italic" style={{ color: accentHex }}>
            enregistrée.
          </span>
        </h3>
        <p className="font-sans text-encre/75 text-base leading-relaxed max-w-lg mx-auto mb-3">
          Vous allez recevoir un email de confirmation avec un lien de paiement
          sécurisé. Le rendez-vous ne sera définitivement réservé qu&apos;une
          fois le paiement de {priceEur}&nbsp;€ effectué.
        </p>
        <p className="font-serif italic text-encre/55 text-sm">
          (Module Stripe à activer ; actuellement, votre demande arrive
          directement à Jocelyn par email.)
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative overflow-hidden rounded-3xl border bg-ivoire p-7 md:p-10 shadow-[0_30px_80px_-25px_rgba(0,0,0,0.18)]"
      style={{ borderColor: `${accentHex}40` }}
    >
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-1"
        style={{
          background: `linear-gradient(90deg, transparent, ${accentHex}, transparent)`,
        }}
      />

      <div className="mb-8">
        <p
          className="font-sans text-[10.5px] tracking-[0.3em] uppercase mb-2"
          style={{ color: accentHex }}
        >
          Étape unique
        </p>
        <h3 className="font-serif text-2xl md:text-3xl text-encre leading-tight">
          Renseignez vos coordonnées
        </h3>
        <p className="font-sans text-encre/65 text-sm mt-2">
          Tous les champs sont nécessaires pour valider votre rendez-vous.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5 md:gap-6 mb-6">
        <Field icon={Calendar} label="Date souhaitée" htmlFor="date">
          <input
            id="date"
            name="date"
            type="date"
            required
            min={minDate}
            className="w-full bg-transparent border-0 focus:outline-none font-sans text-encre text-[15px] tabular-nums"
          />
        </Field>

        <Field icon={Clock} label="Plage horaire" htmlFor="time">
          <select
            id="time"
            name="time"
            required
            defaultValue=""
            className="w-full bg-transparent border-0 focus:outline-none font-sans text-encre text-[15px]"
          >
            <option value="" disabled>
              Sélectionnez…
            </option>
            <option value="morning">Matin (9h à 12h)</option>
            <option value="afternoon">Après-midi (14h à 17h)</option>
            <option value="evening">Fin de journée (17h à 19h)</option>
          </select>
        </Field>

        <Field icon={User} label="Prénom et nom" htmlFor="name">
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Jean Dupont"
            autoComplete="name"
            className="w-full bg-transparent border-0 focus:outline-none font-sans text-encre placeholder:text-encre/35 text-[15px]"
          />
        </Field>

        <Field icon={Phone} label="Téléphone" htmlFor="phone">
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="+262 6 92 …"
            autoComplete="tel"
            className="w-full bg-transparent border-0 focus:outline-none font-sans text-encre placeholder:text-encre/35 text-[15px]"
          />
        </Field>

        <Field
          icon={Mail}
          label="Email"
          htmlFor="email"
          className="md:col-span-2"
        >
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="vous@exemple.fr"
            autoComplete="email"
            className="w-full bg-transparent border-0 focus:outline-none font-sans text-encre placeholder:text-encre/35 text-[15px]"
          />
        </Field>

        <Field
          icon={MessageSquare}
          label="Quelque chose à préciser ? (optionnel)"
          htmlFor="message"
          className="md:col-span-2"
        >
          <textarea
            id="message"
            name="message"
            rows={3}
            placeholder="Contexte rapide, attente principale, contraintes d'horaire…"
            className="w-full bg-transparent border-0 focus:outline-none font-sans text-encre placeholder:text-encre/35 text-[15px] resize-none"
          />
        </Field>
      </div>

      {/* Récap formule */}
      <div
        className="flex items-center justify-between gap-4 py-4 px-5 rounded-2xl mb-6 border"
        style={{
          borderColor: `${accentHex}28`,
          backgroundColor: `${accentHex}08`,
        }}
      >
        <div>
          <p
            className="font-sans text-[9px] tracking-[0.3em] uppercase mb-0.5"
            style={{ color: accentHex }}
          >
            Formule sélectionnée
          </p>
          <p className="font-serif text-encre text-lg">
            {formuleLabel}{" "}
            <span className="font-sans text-encre/55 text-sm ml-1">
              ({durationLabel})
            </span>
          </p>
        </div>
        <div className="flex items-baseline gap-1">
          <span
            className="font-sans font-semibold text-3xl tabular-nums leading-none"
            style={{ color: accentHex }}
          >
            {priceEur}
          </span>
          <span className="font-sans text-base text-encre/65">€</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group relative flex items-center justify-center gap-3 w-full py-5 rounded-2xl text-ivoire font-sans overflow-hidden transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:translate-y-0"
        style={{
          background: `linear-gradient(135deg, ${accentHex} 0%, ${accentHex}D0 100%)`,
          boxShadow: `0 18px 44px -12px ${accentHex}, inset 0 1px 0 rgba(255,255,255,0.25)`,
        }}
      >
        {/* Reflet qui traverse au survol */}
        <span
          aria-hidden
          className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-20deg] bg-white/20 transition-transform duration-700 group-hover:translate-x-[420%]"
        />
        {status === "submitting" ? (
          <span className="text-sm tracking-[0.18em] uppercase font-semibold">Envoi en cours…</span>
        ) : (
          <>
            <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white/20 shrink-0">
              <Lock size={15} strokeWidth={2.2} />
            </span>
            <span className="relative flex flex-col items-start leading-tight">
              <span className="text-sm tracking-[0.16em] uppercase font-semibold">Procéder au paiement</span>
              <span className="text-[10px] tracking-[0.12em] text-ivoire/80 font-normal normal-case">Sécurisé · {priceEur}&nbsp;€</span>
            </span>
            <CreditCard size={17} strokeWidth={2} className="relative ml-1 transition-transform duration-300 group-hover:translate-x-1" />
          </>
        )}
      </button>

      <p className="font-sans text-center text-encre/50 text-[11px] tracking-wide mt-4 flex items-center justify-center gap-1.5">
        <Lock size={11} strokeWidth={2} />
        Paiement sécurisé. Annulation possible jusqu&apos;à 24h avant.
      </p>

      {/* Champ caché pour identifier la formule côté backend */}
      <input type="hidden" name="formule" value={formuleSlug} />
    </form>
  );
}

type FieldProps = {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  label: string;
  htmlFor: string;
  className?: string;
  children: React.ReactNode;
};

function Field({ icon: Icon, label, htmlFor, className = "", children }: FieldProps) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="flex items-center gap-1.5 font-sans text-[10.5px] tracking-[0.22em] uppercase text-encre/55 mb-2"
      >
        <Icon size={11} strokeWidth={2} className="text-encre/45" />
        {label}
      </label>
      <div className="border-b border-encre/15 pb-2.5 focus-within:border-encre/45 transition-colors">
        {children}
      </div>
    </div>
  );
}
