"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Check, Sparkles } from "lucide-react"

function Confetti() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 200 - 100,
    delay: Math.random() * 0.5,
    duration: 1 + Math.random(),
  }))

  return (
    <>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-1.5 h-1.5 bg-or rounded-full"
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{ x: p.x, y: -150 - Math.random() * 100, opacity: 0 }}
          transition={{ delay: p.delay, duration: p.duration, ease: "easeOut" }}
        />
      ))}
    </>
  )
}

export function EmailCapture() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-bordeaux/20 via-noir to-noir" />
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="vines" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M50 0 Q60 25 50 50 Q40 75 50 100" fill="none" stroke="#C9A84C" strokeWidth="0.5" />
            <path d="M0 50 Q25 40 50 50 Q75 60 100 50" fill="none" stroke="#C9A84C" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#vines)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Sparkles className="w-8 h-8 text-or/40 mx-auto mb-4" />
          <h2 className="font-heading text-4xl md:text-5xl italic text-creme">
            Rejoignez la <span className="text-or">communauté</span>
          </h2>
          <p className="text-perle/50 mt-4 font-light max-w-md mx-auto">
            Recevez nos meilleurs accords, nos conseils de dégustation et nos offres exclusives directement dans votre boîte mail.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="mt-8 relative"
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex gap-3 max-w-md mx-auto"
              >
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-perle/30" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    className="w-full bg-white/[0.06] border border-white/[0.08] rounded-lg pl-11 pr-4 py-4 text-creme/80 placeholder:text-perle/30 focus:outline-none focus:border-or/30 transition-colors font-light text-sm"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-bordeaux hover:bg-bordeaux-light text-creme px-6 py-4 rounded-lg text-sm font-light transition-colors whitespace-nowrap"
                >
                  S'inscrire
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative inline-block"
              >
                <Confetti />
                <div className="flex items-center gap-3 text-or">
                  <Check className="w-6 h-6" />
                  <span className="font-heading text-xl italic">Bienvenue dans la communauté SOMMIA !</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </section>
  )
}
