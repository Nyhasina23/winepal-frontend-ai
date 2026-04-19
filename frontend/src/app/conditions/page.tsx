import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation — SOMMIA",
  description: "Conditions générales d'utilisation de l'application SOMMIA.",
}

export default function ConditionsPage() {
  return (
    <div className="min-h-screen bg-noir">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <Link href="/" className="text-or/60 text-sm font-light hover:text-or transition-colors">
          ← Retour à l&apos;accueil
        </Link>

        <h1 className="font-heading text-4xl italic text-creme mt-8 mb-2">Conditions générales d&apos;utilisation</h1>
        <p className="text-perle/40 text-sm font-light mb-12">Dernière mise à jour : avril 2026</p>

        <div className="space-y-10 text-perle/70 font-light leading-relaxed">
          <section>
            <h2 className="font-heading text-2xl italic text-creme mb-4">1. Objet</h2>
            <p>
              Les présentes conditions générales d&apos;utilisation (CGU) régissent l&apos;utilisation de l&apos;application
              SOMMIA, un service de recommandations d&apos;accords mets-vins propulsé par l&apos;intelligence artificielle.
              L&apos;utilisation du service implique l&apos;acceptation sans réserve des présentes CGU.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl italic text-creme mb-4">2. Définitions</h2>
            <ul className="list-disc list-inside space-y-2 text-perle/60">
              <li><strong className="text-perle/80">SOMMIA :</strong> l&apos;application web d&apos;accords mets-vins accessible à sommia.vercel.app</li>
              <li><strong className="text-perle/80">Utilisateur :</strong> toute personne inscrite ou utilisant le service</li>
              <li><strong className="text-perle/80">Recommandation :</strong> suggestion générée par l&apos;IA à partir d&apos;une description</li>
              <li><strong className="text-perle/80">Profil gustatif :</strong> ensemble des préférences enregistrées par l&apos;utilisateur</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl italic text-creme mb-4">3. Accès au service</h2>
            <p>
              SOMMIA est un service gratuit. L&apos;accès à certaines fonctionnalités (cave personnelle, profil gustatif,
              recommandations personnalisées) requiert la création d&apos;un compte. L&apos;éditeur se réserve le droit
              de suspendre ou modifier le service sans préavis.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl italic text-creme mb-4">4. Inscription et compte</h2>
            <p className="mb-3">L&apos;utilisateur s&apos;engage à fournir des informations exactes lors de l&apos;inscription et à :</p>
            <ul className="list-disc list-inside space-y-2 text-perle/60">
              <li>Conserver la confidentialité de ses identifiants de connexion</li>
              <li>Ne pas créer de comptes multiples</li>
              <li>Ne pas utiliser le service à des fins illégales ou commerciales non autorisées</li>
              <li>Signaler tout accès non autorisé à son compte</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl italic text-creme mb-4">5. Recommandations IA</h2>
            <p>
              Les recommandations sont générées par une intelligence artificielle (modèle llama-3.3-70b-versatile via
              l&apos;API Groq). Elles ont une valeur indicative et ne sauraient se substituer à un avis professionnel
              de sommelier. SOMMIA ne garantit pas l&apos;exactitude, la disponibilité ou la pertinence des vins
              ou plats suggérés.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl italic text-creme mb-4">6. Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble des éléments constituant SOMMIA (design, logo, code, textes, bouteille 3D) sont la propriété
              de l&apos;éditeur. Les images illustratives proviennent d&apos;Unsplash et sont soumises à la licence Unsplash.
              Toute reproduction, même partielle, est interdite sans autorisation préalable.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl italic text-creme mb-4">7. Responsabilité</h2>
            <p>
              L&apos;éditeur ne saurait être tenu responsable en cas de : indisponibilité temporaire du service,
              recommandation inadaptée, erreur dans la description d&apos;un vin ou plat, ou dommages indirects
              résultant de l&apos;utilisation du service. Les informations sur les vins (prix, disponibilité) sont
              fournies à titre indicatif.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl italic text-creme mb-4">8. Données personnelles</h2>
            <p>
              Le traitement des données personnelles est régi par la{" "}
              <Link href="/confidentialite" className="text-or hover:text-or-light transition-colors underline">
                Politique de confidentialité
              </Link>.
              En utilisant SOMMIA, l&apos;utilisateur consent au traitement de ses données tel que décrit dans cette politique.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl italic text-creme mb-4">9. Limitation de consommation d&apos;alcool</h2>
            <p>
              SOMMIA est un outil de recommandation à destination d&apos;un public adulte légal. L&apos;abus d&apos;alcool
              est dangereux pour la santé. Les recommandations ne visent pas à encourager une consommation excessive.
              L&apos;application est strictement réservée aux personnes en âge de consommer légalement de l&apos;alcool
              selon la législation de leur pays de résidence.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl italic text-creme mb-4">10. Modification des CGU</h2>
            <p>
              L&apos;éditeur se réserve le droit de modifier les CGU à tout moment. Les utilisateurs seront informés
              par notification sur l&apos;application. La poursuite de l&apos;utilisation après modification vaut
              acceptation des nouvelles conditions.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl italic text-creme mb-4">11. Droit applicable</h2>
            <p>
              Les présentes CGU sont soumises au droit français. En cas de litige, les tribunaux compétents seront
              ceux du ressort du siège de l&apos;éditeur.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl italic text-creme mb-4">12. Contact</h2>
            <p>
              Pour toute question relative aux présentes conditions, contactez-nous à{" "}
              <a href="mailto:nyhasina.finaritra@gmail.com" className="text-or hover:text-or-light transition-colors underline">
                nyhasina.finaritra@gmail.com
              </a>{" "}
              ou via la{" "}
              <Link href="/contact" className="text-or hover:text-or-light transition-colors underline">
                page de contact
              </Link>.
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row justify-between gap-4">
          <Link href="/confidentialite" className="text-or/60 text-sm font-light hover:text-or transition-colors">
            ← Politique de confidentialité
          </Link>
          <Link href="/contact" className="text-or/60 text-sm font-light hover:text-or transition-colors">
            Nous contacter →
          </Link>
        </div>
      </div>
    </div>
  )
}