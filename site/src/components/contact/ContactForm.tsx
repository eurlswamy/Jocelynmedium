"use client";

import { useState } from "react";
import { ChevronDown, MessageSquare, User, Mail, Loader2, CheckCircle2 } from "lucide-react";

// ──── Intégration Web3Forms ────
// Le formulaire envoie directement vers l'API Web3Forms (aucun backend requis).
// POUR ACTIVER : créer une clé gratuite sur https://web3forms.com (l'adresse
// e-mail de réception est celle reliée à la clé), puis renseigner la variable
// d'environnement NEXT_PUBLIC_WEB3FORMS_KEY (ex. dans .env.local et sur Vercel).
// Tant que la clé n'est pas définie, le bouton reste désactivé et un message
// l'indique, sans casser l'affichage.
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const isConfigured = WEB3FORMS_KEY.length > 0;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isConfigured || status === "sending") return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", WEB3FORMS_KEY);
    formData.append("subject", "Nouveau message depuis jocelynamir.com");
    formData.append("from_name", "Site Jocelyn Amir");

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
        setErrorMsg(data.message || "L'envoi a échoué. Réessayez ou écrivez directement par mail.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Connexion impossible. Vérifiez votre réseau ou écrivez directement par mail.");
    }
  }

  if (status === "success") {
    return (
      <div
        className="flex flex-col items-center text-center gap-4 p-8 rounded-2xl border bg-white"
        style={{ borderColor: "rgba(27,122,143,0.25)" }}
      >
        <span className="flex items-center justify-center w-14 h-14 rounded-full bg-bleu-majorelle/12 text-bleu-majorelle">
          <CheckCircle2 size={28} strokeWidth={1.6} />
        </span>
        <h3 className="font-serif text-2xl text-encre">Message envoyé.</h3>
        <p className="font-sans text-encre/60 text-sm leading-relaxed max-w-sm">
          Merci pour votre message. Jocelyn vous répond personnellement sous 24h.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-1 font-sans text-[11px] tracking-[0.2em] uppercase text-bleu-majorelle hover:underline"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {/* Anti-spam : champ caché (honeypot) Web3Forms */}
      <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

      <div>
        <label htmlFor="nom" className="block font-sans text-[11px] tracking-[0.3em] uppercase text-encre/55 mb-2">
          Votre nom
        </label>
        <div className="relative">
          <User size={15} strokeWidth={1.5} className="absolute left-4 top-1/2 -translate-y-1/2 text-encre/30" />
          <input
            id="nom"
            name="nom"
            type="text"
            required
            placeholder="Prénom Nom"
            className="w-full pl-11 pr-4 py-3.5 bg-white border border-encre/12 rounded-xl font-sans text-encre placeholder:text-encre/30 focus:outline-none focus:border-bleu-majorelle/50 focus:ring-1 focus:ring-bleu-majorelle/30 transition-all text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block font-sans text-[11px] tracking-[0.3em] uppercase text-encre/55 mb-2">
          Votre email
        </label>
        <div className="relative">
          <Mail size={15} strokeWidth={1.5} className="absolute left-4 top-1/2 -translate-y-1/2 text-encre/30" />
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="vous@exemple.com"
            className="w-full pl-11 pr-4 py-3.5 bg-white border border-encre/12 rounded-xl font-sans text-encre placeholder:text-encre/30 focus:outline-none focus:border-bleu-majorelle/50 focus:ring-1 focus:ring-bleu-majorelle/30 transition-all text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="sujet" className="block font-sans text-[11px] tracking-[0.3em] uppercase text-encre/55 mb-2">
          Sujet
        </label>
        <div className="relative">
          <select
            id="sujet"
            name="sujet"
            defaultValue=""
            required
            className="w-full pl-4 pr-10 py-3.5 bg-white border border-encre/12 rounded-xl font-sans text-encre appearance-none focus:outline-none focus:border-bleu-majorelle/50 focus:ring-1 focus:ring-bleu-majorelle/30 transition-all text-sm"
          >
            <option value="" disabled>Choisissez un sujet…</option>
            <option value="consultation-cabinet">Consultation au cabinet</option>
            <option value="consultation-distance">Consultation à distance</option>
            <option value="coaching">Coaching de vie</option>
            <option value="question">Question générale</option>
            <option value="autre">Autre</option>
          </select>
          <ChevronDown size={15} strokeWidth={1.5} className="absolute right-4 top-1/2 -translate-y-1/2 text-encre/40 pointer-events-none" />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block font-sans text-[11px] tracking-[0.3em] uppercase text-encre/55 mb-2">
          Votre message
        </label>
        <div className="relative">
          <MessageSquare size={15} strokeWidth={1.5} className="absolute left-4 top-4 text-encre/30" />
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            placeholder="Décrivez votre situation ou posez votre question…"
            className="w-full pl-11 pr-4 py-3.5 bg-white border border-encre/12 rounded-xl font-sans text-encre placeholder:text-encre/30 focus:outline-none focus:border-bleu-majorelle/50 focus:ring-1 focus:ring-bleu-majorelle/30 transition-all text-sm resize-none"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!isConfigured || status === "sending"}
        className="w-full py-4 rounded-xl font-sans text-sm tracking-[0.2em] uppercase font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ background: "#1B7A8F", color: "#FAF6EE" }}
      >
        {status === "sending" ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Envoi en cours…
          </>
        ) : (
          "Envoyer le message"
        )}
      </button>

      {status === "error" && (
        <p className="font-sans text-terre-cuite text-xs text-center leading-relaxed">
          {errorMsg}
        </p>
      )}

      {!isConfigured ? (
        <p className="font-sans text-encre/40 text-xs text-center leading-relaxed">
          Formulaire en cours d&apos;activation. En attendant, écrivez à{" "}
          <a href="mailto:contact@jocelynamir.com" className="text-bleu-majorelle hover:underline">
            contact@jocelynamir.com
          </a>
          .
        </p>
      ) : (
        <p className="font-sans text-encre/40 text-xs text-center">
          Je réponds personnellement sous 24h.
        </p>
      )}

      <p className="font-sans text-encre/40 text-[11px] text-center leading-relaxed">
        Les informations recueillies servent uniquement à répondre à votre demande. Voir notre{" "}
        <a href="/confidentialite" className="text-bleu-majorelle hover:underline">
          politique de confidentialité
        </a>
        .
      </p>
    </form>
  );
}
