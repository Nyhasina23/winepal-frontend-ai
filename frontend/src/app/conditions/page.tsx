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
        <p className="text-perle/40 text-sm font-light mb-4">Dernière mise à jour : avril 2026</p>

        <div className="bg-bordeaux/10 border border-bordeaux/30 rounded-none p-4 mb-12">
          <p className="text-or text-sm font-light leading-relaxed">
            ⚠️ SOMMIA est un outil de divertissement à vocation informative. Les recommandations sont générées par intelligence artificielle et ne constituent ni un conseil professionnel, ni une incitation à la consommation d&apos;alcool. L&apos;abus d&apos;alcool est dangereux pour la santé, à consommer avec modération. Ce service est strictement réservé aux personnes en âge légal de consommer de l&apos;alcool.
          </p>
        </div>

        <div className="space-y-10 text-perle/70 font-light leading-relaxed">
          <section>
            <h2 className="font-heading text-2xl italic text-creme mb-4">1. Objet</h2>
            <p>
              Les présentes conditions générales d&apos;utilisation (CGU) régissent l&apos;utilisation de l&apos;application
              SOMMIA, un service de recommandations d&apos;accords mets-vins à vocation récréative et informative propulsé
              par l&apos;intelligence artificielle. L&apos;utilisation du service implique l&apos;acceptation sans réserve
              des présentes CGU. Toute utilisation non conforme à ces conditions est strictement interdite.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl italic text-creme mb-4">2. Définitions</h2>
            <ul className="list-disc list-inside space-y-2 text-perle/60">
              <li><strong className="text-perle/80">SOMMIA :</strong> l&apos;application web d&apos;accords mets-vins accessible à sommia.vercel.app</li>
              <li><strong className="text-perle/80">Éditeur :</strong> Ny Hasina Finaritra, auteur et responsable de SOMMIA</li>
              <li><strong className="text-perle/80">Utilisateur :</strong> toute personne inscrite ou utilisant le service</li>
              <li><strong className="text-perle/80">Recommandation :</strong> suggestion générée par l&apos;IA à partir d&apos;une description utilisateur</li>
              <li><strong className="text-perle/80">Profil gustatif :</strong> ensemble des préférences enregistrées par l&apos;utilisateur</li>
              <li><strong className="text-perle/80">Service :</strong> l&apos;ensemble des fonctionnalités proposées par SOMMIA</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl italic text-creme mb-4">3. Conditions d&apos;accès</h2>
            <p className="mb-3">
              SOMMIA est un service gratuit. L&apos;accès à certaines fonctionnalités (cave personnelle, profil gustatif,
              recommandations personnalisées) requiert la création d&apos;un compte.
            </p>
            <p className="mb-3">
              <strong className="text-perle/90">Condition d&apos;âge :</strong> l&apos;utilisation de SOMMIA est strictement
              réservée aux personnes ayant atteint l&apos;âge légal de consommation d&apos;alcool dans leur pays de résidence
              (18 ans en France, 21 ans aux États-Unis, etc.). En utilisant le service, l&apos;utilisateur déclare avoir
              l&apos;âge légal requis.
            </p>
            <p>
              L&apos;éditeur se réserve le droit de suspendre, modifier ou interrompre tout ou partie du service
              sans préavis ni indemnité.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl italic text-creme mb-4">4. Inscription et compte</h2>
            <p className="mb-3">L&apos;utilisateur s&apos;engage à :</p>
            <ul className="list-disc list-inside space-y-2 text-perle/60">
              <li>Fournir des informations exactes lors de l&apos;inscription</li>
              <li>Conserver la confidentialité de ses identifiants de connexion</li>
              <li>Ne pas créer de comptes multiples</li>
              <li>Ne pas utiliser le service à des fins illégales, frauduleuses ou commerciales non autorisées</li>
              <li>Signaler tout accès non autorisé à son compte</li>
              <li>Utiliser le service conformément aux lois en vigueur dans son pays de résidence</li>
            </ul>
            <p className="mt-3">
              L&apos;éditeur se réserve le droit de suspendre ou supprimer tout compte ne respectant pas ces conditions,
              sans préavis ni indemnité.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl italic text-creme mb-4">5. Nature du service et avertissement IA</h2>
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-none p-5 mb-4 space-y-3">
              <p className="text-creme/90 font-light">
                <strong>Les recommandations de SOMMIA sont générées par intelligence artificielle et ont une valeur purement indicative et récréative.</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 text-perle/60 text-sm">
                <li>Les suggestions ne constituent pas un conseil professionnel, qu&apos;il soit œnologique, gastronomique, santé ou commercial</li>
                <li>L&apos;IA peut produire des informations inexactes, incomplètes ou obsolètes (hallucinations)</li>
                <li>Les vins et plats mentionnés peuvent ne pas être disponibles, ne pas correspondre à la description donnée, ou ne pas être adaptés aux allergies ou restrictions alimentaires de l&apos;utilisateur</li>
                <li>L&apos;utilisateur est seul responsable de ses choix d&apos;achat et de consommation</li>
              </ul>
            </div>
            <p className="mb-3">
              L&apos;utilisateur reconnaît que les recommandations sont le résultat d&apos;un traitement algorithmique
              et non d&apos;une expertise humaine. Il relève de sa seule responsabilité de vérifier la pertinence
              des suggestions avant tout achat ou consommation.
            </p>
            <p>
              SOMMIA ne se substitue en aucun cas à l&apos;avis d&apos;un professionnel de la santé, d&apos;un sommelier
              certifié ou de tout autre expert.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl italic text-creme mb-4">6. Alcool et santé</h2>
            <div className="bg-bordeaux/10 border border-bordeaux/30 rounded-none p-5 space-y-3">
              <p className="text-creme/90 font-light text-sm">
                L&apos;abus d&apos;alcool est dangereux pour la santé. Consommez avec modération.
              </p>
              <ul className="text-perle/60 text-sm space-y-1 list-disc list-inside">
                <li>SOMMIA ne vise pas à encourager, promouvoir ou faciliter la consommation excessive d&apos;alcool</li>
                <li>SOMMIA ne vend pas d&apos;alcool et ne perçoit aucune commission sur d&apos;éventuels achats</li>
                <li>Les recommandations de vins sont des suggestions culturelles et gustatives, non des prescriptions</li>
                <li>SOMMIA recommande de respecter les limites de consommation définies par les autorités de santé publique</li>
                <li>La consommation d&apos;alcool est déconseillée pendant la grossesse et l&apos;allaitement</li>
                <li>SOMMIA ne saurait être tenu responsable des conséquences liées à la consommation d&apos;alcool par un utilisateur</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-heading text-2xl italic text-creme mb-4">7. Limitation de responsabilité</h2>
            <p className="mb-3">
              L&apos;éditeur ne saurait être tenu responsable, de quelque manière que ce soit, pour :
            </p>
            <ul className="list-disc list-inside space-y-2 text-perle/60">
              <li>L&apos;exactitude, la pertinence ou l&apos;exhaustivité des recommandations générées par l&apos;IA</li>
              <li>Les effets d&apos;une consommation d&apos;alcool résultant directement ou indirectement de l&apos;utilisation du service</li>
              <li>Les allergies, intolérances alimentaires ou problèmes de santé liés aux suggestions de plats ou de vins</li>
              <li>La disponibilité, le prix ou la qualité des vins et plats mentionnés</li>
              <li>L&apos;indisponibilité temporaire ou permanente du service, y compris pour des raisons de maintenance, de force majeure ou de défaillance technique</li>
              <li>Les dommages directs, indirects, incidents, spéciaux ou consécutifs résultant de l&apos;utilisation ou de l&apos;impossibilité d&apos;utiliser le service</li>
              <li>Le contenu de sites tiers accessibles via des liens présents sur SOMMIA</li>
              <li>Les pertes de données résultant de défaillances techniques, piratages ou autres incidents de sécurité</li>
            </ul>
            <p className="mt-3">
              Le service est fourni &laquo; en l&apos;état &raquo; sans garantie d&apos;aucune sorte, expresse ou implicite,
              y compris mais sans s&apos;y limiter, les garanties de commercialisation, d&apos;adéquation à un usage
              particulier et de non-contrefaçon.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl italic text-creme mb-4">8. Indemnisation</h2>
            <p>
              L&apos;utilisateur s&apos;engage à indemniser et dégager de toute responsabilité l&apos;éditeur,
              ses dirigeants, employés et partenaires, contre toute réclamation, perte, dommage, coût ou dépense
              (y compris les frais juridiques) découlant de : son utilisation non conforme du service, sa violation
              des présentes CGU, sa violation de droits de tiers, ou de toute réclamation liée à sa consommation
              d&apos;alcool suite aux recommandations du service.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl italic text-creme mb-4">9. Propriété intellectuelle</h2>
            <p className="mb-3">
              L&apos;ensemble des éléments constituant SOMMIA (design, logo, marques, code source, textes, bouteille 3D,
              visuels, structure) sont la propriété exclusive de l&apos;éditeur ou de ses concédants de licence.
            </p>
            <p className="mb-3">
              Les images illustratives proviennent d&apos;Unsplash et sont soumises à la licence Unsplash.
              L&apos;utilisateur n&apos;acquiert aucun droit de propriété intellectuelle sur le contenu du service.
            </p>
            <p>
              Sont strictement interdits : la reproduction, représentation, modification, distribution, extraction,
              reverse engineering, décompilation, ou création d&apos;œuvres dérivées de tout ou partie du service,
              sans autorisation écrite préalable de l&apos;éditeur.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl italic text-creme mb-4">10. Contenu utilisateur</h2>
            <p>
              L&apos;utilisateur reste propriétaire des données qu&apos;il saisit (descriptions de plats/vins, préférences
              gustatives). En utilisant le service, l&apos;utilisateur accorde à l&apos;éditeur une licence non exclusive,
              gratuite et mondiale pour traiter ces données aux fins exclusives de fourniture du service et d&apos;amélioration
              des recommandations. L&apos;éditeur ne revend ni ne partage ces données à des tiers.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl italic text-creme mb-4">11. Données personnelles</h2>
            <p>
              Le traitement des données personnelles est régi par la{" "}
              <Link href="/confidentialite" className="text-or hover:text-or-light transition-colors underline">
                Politique de confidentialité
              </Link>.
              En utilisant SOMMIA, l&apos;utilisateur consent au traitement de ses données tel que décrit dans cette politique.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl italic text-creme mb-4">12. Force majeure</h2>
            <p>
              L&apos;éditeur ne sera pas responsable de tout retard ou manquement à ses obligations résultant d&apos;un
              événement de force majeure, y compris mais sans s&apos;y limiter : catastrophe naturelle, pandémie,
              grève, panne d&apos;infrastructure internet, attaque cybernétique, défaillance de fournisseurs tiers
              (API IA, hébergeur, base de données), ou toute autre circonstance hors de son contrôle raisonnable.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl italic text-creme mb-4">13. Modification des CGU</h2>
            <p>
              L&apos;éditeur se réserve le droit de modifier les CGU à tout moment. Les modifications seront publiées
              sur cette page avec mise à jour de la date de dernière modification. La poursuite de l&apos;utilisation
              du service après la publication des modifications vaut acceptation sans réserve des nouvelles conditions.
              Il appartient à l&apos;utilisateur de consulter régulièrement les CGU.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl italic text-creme mb-4">14. Integrabilité</h2>
            <p>
              Si l&apos;une quelconque des clauses des présentes CGU venait à être déclarée nulle ou inapplicable
              par une décision de justice, les autres clauses conserveraient leur pleine validité et portée.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl italic text-creme mb-4">15. Non-renonciation</h2>
            <p>
              Le fait pour l&apos;éditeur de ne pas se prévaloir d&apos;un manquement de l&apos;utilisateur à l&apos;une
              de ses obligations ne saurait être interprété comme une renonciation à l&apos;obligation en cause.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl italic text-creme mb-4">16. Droit applicable et juridiction</h2>
            <p>
              Les présentes CGU sont soumises au droit français. En cas de litige relatif à l&apos;interprétation
              ou l&apos;exécution des présentes, les parties s&apos;efforceront de trouver une solution amiable avant
              toute procédure judiciaire. À défaut d&apos;accord amiable, les tribunaux compétents seront ceux du
              ressort du siège de l&apos;éditeur.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl italic text-creme mb-4">17. Contact</h2>
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