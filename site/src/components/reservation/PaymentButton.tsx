"use client";

import { useState } from "react";
import { CreditCard, Lock, Mail, X, Loader2, CheckCircle2, User } from "lucide-react";

// Liens de paiement Stripe par formule. Stripe collecte lui-même les
// coordonnées du client : pas besoin de formulaire en amont.
const PAYMENT_LINKS: Record<"au-cabinet" | "a-distance", string> = {
  "au-cabinet": "https://buy.stripe.com/bJefZjfKm6vy9jd46Ecwg01", // 120 € (1 heure, cabinet ou à distance)
  "a-distance": "https://buy.stripe.com/4gM3cx0Ps8DG3YT32Acwg00", // 85 € (30 minutes, téléphone)
};

// Demande de lien de paiement par mail via Web3Forms : le visiteur remplit
// un court formulaire, Jocelyn reçoit la demande dans sa boîte mail et lui
// renvoie le lien de paiement. La clé est publique (cf. web3forms.com) et
// jamais écrite en dur : on lit NEXT_PUBLIC_WEB3FORMS_KEY (.env.local + Vercel).
// Tant que la clé n'est pas définie, le formulaire affiche un repli mailto.
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";
const FALLBACK_EMAIL = "contact@jocelynamir.com";

type Status = "idle" | "sending" | "success" | "error";

type Props = {
  formuleSlug: "au-cabinet" | "a-distance";
  priceEur: number;
  accentHex: string;
};

export function PaymentButton({ formuleSlug, priceEur, accentHex }: Props) {
  const href = PAYMENT_LINKS[formuleSlug];
  const isLive = href !== "#";

  const formuleLabel =
    formuleSlug === "au-cabinet"
      ? "Une heure (cabinet ou à distance)"
      : "30 minutes (par téléphone)";

  const isConfigured = WEB3FORMS_KEY.length > 0;

  // État de la modale de demande de lien de paiement par mail.
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function closeModal() {
    setModalOpen(false);
    // Petit délai pour ne pas voir l'état changer pendant la fermeture.
    setTimeout(() => {
      setStatus("idle");
      setErrorMsg("");
    }, 200);
  }

  // Repli si la clé n'est pas configurée : on garde un mailto pré-rempli pour
  // ne jamais laisser le visiteur sans solution.
  const fallbackMailto =
    "mailto:" +
    FALLBACK_EMAIL +
    "?subject=" +
    encodeURIComponent(`Lien de paiement par mail : ${formuleLabel}`) +
    "&body=" +
    encodeURIComponent(
      `Bonjour,\n\nJe souhaite recevoir un lien de paiement par mail pour la formule : ${formuleLabel} (${priceEur} euros).\n\nMon nom :\nMon adresse mail :\n\nMerci.`
    );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isConfigured || status === "sending") return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", WEB3FORMS_KEY);
    formData.append(
      "subject",
      `Demande de lien de paiement : ${formuleLabel} (${priceEur} euros)`
    );
    formData.append("from_name", "Site Jocelyn Amir");
    formData.append("formule", formuleLabel);
    formData.append("prix", `${priceEur} euros`);

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMsg(
          data.message ||
            "L'envoi a échoué. Réessayez ou écrivez directement par mail."
        );
      }
    } catch {
      setStatus("error");
      setErrorMsg(
        "Connexion impossible. Vérifiez votre réseau ou écrivez directement par mail."
      );
    }
  }

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
          de paiement par mail (formulaire Web3Forms) au lieu de payer sur le site. */}
      <div className="flex items-center gap-3 my-4">
        <span className="h-px flex-1 bg-encre/10" />
        <span className="font-sans text-encre/40 text-[10px] tracking-[0.25em] uppercase">ou</span>
        <span className="h-px flex-1 bg-encre/10" />
      </div>

      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className="group/mail flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-encre/12 bg-transparent text-encre/70 hover:text-encre hover:border-encre/25 transition-colors"
      >
        <Mail size={14} strokeWidth={1.8} className="shrink-0" />
        <span className="font-sans text-[12.5px] tracking-wide">
          Recevoir le lien de paiement par mail
        </span>
      </button>
      <p className="font-sans text-center text-encre/45 text-[11px] leading-relaxed mt-2 px-2">
        Vous préférez ne pas payer sur le site&nbsp;? Recevez votre lien de
        paiement directement par mail et réglez quand vous le souhaitez.
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

      {/* Modale : demande de lien de paiement par mail (Web3Forms) */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Recevoir le lien de paiement par mail"
        >
          {/* Voile */}
          <button
            type="button"
            aria-label="Fermer"
            onClick={closeModal}
            className="absolute inset-0 bg-encre/50 backdrop-blur-sm"
          />

          <div className="relative w-full max-w-md bg-ivoire rounded-2xl shadow-2xl border border-encre/10 max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={closeModal}
              aria-label="Fermer"
              className="absolute right-4 top-4 flex items-center justify-center w-9 h-9 rounded-full text-encre/50 hover:text-encre hover:bg-encre/5 transition-colors"
            >
              <X size={18} strokeWidth={1.8} />
            </button>

            {status === "success" ? (
              <div className="flex flex-col items-center text-center gap-4 p-8">
                <span className="flex items-center justify-center w-14 h-14 rounded-full bg-bleu-majorelle/12 text-bleu-majorelle">
                  <CheckCircle2 size={28} strokeWidth={1.6} />
                </span>
                <h3 className="font-serif text-2xl text-encre">Demande envoyée.</h3>
                <p className="font-sans text-encre/60 text-sm leading-relaxed max-w-sm">
                  Merci. Jocelyn vous envoie votre lien de paiement par mail dans
                  les meilleurs délais.
                </p>
                <button
                  type="button"
                  onClick={closeModal}
                  className="mt-1 font-sans text-[11px] tracking-[0.2em] uppercase text-bleu-majorelle hover:underline"
                >
                  Fermer
                </button>
              </div>
            ) : (
              <div className="p-7 sm:p-8">
                <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-encre/45 mb-1.5">
                  {formuleLabel} · {priceEur}&nbsp;€
                </p>
                <h3 className="font-serif text-2xl text-encre mb-1.5">
                  Recevez votre lien de paiement
                </h3>
                <p className="font-sans text-encre/55 text-[13px] leading-relaxed mb-6">
                  Laissez vos coordonnées : Jocelyn vous envoie le lien de
                  paiement par mail. Vous réglez quand vous le souhaitez.
                </p>

                {isConfigured ? (
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Anti-spam : honeypot Web3Forms */}
                    <input
                      type="checkbox"
                      name="botcheck"
                      className="hidden"
                      style={{ display: "none" }}
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    <div>
                      <label
                        htmlFor="pay-nom"
                        className="block font-sans text-[11px] tracking-[0.3em] uppercase text-encre/55 mb-2"
                      >
                        Votre nom
                      </label>
                      <div className="relative">
                        <User
                          size={15}
                          strokeWidth={1.5}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-encre/30"
                        />
                        <input
                          id="pay-nom"
                          name="nom"
                          type="text"
                          required
                          placeholder="Prénom Nom"
                          className="w-full pl-11 pr-4 py-3.5 bg-white border border-encre/12 rounded-xl font-sans text-encre placeholder:text-encre/30 focus:outline-none focus:border-bleu-majorelle/50 focus:ring-1 focus:ring-bleu-majorelle/30 transition-all text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="pay-email"
                        className="block font-sans text-[11px] tracking-[0.3em] uppercase text-encre/55 mb-2"
                      >
                        Votre email
                      </label>
                      <div className="relative">
                        <Mail
                          size={15}
                          strokeWidth={1.5}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-encre/30"
                        />
                        <input
                          id="pay-email"
                          name="email"
                          type="email"
                          required
                          placeholder="vous@exemple.com"
                          className="w-full pl-11 pr-4 py-3.5 bg-white border border-encre/12 rounded-xl font-sans text-encre placeholder:text-encre/30 focus:outline-none focus:border-bleu-majorelle/50 focus:ring-1 focus:ring-bleu-majorelle/30 transition-all text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="pay-tel"
                        className="block font-sans text-[11px] tracking-[0.3em] uppercase text-encre/55 mb-2"
                      >
                        Votre téléphone (facultatif)
                      </label>
                      <input
                        id="pay-tel"
                        name="telephone"
                        type="tel"
                        placeholder="06 00 00 00 00"
                        className="w-full px-4 py-3.5 bg-white border border-encre/12 rounded-xl font-sans text-encre placeholder:text-encre/30 focus:outline-none focus:border-bleu-majorelle/50 focus:ring-1 focus:ring-bleu-majorelle/30 transition-all text-sm"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full py-4 rounded-xl font-sans text-sm tracking-[0.2em] uppercase font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{ background: accentHex, color: "#FAF6EE" }}
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Envoi en cours…
                        </>
                      ) : (
                        "Envoyer ma demande"
                      )}
                    </button>

                    {status === "error" && (
                      <p className="font-sans text-terre-cuite text-xs text-center leading-relaxed">
                        {errorMsg}
                      </p>
                    )}

                    <p className="font-sans text-encre/40 text-[11px] text-center leading-relaxed">
                      Aucun paiement sur cette page. Vous recevez simplement votre
                      lien par mail.
                    </p>
                  </form>
                ) : (
                  <p className="font-sans text-encre/55 text-sm text-center leading-relaxed">
                    Formulaire en cours d&apos;activation. En attendant, écrivez à{" "}
                    <a
                      href={fallbackMailto}
                      className="text-bleu-majorelle hover:underline"
                    >
                      {FALLBACK_EMAIL}
                    </a>
                    .
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
