import { CalendarClock } from "lucide-react";

/**
 * Délai d'attente actuel affiché dans le tunnel de réservation.
 * POUR METTRE À JOUR LE DÉLAI : changer uniquement la valeur ci-dessous.
 * Exemples : "environ 1 mois", "2 à 3 mois", "nous consulter".
 */
export const DELAI_ATTENTE = "environ 2 mois";

export function DelaiBanner() {
  return (
    <div
      className="flex items-start gap-3 p-4 rounded-xl mb-8 border"
      style={{
        background: "rgba(201,169,97,0.10)",
        borderColor: "rgba(201,169,97,0.35)",
      }}
    >
      <CalendarClock
        size={18}
        strokeWidth={1.8}
        className="text-or-doux shrink-0 mt-0.5"
      />
      <p className="font-sans text-encre/75 text-sm leading-relaxed">
        <strong className="font-medium text-encre">
          Délai d&apos;attente actuel : {DELAI_ATTENTE}.
        </strong>{" "}
        Votre paiement réserve votre place dans l&apos;agenda. Vous êtes
        recontacté sous 24h pour fixer ensemble la date de votre consultation.
      </p>
    </div>
  );
}
