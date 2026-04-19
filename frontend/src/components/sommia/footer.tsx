import Link from "next/link"
import { Wine, Mail, Camera, Bird } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <Link href="/" className="font-heading text-3xl italic text-or">
              SOMMIA
            </Link>
            <p className="text-perle/40 text-sm font-light mt-3 max-w-sm leading-relaxed">
              Votre sommelier IA personnel. Découvrez les accords mets-vins les plus raffinés grâce à l'intelligence artificielle.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-perle/30 hover:text-or transition-colors">
                <Camera className="w-5 h-5" />
              </a>
              <a href="#" className="text-perle/30 hover:text-or transition-colors">
                <Bird className="w-5 h-5" />
              </a>
              <a href="#" className="text-perle/30 hover:text-or transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-creme/60 text-sm font-light tracking-widest uppercase mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-perle/40 text-sm font-light hover:text-or transition-colors">Accueil</Link></li>
              <li><Link href="/pairing" className="text-perle/40 text-sm font-light hover:text-or transition-colors">Accords</Link></li>
              <li><Link href="/cellar" className="text-perle/40 text-sm font-light hover:text-or transition-colors">Ma Cave</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-creme/60 text-sm font-light tracking-widest uppercase mb-4">Légal</h4>
            <ul className="space-y-2">
              <li><Link href="/confidentialite" className="text-perle/40 text-sm font-light hover:text-or transition-colors">Confidentialité</Link></li>
              <li><Link href="/conditions" className="text-perle/40 text-sm font-light hover:text-or transition-colors">Conditions</Link></li>
              <li><Link href="/contact" className="text-perle/40 text-sm font-light hover:text-or transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-perle/20 text-xs font-light">© 2026 SOMMIA. Tous droits réservés.</p>
            <div className="flex items-center gap-2 text-perle/20 text-xs font-light">
              <Wine className="w-3 h-3" />
              Fait avec passion pour les amoureux du vin
            </div>
          </div>
          <p className="text-perle/15 text-[11px] font-light text-center leading-relaxed">
            L&apos;abus d&apos;alcool est dangereux pour la santé. Consommez avec modération. Recommandations IA à vocation indicative — ne constitue pas un conseil professionnel.
          </p>
        </div>
      </div>
    </footer>
  )
}
