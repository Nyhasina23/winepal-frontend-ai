"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import api from "@/lib/api"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Compass, Wine, MapPin, Loader2 } from "lucide-react"
import Link from "next/link"

interface Suggestion {
  name: string
  type: string
  region: string
  grape: string
  explanation: string
  characteristics: string[]
  badge: string
  photoUrl: string
  photoCredit?: string
  photoCreditUrl?: string
  photoUnsplashUrl?: string
}

const CATEGORIES = [
  { key: "", label: "Tous", icon: Compass },
  { key: "vin-rouge", label: "Rouge", icon: Wine },
  { key: "vin-blanc", label: "Blanc", icon: Wine },
  { key: "rose", label: "Rosé", icon: Wine },
  { key: "effervescent", label: "Effervescent", icon: Wine },
]

const REGIONS = [
  { key: "", label: "Toutes" },
  { key: "Bordeaux", label: "Bordeaux" },
  { key: "Bourgogne", label: "Bourgogne" },
  { key: "Rhône", label: "Rhône" },
  { key: "Loire", label: "Loire" },
  { key: "Champagne", label: "Champagne" },
  { key: "Alsace", label: "Alsace" },
  { key: "Provence", label: "Provence" },
  { key: "Espagne", label: "Espagne" },
  { key: "Italie", label: "Italie" },
]

export default function DiscoverPage() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState("")
  const [region, setRegion] = useState("")

  useEffect(() => {
    fetchDiscover()
  }, [category, region])

  const fetchDiscover = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (category) params.set("category", category)
      if (region) params.set("region", region)
      const res = await api.get(`/pairing/discover?${params.toString()}`)
      setSuggestions(res.data.suggestions)
    } catch {
      setSuggestions([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-noir pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="text-or/60 text-sm font-light hover:text-or transition-colors inline-flex items-center gap-1">
          ← Accueil
        </Link>

        <div className="mt-8 mb-10">
          <div className="flex items-center gap-3 mb-2">
            <Compass className="w-6 h-6 text-or" />
            <h1 className="font-heading text-4xl italic text-creme">Découvrir</h1>
          </div>
          <p className="text-perle/50 font-light max-w-lg">
            Explorez le monde du vin à travers différentes régions et styles.
          </p>
        </div>

        <div className="space-y-4 mb-10">
          <div>
            <p className="text-perle/40 text-xs font-light tracking-widest uppercase mb-3">Type de vin</p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setCategory(cat.key)}
                  className={`px-4 py-2 text-sm font-light rounded-none border transition-colors ${
                    category === cat.key
                      ? "bg-or/15 text-or border-or/30"
                      : "bg-white/5 text-perle/50 border-white/10 hover:border-or/30"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-perle/40 text-xs font-light tracking-widest uppercase mb-3">Région</p>
            <div className="flex flex-wrap gap-2">
              {REGIONS.map((reg) => (
                <button
                  key={reg.key}
                  onClick={() => setRegion(reg.key)}
                  className={`px-3 py-1.5 text-xs font-light rounded-none border transition-colors ${
                    region === reg.key
                      ? "bg-bordeaux/20 text-creme border-bordeaux/40"
                      : "bg-white/5 text-perle/40 border-white/10 hover:border-bordeaux/30"
                  }`}
                >
                  {reg.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-or animate-spin" />
            <span className="ml-3 text-perle/50 font-light">SOMMIA prépare votre sélection...</span>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {suggestions.map((s, i) => (
              <motion.div
                key={i}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              >
                <Card className="glass overflow-hidden group rounded-none border-white/[0.06]">
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={s.photoUrl}
                      alt={s.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-noir/60 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-bordeaux/80 text-creme text-xs rounded-none font-light border-or/20">
                        {s.badge}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-5 space-y-3">
                    <h3 className="font-heading text-xl italic text-creme">{s.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="border-white/[0.08] text-perle/50 text-xs font-light rounded-none gap-1">
                        <Wine className="w-3 h-3" />
                        {s.type}
                      </Badge>
                      <Badge variant="outline" className="border-white/[0.08] text-perle/50 text-xs font-light rounded-none gap-1">
                        <MapPin className="w-3 h-3" />
                        {s.region}
                      </Badge>
                    </div>
                    <p className="text-sm text-perle/50 font-light leading-relaxed line-clamp-3">{s.explanation}</p>
                    <ul className="space-y-1">
                      {s.characteristics.slice(0, 2).map((c, j) => (
                        <li key={j} className="text-xs text-perle/40 font-light flex items-center gap-2">
                          <span className="w-1 h-1 bg-or rounded-full" />
                          {c}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between pt-2 mt-1">
                      {s.photoCreditUrl ? (
                        <a href={s.photoCreditUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] text-perle/25 font-light hover:text-or/40 transition-colors">
                          {s.photoCredit}
                        </a>
                      ) : (
                        <span className="text-[10px] text-perle/25 font-light">{s.photoCredit}</span>
                      )}
                      {s.photoUnsplashUrl && (
                        <a href={s.photoUnsplashUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] text-perle/20 font-light hover:text-perle/40 transition-colors">
                          Unsplash
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}