"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Mail, Send, CheckCircle, ArrowLeft } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setError(null)
    try {
      const res = await fetch("https://formspree.io/f/mqewbvpg", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _subject: `[SOMMIA] ${formData.subject}`,
        }),
      })
      if (res.ok) {
        setSent(true)
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        setError("Une erreur est survenue. Veuillez réessayer ou nous contacter directement par e-mail.")
      }
    } catch {
      setError("Impossible d&apos;envoyer le message. Vérifiez votre connexion.")
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-noir">
      <div className="max-w-4xl mx-auto px-6 py-24">
        <Link href="/" className="text-or/60 text-sm font-light hover:text-or transition-colors inline-flex items-center gap-1">
          <ArrowLeft className="w-3 h-3" />
          Retour à l&apos;accueil
        </Link>

        <h1 className="font-heading text-4xl italic text-creme mt-8 mb-3">Contactez-nous</h1>
        <p className="text-perle/50 font-light mb-12 max-w-lg">
          Une question, une suggestion ou un retour d&apos;expérience ? Nous serions ravis de vous entendre.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-6">
            <Card className="glass rounded-none p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-or/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-or" />
                </div>
                <div>
                  <p className="text-creme text-sm font-light">E-mail</p>
                  <a
                    href="mailto:nyhasina.finaritra@gmail.com"
                    className="text-or text-sm font-light hover:text-or-light transition-colors"
                  >
                    nyhasina.finaritra@gmail.com
                  </a>
                </div>
              </div>
            </Card>

            <Card className="glass rounded-none p-6 space-y-3">
              <h3 className="font-heading text-lg italic text-creme">Réponse rapide</h3>
              <p className="text-perle/50 text-sm font-light leading-relaxed">
                Nous nous efforçons de répondre sous 24 à 48 heures ouvrées.
              </p>
            </Card>

            <Card className="glass rounded-none p-6 space-y-3">
              <h3 className="font-heading text-lg italic text-creme">Liens utiles</h3>
              <div className="space-y-2">
                <Link href="/confidentialite" className="block text-perle/40 text-sm font-light hover:text-or transition-colors">
                  Politique de confidentialité
                </Link>
                <Link href="/conditions" className="block text-perle/40 text-sm font-light hover:text-or transition-colors">
                  Conditions générales d&apos;utilisation
                </Link>
              </div>
            </Card>
          </div>

          <div className="md:col-span-3">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-none p-8 text-center space-y-4"
              >
                <CheckCircle className="w-12 h-12 text-or mx-auto" />
                <h3 className="font-heading text-2xl italic text-creme">Message envoyé !</h3>
                <p className="text-perle/60 font-light">
                  Merci pour votre message. Nous vous répondrons dans les plus brefs délais.
                </p>
                <Button
                  onClick={() => setSent(false)}
                  className="bg-or/10 hover:bg-or/20 text-or border border-or/20 rounded-none font-light"
                >
                  Envoyer un autre message
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-heading text-sm italic text-creme">
                      Nom
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-white/5 border-white/10 rounded-none text-perle placeholder:text-perle/30 focus:border-or/40"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-heading text-sm italic text-creme">
                      E-mail
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="bg-white/5 border-white/10 rounded-none text-perle placeholder:text-perle/30 focus:border-or/40"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="font-heading text-sm italic text-creme">
                    Sujet
                  </Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="bg-white/5 border-white/10 rounded-none text-perle placeholder:text-perle/30 focus:border-or/40"
                    placeholder="De quoi souhaitez-vous parler ?"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="font-heading text-sm italic text-creme">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className="bg-white/5 border-white/10 rounded-none text-perle placeholder:text-perle/30 focus:border-or/40 min-h-[150px]"
                    placeholder="Décrivez votre demande..."
                  />
                </div>

                {error && (
                  <p className="text-red-400/80 text-sm font-light">{error}</p>
                )}

                <motion.div whileTap={{ scale: 0.97 }}>
                  <Button
                    type="submit"
                    disabled={sending}
                    className="w-full bg-bordeaux hover:bg-bordeaux-light text-creme py-6 text-base rounded-none relative overflow-hidden group font-light tracking-wide"
                  >
                    <span className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" />
                      {sending ? "Envoi en cours..." : "Envoyer le message"}
                    </span>
                  </Button>
                </motion.div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}