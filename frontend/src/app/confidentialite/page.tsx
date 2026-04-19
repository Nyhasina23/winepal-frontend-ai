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
              L&apos;application SOMMIA est éditée par Ny Hasina Finaritra, ci-après désigné &laquo; l&apos;éditeur &raquo;,
              responsable du traitement des données personnelles, joignable à l&apos;adresse :{" "}
              <a href="mailto:nyhasina.finaritra@gmail.com" className="text-or hover:text-or-light transition-colors underline">
                nyhasina.finaritra@gmail.com
              </a>.
            </p>
            <p className="mt-3">
              Pour exercer vos droits ou poser toute question relative à la présente politique, vous pouvez
              contacter le délégué à la protection des données à cette même adresse. Le délai de réponse est
              de 30 jours maximum conformément au RGPD.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl italic text-creme mb-4">2. Données collectées</h2>
            <p className="mb-3">SOMMIA collecte les catégories de données suivantes :</p>
            <ul className="list-disc list-inside space-y-2 text-perle/60">
              <li><strong className="text-perle/80">Données d&apos;inscription :</strong> adresse e-mail et mot de passe (crypté via bcrypt, non récupérable en clair)</li>
              <li><strong className="text-perle/80">Profil gustatif :</strong> préférences de vins, régions, arômes, budget et retours (👍/👎)</li>
              <li><strong className="text-perle/80">Données d&apos;utilisation :</strong> requêtes d&apos;accords mets-vins et résultats consultés</li>
              <li><strong className="text-perle/80">Cave personnelle :</strong> favoris sauvegardés</li>
              <li><strong className="text-perle/80">Données de contact :</strong> nom, e-mail et message envoyés via le formulaire de contact (traités par Formspree)</li>
            </ul>
            <p className="mt-3">
              Aucune donnée sensible (origine raciale, opinions politiques, données de santé, etc.) n&apos;est collectée.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl italic text-creme mb-4">3. Finalité du traitement</h2>
            <p className="mb-3">Les données collectées sont utilisées exclusivement pour les finalités suivantes :</p>
            <ul className="list-disc list-inside space-y-2 text-perle/60">
              <li>Fournir le service d&apos;accords mets-vins personnalisés</li>
              <li>Améliorer les recommandations via l&apos;intelligence artificielle et le profil gustatif</li>
              <li>Constituer la cave personnelle de l&apos;utilisateur</li>
              <li>Maintenir la sécurité du service (authentification JWT)</li>
              <li>Répondre aux demandes de contact</li>
            </ul>
            <p className="mt-3">
              Les données ne sont pas utilisées à des fins de prospection commerciale, de publicité ciblée
              ou de prise de décision automatisée ayant un effet juridique sur l&apos;utilisateur.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl italic text-creme mb-4">4. Base légale</h2>
            <p>
              Le traitement des données repose sur :
            </p>
            <ul className="list-disc list-inside space-y-2 text-perle/60 mt-3">
              <li><strong className="text-perle/80">L&apos;exécution du contrat :</strong> fourniture du service demandé par l&apos;utilisateur (art. 6.1.b RGPD)</li>
              <li><strong className="text-perle/80">Le consentement :</strong> profil gustatif, données de contact (art. 6.1.a RGPD)</li>
              <li><strong className="text-perle/80">L&apos;intérêt légitime :</strong> amélioration du service et sécurité (art. 6.1.f RGPD)</li>
            </ul>
            <p className="mt-3">
              L&apos;utilisateur peut retirer son consentement à tout moment en supprimant son compte ou en nous contactant.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl italic text-creme mb-4">5. Durée de conservation</h2>
            <ul className="list-disc list-inside space-y-2 text-perle/60">
              <li><strong className="text-perle/80">Données d&apos;inscription :</strong> durée de l&apos;inscription, jusqu&apos;à suppression du compte</li>
              <li><strong className="text-perle/80">Profil gustatif et cave :</strong> durée de l&apos;inscription, supprimées à la demande</li>
              <li><strong className="text-perle/80">Données de contact :</strong> 12 mois après le dernier échange</li>
              <li><strong className="text-perle/80">Journaux de connexion :</strong> 12 mois</li>
              <li><strong className="text-perle/80">Logs techniques :</strong> 30 jours</li>
            </ul>
            <p className="mt-3">
              Au-delà de ces durées, les données sont soit supprimées, soit anonymisées de manière irréversible.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl italic text-creme mb-4">6. Destinataires des données</h2>
            <p className="mb-3">
              Les données personnelles ne sont ni vendues, ni louées, ni partagées à des tiers à des fins commerciales.
              Seuls les prestataires techniques nécessaires au fonctionnement du service y ont accès dans le cadre
              strict de leur prestation :
            </p>
            <ul className="list-disc list-inside space-y-2 text-perle/60">
              <li><strong className="text-perle/80">MongoDB Atlas :</strong> stockage des données utilisateur (sous-traitant, hébergement USA)</li>
              <li><strong className="text-perle/80">Groq :</strong> génération des recommandations IA (sous-traitant, traitement USA)</li>
              <li><strong className="text-perle/80">Unsplash :</strong> images illustratives (pas de données personnelles transmises)</li>
              <li><strong className="text-perle/80">Vercel :</strong> hébergement du site (sous-traitant, hébergement USA)</li>
              <li><strong className="text-perle/80">Formspree :</strong> traitement des formulaires de contact (sous-traitant, USA)</li>
            </ul>
            <p className="mt-3">
              Certains sous-traitants sont situés en dehors de l&apos;Espace Économique Européen (EEE). Des transferts
              internationaux de données ont lieu vers les États-Unis, encadrés par des clauses contractuelles types
              (SCC) ou des décisions d&apos;adéquation applicables, conformément au RGPD.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl italic text-creme mb-4">7. Sécurité</h2>
            <p className="mb-3">
              L&apos;éditeur met en œuvre les mesures techniques et organisationnelles appropriées pour protéger
              les données personnelles contre la destruction accidentelle, la perte, l&apos;altération, la divulgation
              ou l&apos;accès non autorisé :
            </p>
            <ul className="list-disc list-inside space-y-2 text-perle/60">
              <li>Mots de passe cryptés via bcrypt (hash irréversible)</li>
              <li>Communications sécurisées par HTTPS/TLS</li>
              <li>Authentification par tokens JWT avec expiration automatique</li>
              <li>CORS restrictif sur l&apos;API</li>
              <li>Validation des entrées côté serveur (ValidationPipe whitelist)</li>
            </ul>
            <p className="mt-3">
              En cas de violation de données personnelles susceptible d&apos;engendrer un risque élevé pour les
              droits et libertés des personnes concernées, l&apos;éditeur notifiera la CNIL dans les 72 heures
              et informera les utilisateurs sans délai.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl italic text-creme mb-4">8. Cookies et stockage local</h2>
            <p>
              SOMMIA n&apos;utilise pas de cookies de traçage ou publicitaire. Seuls des tokens d&apos;authentification
              JWT sont stockés dans le localStorage du navigateur pour maintenir la session utilisateur.
              Aucun outil d&apos;analyse tierce (Google Analytics, etc.) n&apos;est utilisé.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl italic text-creme mb-4">9. Décision automatisée et profilage</h2>
            <p>
              Les recommandations générées par l&apos;IA sont des suggestions à vocation informative et récréative.
              Elles ne constituent pas une décision automatisée au sens de l&apos;article 22 du RGPD ayant des effets
              juridiques ou impactant de manière significative l&apos;utilisateur. L&apos;IA ne profile pas l&apos;utilisateur
              à des fins de notation ou d&apos;évaluation.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl italic text-creme mb-4">10. Droits des utilisateurs</h2>
            <p className="mb-3">Conformément au RGPD (règlement européen 2016/679), vous disposez des droits suivants :</p>
            <ul className="list-disc list-inside space-y-2 text-perle/60">
              <li><strong className="text-perle/80">Droit d&apos;accès :</strong> obtenir une copie de vos données personnelles</li>
              <li><strong className="text-perle/80">Droit de rectification :</strong> corriger des données inexactes</li>
              <li><strong className="text-perle/80">Droit à l&apos;effacement :</strong> supprimer votre compte et toutes vos données</li>
              <li><strong className="text-perle/80">Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
              <li><strong className="text-perle/80">Droit d&apos;opposition :</strong> vous opposer au traitement de vos données</li>
              <li><strong className="text-perle/80">Droit à la limitation :</strong> limiter le traitement de vos données</li>
              <li><strong className="text-perle/80">Droit de retirer le consentement :</strong> à tout moment, sans affecter la licéité du traitement antérieur</li>
            </ul>
            <p className="mt-3">
              Pour exercer ces droits, contactez-nous à{" "}
              <a href="mailto:nyhasina.finaritra@gmail.com" className="text-or hover:text-or-light transition-colors underline">
                nyhasina.finaritra@gmail.com
              </a>.
              Vous disposez également d&apos;un droit de réclamation auprès de la CNIL (cnil.fr).
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl italic text-creme mb-4">11. Liens vers des sites tiers</h2>
            <p>
              SOMMIA peut contenir des liens vers des sites externes (réseaux sociaux, sites de partage).
              L&apos;éditeur n&apos;est pas responsable du contenu, des pratiques de confidentialité ou de la
              disponibilité de ces sites tiers. L&apos;utilisateur est invité à consulter les politiques de
              confidentialité de ces sites.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl italic text-creme mb-4">12. Modifications</h2>
            <p>
              La présente politique peut être modifiée à tout moment. En cas de modification substantielle,
              les utilisateurs seront informés par notification sur l&apos;application. La poursuite de
              l&apos;utilisation vaut acceptation des modifications. Il est recommandé de consulter cette page
              régulièrement.
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