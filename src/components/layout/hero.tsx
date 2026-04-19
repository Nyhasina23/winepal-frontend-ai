"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-wine-deep/90 via-wine-deep/80 to-background z-0" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1920')] bg-cover bg-center opacity-20 z-0" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-heading text-6xl md:text-8xl font-light tracking-tight mb-6">
            <span className="text-wine-light">WINE</span>
            <span className="text-gold">PAL</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Votre sommelier IA personnel. Découvrez les accords mets-vins parfaits
          grâce à l'intelligence artificielle.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/pairing">
            <Button size="lg" className="bg-wine-mid hover:bg-wine-dark text-white px-8 py-6 text-lg rounded-xl">
              Trouver un accord
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button variant="outline" size="lg" className="border-gold text-gold hover:bg-gold/10 px-8 py-6 text-lg rounded-xl">
              Créer un compte
            </Button>
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground text-sm"
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-wine-mid mx-auto mb-2" />
        Défiler pour explorer
      </motion.div>
    </section>
  );
}
