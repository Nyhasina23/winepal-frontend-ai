"use client"

import { useRef, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown, Sparkles } from "lucide-react"

const WineBottle3D = dynamic(() => import("@/components/sommia/wine-bottle-3d"), {
  ssr: false,
  loading: () => null,
})

const stats = [
  { value: "98%", label: "de satisfaction" },
  { value: "50 000+", label: "accords générés" },
  { value: "200+", label: "cépages couverts" },
]

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(true)
  const { scrollY } = useScroll()
  const scrollProgress = useTransform(scrollY, [0, 800], [0, 1])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "100px" }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden" data-hero-section>
      <div className="noise-overlay" />
      <div className="absolute inset-0 bg-gradient-to-br from-bordeaux/10 via-noir to-noir" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-bordeaux/5 rounded-full blur-3xl" />

      {isVisible && (
        <div className="absolute inset-0 z-[1] pointer-events-none lg:pointer-events-auto">
          <WineBottle3D scrollProgress={scrollProgress.get()} />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20 pb-32">
        <div className="max-w-xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
            className="space-y-8"
          >
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <span className="inline-flex items-center gap-2 text-or text-sm font-light tracking-widest uppercase pulse-gold">
                <Sparkles className="w-4 h-4" />
                Sommelier IA
                <Sparkles className="w-4 h-4" />
              </span>
            </motion.div>

            <motion.h1
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              className="font-heading text-5xl md:text-7xl lg:text-8xl italic leading-[0.9] text-creme"
            >
              L'Art de
              <br />
              l'Accord
              <br />
              <span className="text-or">Parfait</span>
            </motion.h1>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="text-perle/70 text-lg font-light leading-relaxed max-w-md"
            >
              Découvrez les accords mets-vins les plus raffinés grâce à notre intelligence artificielle.
              Votre sommelier personnel, disponible à chaque instant.
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/pairing">
                <Button
                  size="lg"
                  className="bg-bordeaux hover:bg-bordeaux-light text-creme px-8 py-6 text-base rounded-none relative overflow-hidden group"
                >
                  <span className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative z-10">Découvrir les accords</span>
                </Button>
              </Link>
              <Link href="#demo">
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-perle/70 hover:text-or px-8 py-6 text-base gap-2"
                >
                  Voir une démo
                  <ArrowDown className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-0 right-0 z-10"
      >
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.15 }}
              className="glass rounded-lg px-6 py-4 text-center"
            >
              <div className="font-heading text-2xl md:text-3xl italic text-or">{stat.value}</div>
              <div className="text-perle/50 text-xs font-light tracking-wide mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-28 left-1/2 -translate-x-1/2 text-perle/30 text-xs"
      >
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-or/30 mx-auto mb-2" />
      </motion.div>
    </section>
  )
}