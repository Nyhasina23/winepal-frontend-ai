"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Loader2, Sparkles, Wine } from "lucide-react"
import { PAIRINGS } from "@/lib/pairings"
import type { Pairing } from "@/types"
import { Badge } from "@/components/ui/badge"

const colorMap: Record<string, string> = {
  rouge: "bg-bordeaux/80 text-creme",
  blanc: "bg-yellow-900/40 text-yellow-200",
  "rosé": "bg-pink-900/40 text-pink-200",
  pétillant: "bg-amber-900/40 text-amber-200",
}

const dishes = [...new Set(PAIRINGS.map((p) => p.dish))]

function AnimatedScore({ score }: { score: number }) {
  const [display, setDisplay] = useState(0)

  useState(() => {
    let current = 0
    const interval = setInterval(() => {
      current += 1
      setDisplay(current)
      if (current >= score) clearInterval(interval)
    }, 20)
    return () => clearInterval(interval)
  })

  return (
    <div className="flex items-center gap-2">
      <div className="relative w-12 h-12">
        <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
          <motion.circle
            cx="18"
            cy="18"
            r="15"
            fill="none"
            stroke="#C9A84C"
            strokeWidth="2"
            strokeDasharray={`${(display / 100) * 94.2} 94.2`}
            initial={{ strokeDasharray: "0 94.2" }}
            animate={{ strokeDasharray: `${(display / 100) * 94.2} 94.2` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-or text-xs font-heading italic">
          {display}
        </span>
      </div>
      <span className="text-perle/50 text-xs">/ 100</span>
    </div>
  )
}

export function DemoSection() {
  const [selectedDish, setSelectedDish] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<Pairing | null>(null)
  const [typedText, setTypedText] = useState("")

  const handleSelect = (dish: string) => {
    setSelectedDish(dish)
    setIsLoading(true)
    setResult(null)
    setTypedText("")

    setTimeout(() => {
      const pairing = PAIRINGS.find((p) => p.dish === dish)
      if (pairing) {
        setResult(pairing)
        setIsLoading(false)
        // Typing effect
        const text = pairing.description
        let i = 0
        const interval = setInterval(() => {
          setTypedText(text.slice(0, i + 1))
          i++
          if (i >= text.length) clearInterval(interval)
        }, 20)
      }
    }, 1500)
  }

  return (
    <section className="py-24 px-6 bg-[#110D0E]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-or text-sm font-light tracking-widest uppercase">Démonstration</span>
          <h2 className="font-heading text-4xl md:text-5xl italic text-creme mt-3">
            Essayez <span className="text-or">SOMMIA</span>
          </h2>
          <p className="text-perle/50 mt-4 font-light max-w-lg mx-auto">
            Sélectionnez un plat et laissez notre IA trouver l'accord parfait
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Dish selection */}
          <div className="space-y-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-perle/30" />
              <input
                type="text"
                placeholder="Ou décrivez votre plat..."
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg pl-12 pr-4 py-4 text-creme/80 placeholder:text-perle/30 focus:outline-none focus:border-or/30 transition-colors font-light"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {dishes.map((dish) => (
                <motion.button
                  key={dish}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSelect(dish)}
                  className={`px-4 py-2 rounded-full text-sm font-light transition-all duration-200 ${
                    selectedDish === dish
                      ? "bg-bordeaux text-creme border border-bordeaux"
                      : "bg-white/[0.04] text-perle/60 border border-white/[0.06] hover:border-or/30 hover:text-or"
                  }`}
                >
                  {dish}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right - Result */}
          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass rounded-xl p-8 h-full flex flex-col items-center justify-center text-center space-y-4"
                >
                  <Loader2 className="w-8 h-8 text-or animate-spin" />
                  <p className="text-creme/70 font-heading italic text-lg">SOMMIA analyse votre plat...</p>
                  <p className="text-perle/40 text-sm font-light">Recherche des accords parfaits</p>
                </motion.div>
              ) : result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="glass rounded-xl p-6 space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-heading text-2xl italic text-creme">{result.wine}</h3>
                      <p className="text-perle/50 text-sm font-light mt-1">{result.region}</p>
                    </div>
                    <Badge className={colorMap[result.color]}>
                      {result.color}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-perle/40">
                    <Wine className="w-4 h-4" />
                    <span>{result.grape}</span>
                    <span className="mx-1">·</span>
                    <span>{result.vintage}</span>
                  </div>

                  <p className="text-perle/70 text-sm font-light leading-relaxed typing-cursor">
                    {typedText}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                    <AnimatedScore score={result.score} />
                    <div className="text-right">
                      <p className="text-or font-heading italic text-2xl">{result.score}<span className="text-perle/40 text-sm">/100</span></p>
                      <p className="text-perle/30 text-xs font-light">Score d'accord</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass rounded-xl p-8 h-full flex flex-col items-center justify-center text-center"
                >
                  <Sparkles className="w-12 h-12 text-or/20 mb-4" />
                  <p className="text-perle/40 font-light">Sélectionnez un plat pour voir la magie opérer</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
