"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import api from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Star, Plus, Trash2, Edit3, Wine, X, Check, Loader2 } from "lucide-react"
import Link from "next/link"

interface TastingNote {
  _id: string
  wineName: string
  vintage?: string
  region?: string
  grape?: string
  rating: number
  color?: string
  aromas?: string[]
  notes?: string
  photoUrl?: string
  tastedAt: string
}

const WINE_COLORS = ["Rouge", "Blanc", "Rose", "Effervescent"]
const AROMA_OPTIONS = ["Fruite", "Floral", "Boise", "Epice", "Mineral", "Animal", "Vegetal", "Toast", "Lacte", "Sucré"]
const STAR_VALUES = [1, 2, 3, 4, 5]

export default function TastingNotesPage() {
  const router = useRouter()
  const [notes, setNotes] = useState<TastingNote[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState({
    wineName: "",
    vintage: "",
    region: "",
    grape: "",
    rating: 3,
    color: "",
    aromas: [] as string[],
    notes: "",
    photoUrl: "",
  })

  useEffect(() => {
    const token = localStorage.getItem("sommia_token")
    if (!token) {
      router.push("/auth/login")
      return
    }
    fetchNotes()
  }, [router])

  const fetchNotes = async () => {
    setLoading(true)
    try {
      const res = await api.get("/tasting-notes")
      setNotes(res.data)
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setForm({ wineName: "", vintage: "", region: "", grape: "", rating: 3, color: "", aromas: [], notes: "", photoUrl: "" })
    setEditingId(null)
    setShowForm(false)
  }

  const handleSave = async () => {
    if (!form.wineName.trim()) return
    setSaving(true)
    try {
      if (editingId) {
        await api.put(`/tasting-notes/${editingId}`, form)
      } else {
        await api.post("/tasting-notes", form)
      }
      await fetchNotes()
      resetForm()
    } catch {
      // ignore
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/tasting-notes/${id}`)
      setNotes(notes.filter((n) => n._id !== id))
    } catch {
      // ignore
    }
  }

  const handleEdit = (note: TastingNote) => {
    setForm({
      wineName: note.wineName,
      vintage: note.vintage || "",
      region: note.region || "",
      grape: note.grape || "",
      rating: note.rating,
      color: note.color || "",
      aromas: note.aromas || [],
      notes: note.notes || "",
      photoUrl: note.photoUrl || "",
    })
    setEditingId(note._id)
    setShowForm(true)
  }

  const toggleAroma = (aroma: string) => {
    setForm((prev) => ({
      ...prev,
      aromas: prev.aromas.includes(aroma) ? prev.aromas.filter((a) => a !== aroma) : [...prev.aromas, aroma],
    }))
  }

  return (
    <div className="min-h-screen bg-noir pt-24 pb-16 px-6">
      <div className="max-w-5xl mx-auto">
        <Link href="/" className="text-or/60 text-sm font-light hover:text-or transition-colors inline-flex items-center gap-1">
          ← Accueil
        </Link>

        <div className="mt-8 mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Wine className="w-6 h-6 text-or" />
              <h1 className="font-heading text-4xl italic text-creme">Notes de dégustation</h1>
            </div>
            <p className="text-perle/50 font-light">
              Votre carnet personnel pour mémoriser chaque vin dégusté.
            </p>
          </div>
          <Button
            onClick={() => { resetForm(); setShowForm(true) }}
            className="bg-or/10 hover:bg-or/20 border border-or/20 text-or rounded-none font-light"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Ajouter une note
          </Button>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <Card className="glass rounded-none p-6 mb-8 space-y-5 border-or/20">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-xl italic text-creme">
                    {editingId ? "Modifier la note" : "Nouvelle note de dégustation"}
                  </h3>
                  <button onClick={resetForm} className="text-perle/30 hover:text-creme transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="font-heading text-sm italic text-creme">Nom du vin *</Label>
                    <Input
                      value={form.wineName}
                      onChange={(e) => setForm({ ...form, wineName: e.target.value })}
                      placeholder="Ex: Château Margaux 2018"
                      className="bg-white/5 border-white/10 rounded-none text-perle placeholder:text-perle/30 focus:border-or/40"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-heading text-sm italic text-creme">Millésime</Label>
                    <Input
                      value={form.vintage}
                      onChange={(e) => setForm({ ...form, vintage: e.target.value })}
                      placeholder="Ex: 2018"
                      className="bg-white/5 border-white/10 rounded-none text-perle placeholder:text-perle/30 focus:border-or/40"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-heading text-sm italic text-creme">Région</Label>
                    <Input
                      value={form.region}
                      onChange={(e) => setForm({ ...form, region: e.target.value })}
                      placeholder="Ex: Bordeaux"
                      className="bg-white/5 border-white/10 rounded-none text-perle placeholder:text-perle/30 focus:border-or/40"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-heading text-sm italic text-creme">Cépage</Label>
                    <Input
                      value={form.grape}
                      onChange={(e) => setForm({ ...form, grape: e.target.value })}
                      placeholder="Ex: Cabernet Sauvignon"
                      className="bg-white/5 border-white/10 rounded-none text-perle placeholder:text-perle/30 focus:border-or/40"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="font-heading text-sm italic text-creme">Note</Label>
                  <div className="flex gap-2">
                    {STAR_VALUES.map((v) => (
                      <button
                        key={v}
                        onClick={() => setForm({ ...form, rating: v })}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-7 h-7 ${v <= form.rating ? "text-or fill-or" : "text-perle/20"}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="font-heading text-sm italic text-creme">Couleur</Label>
                  <div className="flex flex-wrap gap-2">
                    {WINE_COLORS.map((c) => (
                      <button
                        key={c}
                        onClick={() => setForm({ ...form, color: form.color === c ? "" : c })}
                        className={`px-3 py-1.5 text-xs font-light rounded-none border transition-colors ${
                          form.color === c
                            ? "bg-or/15 text-or border-or/30"
                            : "bg-white/5 text-perle/50 border-white/10 hover:border-or/30"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="font-heading text-sm italic text-creme">Arômes</Label>
                  <div className="flex flex-wrap gap-2">
                    {AROMA_OPTIONS.map((a) => (
                      <button
                        key={a}
                        onClick={() => toggleAroma(a)}
                        className={`px-3 py-1.5 text-xs font-light rounded-none border transition-colors ${
                          form.aromas.includes(a)
                            ? "bg-bordeaux/20 text-creme border-bordeaux/40"
                            : "bg-white/5 text-perle/50 border-white/10 hover:border-bordeaux/30"
                        }`}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="font-heading text-sm italic text-creme">Commentaires</Label>
                  <Textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="Vos impressions, saveurs, moments..."
                    rows={3}
                    className="bg-white/5 border-white/10 rounded-none text-perle placeholder:text-perle/30 focus:border-or/40 min-h-[80px]"
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="ghost" onClick={resetForm} className="text-perle/50 rounded-none font-light">
                    Annuler
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={saving || !form.wineName.trim()}
                    className="bg-bordeaux hover:bg-bordeaux-light text-creme rounded-none font-light"
                  >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin mr-1.5" /> : <Check className="w-4 h-4 mr-1.5" />}
                    {editingId ? "Enregistrer" : "Ajouter"}
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-or animate-spin" />
          </div>
        ) : notes.length === 0 && !showForm ? (
          <div className="text-center py-20">
            <Wine className="w-12 h-12 text-perle/20 mx-auto mb-4" />
            <p className="text-perle/40 font-light text-lg mb-2">Aucune note de dégustation</p>
            <p className="text-perle/30 font-light text-sm mb-6">Commencez à mémoriser vos vins préférés</p>
            <Button
              onClick={() => { resetForm(); setShowForm(true) }}
              className="bg-or/10 hover:bg-or/20 border border-or/20 text-or rounded-none font-light"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Première note
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {notes.map((note, i) => (
              <motion.div
                key={note._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="glass rounded-none border-white/[0.06] overflow-hidden group">
                  {note.photoUrl && (
                    <div className="h-32 overflow-hidden">
                      <img src={note.photoUrl} alt={note.wineName} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-heading text-lg italic text-creme leading-tight">{note.wineName}</h3>
                        {note.vintage && <span className="text-perle/40 text-xs font-light">{note.vintage}</span>}
                      </div>
                      <div className="flex gap-1">
                        {Array.from({ length: note.rating }).map((_, j) => (
                          <Star key={j} className="w-3.5 h-3.5 text-or fill-or" />
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                        {note.color && (
                          <span className="text-[10px] font-light px-1.5 py-0.5 bg-bordeaux/15 text-bordeaux-light border border-bordeaux/20 rounded-none">
                            {note.color}
                          </span>
                        )}
                        {note.region && (
                          <span className="text-[10px] font-light px-1.5 py-0.5 bg-white/5 text-perle/50 border border-white/[0.08] rounded-none">
                            {note.region}
                          </span>
                        )}
                        {note.grape && (
                          <span className="text-[10px] font-light px-1.5 py-0.5 bg-white/5 text-perle/50 border border-white/[0.08] rounded-none">
                            {note.grape}
                          </span>
                        )}
                      </div>
                    {note.aromas && note.aromas.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {note.aromas.map((a) => (
                          <span key={a} className="text-[10px] font-light px-1.5 py-0.5 bg-or/10 text-or/70 rounded-none">
                            {a}
                          </span>
                        ))}
                      </div>
                    )}
                    {note.notes && (
                      <p className="text-xs text-perle/40 font-light line-clamp-2">{note.notes}</p>
                    )}
                    <div className="flex justify-end gap-2 pt-2 border-t border-white/[0.06]">
                      <button onClick={() => handleEdit(note)} className="text-perle/30 hover:text-or transition-colors p-1">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDelete(note._id)} className="text-perle/30 hover:text-red-400 transition-colors p-1">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}