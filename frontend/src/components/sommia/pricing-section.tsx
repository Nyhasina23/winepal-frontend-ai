"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PRICING_PLANS } from "@/lib/pairings"

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <section className="py-24 px-6 bg-[#110D0E]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-or text-sm font-light tracking-widest uppercase">Tarifs</span>
          <h2 className="font-heading text-4xl md:text-5xl italic text-creme mt-3">
            Choisissez votre <span className="text-or">expérience</span>
          </h2>

          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm font-light ${!isAnnual ? "text-creme" : "text-perle/40"}`}>Mensuel</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-12 h-6 rounded-full transition-colors ${isAnnual ? "bg-bordeaux" : "bg-white/10"}`}
            >
              <motion.div
                className="absolute top-0.5 w-5 h-5 rounded-full bg-or"
                animate={{ x: isAnnual ? 26 : 2 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            </button>
            <span className={`text-sm font-light ${isAnnual ? "text-creme" : "text-perle/40"}`}>
              Annuel <span className="text-or text-xs">-20%</span>
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRICING_PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative rounded-xl p-6 space-y-6 ${
                plan.highlighted
                  ? "bg-white/[0.06] border border-or/30 scale-105"
                  : "glass"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-or text-noir text-xs font-medium px-3 py-1 rounded-full">
                    ★ Le plus populaire
                  </span>
                </div>
              )}

              <div>
                <h3 className="font-heading text-xl italic text-creme tracking-widest">{plan.name}</h3>
                <p className="text-perle/40 text-sm font-light mt-1">{plan.description}</p>
              </div>

              <div>
                <span className="font-heading text-4xl italic text-or">
                  {isAnnual ? plan.annualPrice : plan.price === 0 ? "Gratuit" : `${plan.price}€`}
                </span>
                {plan.price > 0 && (
                  <span className="text-perle/30 text-sm font-light">/mois</span>
                )}
              </div>

              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-perle/60 font-light">
                    <Check className="w-4 h-4 text-or shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full rounded-none py-5 text-sm ${
                  plan.highlighted
                    ? "bg-bordeaux hover:bg-bordeaux-light text-creme"
                    : "bg-white/[0.06] hover:bg-white/[0.1] text-creme/80 border border-white/[0.08]"
                }`}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
