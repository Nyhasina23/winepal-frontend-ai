"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import api from "@/lib/api"
import { useState } from "react"
import { Search, BookmarkPlus, BookmarkCheck, Star, MapPin, Grape, ThumbsUp, ThumbsDown } from "lucide-react"

const formSchema = z.object({
  input: z.string().min(3, "Veuillez décrire votre plat ou vin"),
  occasion: z.string().optional(),
  budget: z.string().optional(),
  preference: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

interface Suggestion {
  name: string
  type: string
  region: string
  grape: string
  explanation: string
  characteristics: string[]
  badge: string
  photoUrl: string
  photoCredit: string
  searchQuery: string
}

interface PairingFormProps {
  mode: "dish-to-wine" | "wine-to-dish"
}

export function PairingForm({ mode }: PairingFormProps) {
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [isPersonalized, setIsPersonalized] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { input: "", occasion: "", budget: "", preference: "" },
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      const res = await api.post("/pairing/suggest", { mode, ...data })
      setSuggestions(res.data.suggestions)
      const token = localStorage.getItem("sommia_token")
      if (token) {
        try {
          const profileRes = await api.get("/taste-profile/me")
          setIsPersonalized(profileRes.data?.onboardingCompleted)
        } catch {
          setIsPersonalized(false)
        }
      }
    } catch (error) {
      console.error("Erreur lors de la génération:", error)
    } finally {
      setLoading(false)
    }
  }

  const isDishToWine = mode === "dish-to-wine"

  return (
    <div className="space-y-10">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="input" className="font-heading text-lg italic text-creme">
            {isDishToWine ? "Décrivez votre plat" : "Décrivez votre vin"}
          </Label>
          <Textarea
            id="input"
            placeholder={isDishToWine ? "Ex: poulet rôti aux herbes de Provence..." : "Ex: Bourgogne Pinot Noir 2019..."}
            className="mt-2 min-h-[120px] glass rounded-none text-perle placeholder:text-perle/30 focus:border-or/40"
            {...form.register("input")}
          />
          {form.formState.errors.input && (
            <p className="text-red-400/80 text-sm mt-1 font-light">{form.formState.errors.input.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="occasion" className="text-perle/60 font-light text-sm">Occasion</Label>
            <select
              id="occasion"
              className="mt-1 w-full bg-white/5 border border-white/10 rounded-none px-3 py-2.5 text-sm text-perle font-light focus:border-or/40 focus:outline-none"
              {...form.register("occasion")}
            >
              <option value="">Sélectionner</option>
              <option value="dejeuner">Déjeuner</option>
              <option value="diner">Dîner</option>
              <option value="celebration">Célébration</option>
              <option value="aperitif">Apéritif</option>
            </select>
          </div>

          <div>
            <Label htmlFor="budget" className="text-perle/60 font-light text-sm">Budget</Label>
            <select
              id="budget"
              className="mt-1 w-full bg-white/5 border border-white/10 rounded-none px-3 py-2.5 text-sm text-perle font-light focus:border-or/40 focus:outline-none"
              {...form.register("budget")}
            >
              <option value="">Sélectionner</option>
              <option value="budget">€</option>
              <option value="medium">€€</option>
              <option value="premium">€€€</option>
            </select>
          </div>

          <div>
            <Label htmlFor="preference" className="text-perle/60 font-light text-sm">Préférence</Label>
            <select
              id="preference"
              className="mt-1 w-full bg-white/5 border border-white/10 rounded-none px-3 py-2.5 text-sm text-perle font-light focus:border-or/40 focus:outline-none"
              {...form.register("preference")}
            >
              <option value="">Sélectionner</option>
              {isDishToWine ? (
                <>
                  <option value="rouge">Rouge</option>
                  <option value="blanc">Blanc</option>
                  <option value="rose">Rosé</option>
                  <option value="effervescent">Effervescent</option>
                </>
              ) : (
                <>
                  <option value="entree">Entrée</option>
                  <option value="plat">Plat</option>
                  <option value="dessert">Dessert</option>
                  <option value="fromage">Fromage</option>
                </>
              )}
            </select>
          </div>
        </div>

        <motion.div whileTap={{ scale: 0.97 }}>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-bordeaux hover:bg-bordeaux-light text-creme py-6 text-base rounded-none relative overflow-hidden group font-light tracking-wide"
          >
            <span className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Search className="w-4 h-4" />
              {loading ? "Génération en cours..." : isDishToWine ? "Trouver le vin parfait" : "Trouver le plat parfait"}
            </span>
          </Button>
        </motion.div>
      </form>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="glass rounded-none p-4 space-y-4">
              <Skeleton className="h-48 w-full rounded-none" />
              <Skeleton className="h-6 w-3/4 rounded-none" />
              <Skeleton className="h-4 w-full rounded-none" />
              <Skeleton className="h-4 w-2/3 rounded-none" />
            </Card>
          ))}
        </div>
      )}

      {suggestions.length > 0 && !loading && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {isPersonalized && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
              <p className="text-or text-sm font-light flex items-center gap-2">
                <Star className="w-4 h-4" />
                Recommandations personnalisées selon votre profil gustatif
              </p>
            </motion.div>
          )}
          {suggestions.map((s, i) => (
            <ResultCard key={i} suggestion={s} mode={mode} input={form.getValues("input")} personalized={isPersonalized} />
          ))}
        </motion.div>
      )}
    </div>
  )
}

function ResultCard({ suggestion, mode, input, personalized }: { suggestion: Suggestion; mode: string; input: string; personalized?: boolean }) {
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<"like" | "dislike" | null>(null)
  const token = typeof window !== "undefined" ? localStorage.getItem("sommia_token") : null

  const handleSave = async () => {
    if (!token) return
    setSaveError(null)
    try {
      await api.post("/cellar", { mode, input: input || suggestion.name, result: suggestion })
      setSaved(true)
    } catch (error: any) {
      if (error.response?.status === 401) {
        setSaveError("Session expirée. Reconnectez-vous.")
        localStorage.removeItem("sommia_token")
        localStorage.removeItem("sommia_user")
      } else {
        setSaveError("Erreur lors de la sauvegarde")
      }
    }
  }

  const handleFeedback = async (rating: "like" | "dislike") => {
    setFeedback(rating)
    if (!token) return
    try {
      await api.post("/taste-profile/feedback", {
        pairingId: `${mode}-${suggestion.name}-${Date.now()}`,
        rating,
      })
    } catch {}
  }

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
    >
      <Card className="glass overflow-hidden group rounded-none border-white/[0.06] relative">
        {personalized && (
          <div className="absolute top-3 left-3 z-10">
            <span className="text-xs font-light tracking-wide px-2 py-1 bg-or/20 text-or border border-or/30 rounded-none">
              ✦ Personnalisé
            </span>
          </div>
        )}
        <div className="relative h-48 overflow-hidden">
          <img
            src={suggestion.photoUrl}
            alt={suggestion.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-noir/60 to-transparent" />
          <div className="absolute top-3 right-3">
            <Badge className="bg-bordeaux/80 text-creme text-xs rounded-none font-light border-or/20">
              <Star className="w-3 h-3 mr-1" />
              {suggestion.badge}
            </Badge>
          </div>
        </div>

        <div className="p-5 space-y-3">
          <h3 className="font-heading text-xl italic text-creme">{suggestion.name}</h3>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="border-white/[0.08] text-perle/50 text-xs font-light rounded-none gap-1">
              <Grape className="w-3 h-3" />
              {suggestion.type}
            </Badge>
            <Badge variant="outline" className="border-white/[0.08] text-perle/50 text-xs font-light rounded-none gap-1">
              <MapPin className="w-3 h-3" />
              {suggestion.region}
            </Badge>
          </div>

          <p className="text-sm text-perle/50 font-light leading-relaxed">
            {suggestion.explanation}
          </p>

          <ul className="space-y-1">
            {suggestion.characteristics.map((c, i) => (
              <li key={i} className="text-xs text-perle/40 font-light flex items-center gap-2">
                <span className="w-1 h-1 bg-or rounded-full" />
                {c}
              </li>
            ))}
          </ul>

<div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
            <span className="text-xs text-perle/20 font-light">{suggestion.photoCredit}</span>
            <div className="flex items-center gap-2">
              {token && (
                <>
                  <div className="flex items-center gap-1 mr-2">
                    <button
                      onClick={() => handleFeedback("like")}
                      className={`p-1.5 rounded-none transition-all ${feedback === "like" ? "bg-or/20 text-or" : "text-perle/30 hover:text-or"}`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleFeedback("dislike")}
                      className={`p-1.5 rounded-none transition-all ${feedback === "dislike" ? "bg-red-500/20 text-red-400" : "text-perle/30 hover:text-red-400"}`}
                    >
                      <ThumbsDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleSave}
                    disabled={saved}
                    className="text-or hover:bg-or/10 text-xs gap-1 rounded-none"
                  >
                    {saved ? <BookmarkCheck className="w-3 h-3" /> : <BookmarkPlus className="w-3 h-3" />}
                    {saved ? "Sauvegardé" : "Ma cave"}
                  </Button>
                </>
              )}
            </div>
          </div>

          {saveError && <p className="text-red-400/60 text-xs font-light">{saveError}</p>}
        </div>
      </Card>
    </motion.div>
  )
}