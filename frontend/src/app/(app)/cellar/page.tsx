"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/sommia/navbar";
import api from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Wine, Trash2 } from "lucide-react";

interface Pairing {
  _id: string;
  mode: string;
  input: string;
  result: {
    name: string;
    type: string;
    region: string;
    explanation: string;
    photoUrl: string;
    characteristics: string[];
  };
  savedAt: string;
}

export default function CellarPage() {
  const router = useRouter();
  const [pairings, setPairings] = useState<Pairing[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "dish-to-wine" | "wine-to-dish">("all");

  useEffect(() => {
    const token = localStorage.getItem("sommia_token");
    if (!token) {
      router.push("/auth/login");
      return;
    }
    fetchPairings();
  }, [router]);

  const fetchPairings = async () => {
    try {
      const res = await api.get("/cellar");
      setPairings(res.data);
    } catch (error) {
      console.error("Erreur chargement cave:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/cellar/${id}`);
      setPairings((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Erreur suppression:", error);
    }
  };

  const filtered = pairings.filter((p) => filter === "all" || p.mode === filter);

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 px-6 max-w-6xl mx-auto relative min-h-screen">
        <div className="noise-overlay" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="text-or text-sm font-light tracking-widest uppercase">Collection</span>
              <h1 className="font-heading text-4xl md:text-5xl italic text-creme mt-1">
                Ma <span className="text-or">Cave</span>
              </h1>
            </div>
            <div className="flex gap-2">
              {(["all", "dish-to-wine", "wine-to-dish"] as const).map((f) => (
                <Button
                  key={f}
                  variant="ghost"
                  size="sm"
                  onClick={() => setFilter(f)}
                  className={`text-xs font-light tracking-wide rounded-none transition-all ${
                    filter === f
                      ? "bg-bordeaux/40 text-or border border-or/20"
                      : "text-perle/40 hover:text-creme border border-transparent"
                  }`}
                >
                  {f === "all" ? "Tous" : f === "dish-to-wine" ? "Vins" : "Plats"}
                </Button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="text-perle/30 text-center py-20 font-light">Chargement...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <Wine className="w-12 h-12 text-or/20 mx-auto mb-4" />
              <p className="text-perle/40 text-lg font-light mb-6">Votre cave est vide</p>
              <Button onClick={() => router.push("/pairing")} className="bg-bordeaux hover:bg-bordeaux-light text-creme rounded-none px-8">
                Découvrir des accords
              </Button>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filtered.map((p) => (
                  <motion.div
                    key={p._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <Card className="glass overflow-hidden group rounded-none border-white/[0.06]">
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={p.result.photoUrl}
                          alt={p.result.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-noir/60 to-transparent" />
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-bordeaux/80 text-creme text-xs rounded-none font-light">
                            {p.mode === "dish-to-wine" ? "Plat → Vin" : "Vin → Plat"}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-5 space-y-3">
                        <h3 className="font-heading text-xl italic text-creme">{p.result.name}</h3>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="border-white/[0.08] text-perle/50 text-xs font-light rounded-none">
                            {p.result.type}
                          </Badge>
                          <Badge variant="outline" className="border-white/[0.08] text-perle/50 text-xs font-light rounded-none">
                            {p.result.region}
                          </Badge>
                        </div>
                        <p className="text-xs text-perle/40 font-light leading-relaxed line-clamp-2">
                          {p.result.explanation}
                        </p>
                        <div className="flex justify-between items-center pt-3 border-t border-white/[0.06]">
                          <span className="text-xs text-perle/20 font-light">
                            {new Date(p.savedAt).toLocaleDateString("fr-FR")}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(p._id)}
                            className="text-perle/30 hover:text-red-400 hover:bg-red-400/5 text-xs gap-1"
                          >
                            <Trash2 className="w-3 h-3" />
                            Supprimer
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </main>
    </>
  );
}
