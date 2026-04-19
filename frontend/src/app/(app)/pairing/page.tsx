"use client"

import { useState } from "react"
import { Navbar } from "@/components/sommia/navbar"
import { PairingForm } from "@/components/pairing/pairing-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Wine, UtensilsCrossed, Sparkles } from "lucide-react"

export default function PairingPage() {
  const [activeTab, setActiveTab] = useState("dish-to-wine")

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 px-6 max-w-6xl mx-auto relative min-h-screen">
        <div className="noise-overlay" />
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 text-or text-sm font-light tracking-widest uppercase pulse-gold mb-4">
              <Sparkles className="w-4 h-4" />
              Intelligence Artificielle
            </span>
            <h1 className="font-heading text-4xl md:text-6xl italic text-creme mb-4">
              Moteur d'<span className="text-or">Accord</span>
            </h1>
            <p className="text-perle/60 font-light max-w-xl mx-auto leading-relaxed">
              Décrivez votre plat ou votre vin et laissez notre sommelier IA vous guider vers l'accord parfait.
            </p>
          </motion.div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 glass mb-10 rounded-none">
              <TabsTrigger
                value="dish-to-wine"
                className="data-[state=active]:bg-bordeaux/40 data-[state=active]:text-or rounded-none gap-2"
              >
                <UtensilsCrossed className="w-4 h-4" />
                Plat → Vin
              </TabsTrigger>
              <TabsTrigger
                value="wine-to-dish"
                className="data-[state=active]:bg-bordeaux/40 data-[state=active]:text-or rounded-none gap-2"
              >
                <Wine className="w-4 h-4" />
                Vin → Plat
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dish-to-wine">
              <PairingForm mode="dish-to-wine" />
            </TabsContent>

            <TabsContent value="wine-to-dish">
              <PairingForm mode="wine-to-dish" />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  )
}