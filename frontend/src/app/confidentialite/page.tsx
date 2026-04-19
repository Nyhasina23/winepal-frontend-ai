import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Politique de confidentialité — SOMMIA",
  description: "Politique de confidentialité et protection des données personnelles de SOMMIA.",
}

export default function ConfidentialitePage() {
  return (
    <div className="min-h-screen bg-noir">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <Link href="/" className="text-or/60 text-sm font-light hover:text-or transition-colors">
          ← Retour à l&apos;accueil
        </Link>

        <h1 className="font-heading text-4xl italic text-creme mt-8 mb-2">Politique de confidentialité</h1>
        <p className="text-perle/40 text-sm font-light mb-12">Dernière mise à jour : avril 2026</p>

        <div className="space-y-10 text-perle/70 font-light leading-relaxed">
          <section>
            <h2 className="font-heading text-2xl italic text-creme mb-4">1. Responsable du traitement</h2>
            <p>
              L&apos;application SOMMIA est éditée par Ny Hasina Finaritra. Le responsable du traitement des données
              personnelles est joignable à l&apos;adresse :{" "}
              <a href="mailto:nyhasina.finaritra@gmail.com" className="text-or hover:text-or-light transition-colors underline">
                nyhasina.finaritra@gmail.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl italic text-creme mb-4">2. Données collectées</h2>
            <p className="mb-3">SOMMIA collecte les données suivantes :</p>
            <ul className="list-disc list-inside space-y-2 text-perle/60">
              <li><strong className="text-perle/80">Données d&apos;inscription :</strong> adresse e-mail et mot de passe (crypté)</li>
              <li><strong className="text-perle/80">Profil gustatif :</strong> préférences de vins, régions, arômes, budget et retours (👍/👎)</li>
              <li><strong className="text-perle/80">Données d&apos;utilisation :</strong> requêtes d&apos;accords mets-vins et résultats consultés</li>
              <li><strong className="text-perle/80">Cave personnelle :</strong> favoris sauvegardés</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl italic text-creme mb-4">3. Finalité du traitement</h2>
            <p>
              Les données collectées sont utilisées exclusivement pour : fournir le service d&apos;accords mets-vins
              personnalisés, améliorer les recommandations via l&apos;IA, constituer la cave personnelle de l&apos;utilisateur,
              et le cas échéant, répondre à des demandes de contact.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl italic text-creme mb-4">4. Base légale</h2>
            <p>
              Le traitement des données repose sur l&apos;exécution du contrat (fourniture du service), le consentement
              (profil gustatif, communications), et l&apos;intérêt légitime (amélioration du service).
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl italic text-creme mb-4">5. Durée de conservation</h2>
            <p>
              Les données sont conservées pendant la durée de l&apos;inscription et jusqu&apos;à suppression du compte.
              Les données de profil gustatif et les favoris sont supprimés à la demande de l&apos;utilisateur.
              Les journaux de connexion sont conservés 12 mois.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl italic text-creme mb-4">6. Partage des données</h2>
            <p>
              Les données personnelles ne sont ni vendues, ni louées, ni partagées à des tiers à des fins commerciales.
              Seuls les prestataires techniques nécessaires au fonctionnement du service (hébergement, API IA) y ont
              accès dans le cadre strict de leur prestation.
            </p>
            <ul className="list-disc list-inside space-y-2 text-perle/60 mt-3">
              <li><strong className="text-perle/80">MongoDB Atlas :</strong> stockage des données utilisateur</li>
              <li><strong className="text-perle/80">Groq :</strong> génération des recommandations IA</li>
              <li><strong className="text-perle/80">Unsplash :</strong> images illustratives</li>
              <li><strong className="text-perle/80">Vercel :</strong> hébergement du site</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl italic text-creme mb-4">7. Sécurité</h2>
            <p>
              Les mots de passe sont cryptés via bcrypt. Les communications sont sécurisées par HTTPS.
              Les tokens JWT sont utilisés pour l&apos;authentification avec expiration automatique.
              Des mesures techniques et organisationnelles sont mises en place pour protéger les données.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl italic text-creme mb-4">8. Cookies</h2>
            <p>
              SOMMIA utilise uniquement des tokens d&apos;authentification stockés localement (localStorage) pour maintenir
              la session utilisateur. Aucun cookie de traçage ou publicitaire n&apos;est utilisé.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl italic text-creme mb-4">9. Droits des utilisateurs</h2>
            <p className="mb-3">Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul className="list-disc list-inside space-y-2 text-perle/60">
              <li>Droit d&apos;accès à vos données personnelles</li>
              <li>Droit de rectification de vos données</li>
              <li>Droit à l&apos;effacement de votre compte et données associées</li>
              <li>Droit à la portabilité de vos données</li>
              <li>Droit d&apos;opposition au traitement</li>
            </ul>
            <p className="mt-3">
              Pour exercer ces droits, contactez-nous à{" "}
              <a href="mailto:nyhasina.finaritra@gmail.com" className="text-or hover:text-or-light transition-colors underline">
                nyhasina.finaritra@gmail.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl italic text-creme mb-4">10. Modifications</h2>
            <p>
              La présente politique peut être modifiée à tout moment. Les utilisateurs seront informés par
              notification sur l&apos;application ou par e-mail. La poursuite de l&apos;utilisation vaut acceptation des modifications.
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row justify-between gap-4">
          <Link href="/conditions" className="text-or/60 text-sm font-light hover:text-or transition-colors">
            Conditions générales d&apos;utilisation →
          </Link>
          <Link href="/contact" className="text-or/60 text-sm font-light hover:text-or transition-colors">
            Nous contacter →
          </Link>
        </div>
      </div>
    </div>
  )
}