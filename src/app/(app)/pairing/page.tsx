"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { PairingForm } from "@/components/pairing/pairing-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

export default function PairingPage() {
  const [activeTab, setActiveTab] = useState("dish-to-wine");

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="font-heading text-4xl md:text-5xl font-light mb-3">
            Moteur d'<span className="text-gold">Accord</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Décrivez votre plat ou votre vin et laissez l'IA vous guider vers l'accord parfait.
          </p>
        </motion.div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 glass mb-8">
            <TabsTrigger value="dish-to-wine" className="data-[state=active]:bg-wine-mid/30 data-[state=active]:text-gold">
              Plat → Vin
            </TabsTrigger>
            <TabsTrigger value="wine-to-dish" className="data-[state=active]:bg-wine-mid/30 data-[state=active]:text-gold">
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
      </main>
    </>
  );
}
