"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import api from "@/lib/api"

const STEPS = [
  {
    key: "wineTypes",
    title: "Quels types de vin préférez-vous ?",
    subtitle: "Sélectionnez tous ceux qui vous plaisent",
    options: [
      { value: "rouge", label: "Rouge", emoji: "🍷" },
      { value: "blanc", label: "Blanc", emoji: "🥂" },
      { value: "rose", label: "Rosé", emoji: "🌸" },
      { value: "effervescent", label: "Effervescent", emoji: "🫧" },
      { value: "orange", label: "Orange", emoji: "🍊" },
      { value: "dououx", label: "Doux / Moelleux", emoji: "🍯" },
    ],
    multi: true,
  },
  {
    key: "flavors",
    title: "Quelles saveurs vous attirent ?",
    subtitle: "Choisissez ce qui vous fait saliver",
    options: [
      { value: "fruité", label: "Fruité", emoji: "🍇" },
      { value: "floral", label: "Floral", emoji: "🌷" },
      { value: "épicé", label: "Épicé", emoji: "🌶️" },
      { value: "boisé", label: "Boisé", emoji: "🪵" },
      { value: "minéral", label: "Minéral", emoji: "🪨" },
      { value: "animal", label: "Animal", emoji: "🦌" },
      { value: "torréfié", label: "Torréfié", emoji: "☕" },
      { value: "herbacé", label: "Herbacé", emoji: "🌿" },
    ],
    multi: true,
  },
  {
    key: "regions",
    title: "Quelles régions vous parlent ?",
    subtitle: "Sélectionnez vos terroirs de cœur",
    options: [
      { value: "bordeaux", label: "Bordeaux", emoji: "🏰" },
      { value: "bourgogne", label: "Bourgogne", emoji: "⛪" },
      { value: "rhone", label: "Vallée du Rhône", emoji: "🌄" },
      { value: "loire", label: "Loire", emoji: "🏛️" },
      { value: "provence", label: "Provence", emoji: "☀️" },
      { value: "alsace", label: "Alsace", emoji: "🏡" },
      { value: "champagne", label: "Champagne", emoji: "🥂" },
      { value: "italie", label: "Italie", emoji: "🇮🇹" },
      { value: "espagne", label: "Espagne", emoji: "🇪🇸" },
      { value: " nouveau-monde", label: "Nouveau Monde", emoji: "🌎" },
    ],
    multi: true,
  },
  {
    key: "bodyPreference",
    title: "Quel corps de vin préférez-vous ?",
    subtitle: "Léger et frais ou puissant et charpenté ?",
    options: [
      { value: "leger", label: "Léger & frais", desc: "Vins faciles, désaltérants", emoji: "🍃" },
      { value: "medium", label: "Équilibré", desc: "Ni trop léger ni trop puissant", emoji: "⚖️" },
      { value: "charpenté", label: "Puissant & charpenté", desc: "Vins riches, complexes", emoji: "🔥" },
    ],
    multi: false,
  },
  {
    key: "sweetnessPreference",
    title: "Quelle douceur préférez-vous ?",
    subtitle: "Du plus sec au plus sucré",
    options: [
      { value: "sec", label: "Sec", desc: "Aucune douceur résiduelle", emoji: "🏜️" },
      { value: "demi-sec", label: "Demi-sec", desc: "Une touche de douceur", emoji: "🌤️" },
      { value: "moelleux", label: "Moelleux", desc: "Rond et fruité", emoji: "🍯" },
      { value: "liquoreux", label: "Liquoreux", desc: "Richement sucré", emoji: "✨" },
    ],
    multi: false,
  },
  {
    key: "avoid",
    title: "Y a-t-il des vins que vous n'aimez pas ?",
    subtitle: "Optionnel — nous les écarterons de vos suggestions",
    options: [
      { value: "tannins", label: "Tannins marqués", emoji: "😬" },
      { value: "acidité", label: "Acidité forte", emoji: "🍋" },
      { value: "alcool", label: "Alcool perceptible", emoji: "🔥" },
      { value: "sulfites", label: "Sulfites", emoji: "💊" },
      { value: "sucré", label: "Trop sucré", emoji: "🍭" },
      { value: "boisé", label: "Trop boisé", emoji: "🪵" },
    ],
    multi: true,
  },
]

type FormData = Record<string, string[] | string>

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [data, setData] = useState<FormData>({})
  const [loading, setLoading] = useState(false)

  const current = STEPS[step]
  const selectedValues = data[current.key]
    ? Array.isArray(data[current.key])
      ? data[current.key] as string[]
      : [data[current.key] as string]
    : []

  const toggle = (value: string) => {
    if (current.multi) {
      const arr = (data[current.key] as string[]) || []
      setData({
        ...data,
        [current.key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      })
    } else {
      setData({ ...data, [current.key]: value })
    }
  }

  const canContinue = current.multi
    ? ((data[current.key] as string[]) || []).length > 0
    : !!data[current.key]

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1)
    } else {
      handleSave()
    }
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      const preferences: Record<string, any> = {}
      for (const s of STEPS) {
        preferences[s.key] = data[s.key] || (s.multi ? [] : s.key === "budget" ? "medium" : "")
      }
      await api.post("/taste-profile/quiz", { preferences })
      router.push("/pairing")
    } catch (error) {
      console.error("Erreur sauvegarde profil:", error)
      router.push("/pairing")
    } finally {
      setLoading(false)
    }
  }

  const handleSkip = () => {
    router.push("/pairing")
  }

  return (
    <div className="min-h-screen bg-noir flex items-center justify-center px-4">
      <div className="noise-overlay" />
      <div className="relative z-10 w-full max-w-lg">
        <div className="text-center mb-8">
          <span className="text-or text-sm font-light tracking-widest uppercase">Profil Gustatif</span>
          <h1 className="font-heading text-3xl md:text-4xl italic text-creme mt-2">
            Votre palais, <span className="text-or">notre science</span>
          </h1>
          <p className="text-perle/50 text-sm font-light mt-3">
            {step + 1} sur {STEPS.length}
          </p>
        </div>

        <div className="w-full h-1 bg-white/10 rounded-full mb-8 overflow-hidden">
          <motion.div
            className="h-full bg-or rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.key}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="font-heading text-2xl italic text-creme text-center">{current.title}</h2>
            <p className="text-perle/50 text-sm font-light text-center">{current.subtitle}</p>

            <div className={`grid ${current.multi ? "grid-cols-2" : "grid-cols-1"} gap-3`}>
              {current.options.map((opt) => {
                const isSelected = selectedValues.includes(opt.value)
                return (
                  <motion.button
                    key={opt.value}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => toggle(opt.value)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-none border transition-all duration-200 text-left ${
                      isSelected
                        ? "bg-bordeaux/30 border-or/50 text-creme"
                        : "bg-white/[0.03] border-white/[0.08] text-perle/60 hover:border-or/30 hover:text-creme"
                    }`}
                  >
                    <span className="text-xl">{opt.emoji}</span>
                    <div>
                      <div className="font-light text-sm">{opt.label}</div>
                      {"desc" in opt && opt.desc && (
                        <div className="text-xs text-perle/40 mt-0.5">{opt.desc}</div>
                      )}
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between mt-8 gap-4">
          <button
            onClick={handleSkip}
            className="text-perle/40 hover:text-perle/70 text-sm font-light transition-colors"
          >
            Passer
          </button>

          <motion.button
            whileTap={{ scale: canContinue ? 0.97 : 1 }}
            onClick={canContinue ? handleNext : undefined}
            disabled={!canContinue || loading}
            className={`px-8 py-3 text-sm font-light rounded-none transition-all duration-200 ${
              canContinue
                ? "bg-bordeaux hover:bg-bordeaux-light text-creme relative overflow-hidden group"
                : "bg-white/5 text-perle/30 cursor-not-allowed"
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.25" />
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Enregistrement...
              </span>
            ) : step === STEPS.length - 1 ? (
              "Terminer"
            ) : (
              "Suivant"
            )}
            {canContinue && !loading && (
              <span className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </motion.button>
        </div>
      </div>
    </div>
  )
}