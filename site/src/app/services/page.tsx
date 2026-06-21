import { Services } from "@/components/sections/Services";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/sections/Footer";
import { Seuil } from "@/components/sections/Seuil";

export const metadata = {
  title: "Services & tarifs · Jocelyn Amir, médium voyant à La Réunion",
  description:
    "Consultation d'une heure au cabinet à Saint-Clotilde ou à distance (120€), séance de 30 minutes par téléphone (85€), ou coaching de vie. Paiement sécurisé, confirmation sous 24h.",
  keywords: [
    "médium voyant La Réunion",
    "consultation voyance prix",
    "voyance à distance Réunion",
    "coaching de vie La Réunion",
    "Jocelyn Amir tarifs",
  ],
};

export default function ServicesPage() {
  return (
    <main className="bg-ivoire">
      <Services />
      <FAQ />
      <Seuil />
      <Footer />
    </main>
  );
}
