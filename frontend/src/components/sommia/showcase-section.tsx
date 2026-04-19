"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { PAIRINGS } from "@/lib/pairings"
import { Badge } from "@/components/ui/badge"

const colorMap: Record<string, string> = {
  rouge: "bg-bordeaux/80 text-creme",
  blanc: "bg-yellow-900/40 text-yellow-200",
  "rosé": "bg-pink-900/40 text-pink-200",
  pétillant: "bg-amber-900/40 text-amber-200",
}

const emojiMap: Record<string, string> = {
  "Saumon grillé": "🐟",
  "Agneau rôti": "🍖",
  "Risotto aux truffes": "🍚",
  "Plateau de fromages": "🧀",
  "Foie gras": "🪿",
  Tiramisu: "🍰",
  "Homard thermidor": "🦞",
  "Magret de canard": "🦆",
}

export function ShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollXProgress } = useScroll({ container: containerRef })

  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-or text-sm font-light tracking-widest uppercase"
        >
          Nos accords
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-4xl md:text-5xl italic text-creme mt-3"
        >
          Accords <span className="text-or">d'exception</span>
        </motion.h2>
      </div>

      <div ref={containerRef} className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-6 pb-4 scrollbar-hide" style={{ scrollbarWidth: "none" }}>
        {PAIRINGS.map((pairing, i) => (
          <motion.div
            key={pairing.dish}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="snap-center shrink-0 w-72 glass rounded-xl p-6 space-y-4 hover:bg-white/[0.06] transition-colors cursor-pointer group"
          >
            <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
              {emojiMap[pairing.dish]}
            </div>
            <div>
              <h3 className="font-heading text-xl italic text-creme">{pairing.dish}</h3>
              <p className="text-perle/40 text-sm font-light mt-1">→ {pairing.wine}</p>
            </div>
            <div className="flex items-center justify-between">
              <Badge className={colorMap[pairing.color]}>{pairing.color}</Badge>
              <div className="flex items-center gap-1">
                <svg className="w-8 h-8 -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
                  <motion.circle
                    cx="18"
                    cy="18"
                    r="15"
                    fill="none"
                    stroke="#C9A84C"
                    strokeWidth="2"
                    initial={{ strokeDasharray: "0 94.2" }}
                    whileInView={{ strokeDasharray: `${(pairing.score / 100) * 94.2} 94.2` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </svg>
                <span className="text-or text-xs font-heading italic">{pairing.score}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="max-w-6xl mx-auto px-6 mt-4"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        style={{ originX: 0 }}
      >
        <div className="h-0.5 bg-white/[0.06] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-or/40 rounded-full"
            style={{ scaleX: scrollXProgress }}
          />
        </div>
      </motion.div>
    </section>
  )
}
