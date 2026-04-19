"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import api from "@/lib/api"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Sparkles, Wine, Loader2 } from "lucide-react"
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
}

export default function ForYouPage() {
  const router = useRouter()
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasProfile, setHasProfile] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("sommia_token")
    if (!token) {
      router.push("/auth/login")
      return
    }
    fetchForYou()
  }, [router])

  const fetchForYou = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await api.get("/pairing/for-you")
      setSuggestions(res.data.suggestions)
      setHasProfile(true)
    } catch (err: any) {
      if (err.response?.status === 401) {
        router.push("/auth/login")
        return
      }
      setError("Impossible de charger vos recommandations")
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
            <Sparkles className="w-6 h-6 text-or" />
            <h1 className="font-heading text-4xl italic text-creme">Pour vous</h1>
          </div>
          <p className="text-perle/50 font-light max-w-lg">
            {hasProfile
              ? "Recommandations personnalisées selon votre profil gustatif. Plus vous donnez de retours, plus elles s'affinent."
              : "Sélections inspirées pour vous. Complétez votre profil gustatif pour des recommandations sur mesure."}
          </p>
          {!hasProfile && (
            <Link
              href="/auth/onboarding"
              className="inline-block mt-3 text-or text-sm font-light hover:text-or-light transition-colors underline"
            >
              Compléter mon profil →
            </Link>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-or animate-spin" />
            <span className="ml-3 text-perle/50 font-light">SOMMIA compose vos recommandations...</span>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-400/80 font-light">{error}</p>
            <button onClick={fetchForYou} className="mt-4 text-or text-sm font-light hover:text-or-light underline">
              Réessayer
            </button>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {suggestions.map((s, i) => (
              <motion.div
                key={i}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              >
                <Card className="glass overflow-hidden group rounded-none border-white/[0.06]">
                  <div className="flex flex-col sm:flex-row">
                    <div className="relative w-full sm:w-48 h-48 sm:h-auto overflow-hidden flex-shrink-0">
                      <img
                        src={s.photoUrl}
                        alt={s.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-noir/80 hidden sm:block" />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-bordeaux/80 text-creme text-xs rounded-none font-light border-or/20">
                          <Sparkles className="w-3 h-3 mr-1" />
                          {s.badge}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-5 flex-1 space-y-3">
                      <h3 className="font-heading text-xl italic text-creme">{s.name}</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="border-white/[0.08] text-perle/50 text-xs font-light rounded-none">
                          <Wine className="w-3 h-3 mr-1" />
                          {s.type}
                        </Badge>
                        <Badge variant="outline" className="border-white/[0.08] text-perle/50 text-xs font-light rounded-none">
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