"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import api from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

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
    const token = localStorage.getItem("winepal_token");
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
      <main className="pt-24 pb-16 px-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-heading text-4xl font-light">
            Ma <span className="text-gold">Cave</span>
          </h1>
          <div className="flex gap-2">
            {(["all", "dish-to-wine", "wine-to-dish"] as const).map((f) => (
              <Button
                key={f}
                variant={filter === f ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilter(f)}
                className={filter === f ? "bg-wine-mid" : ""}
              >
                {f === "all" ? "Tous" : f === "dish-to-wine" ? "Vins" : "Plats"}
              </Button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-muted-foreground">Chargement...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg mb-4">Votre cave est vide</p>
            <Button onClick={() => router.push("/pairing")} className="bg-wine-mid">
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
                  <Card className="glass overflow-hidden group">
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={p.result.photoUrl}
                        alt={p.result.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="bg-wine-dark/80 text-gold text-xs">
                          {p.mode === "dish-to-wine" ? "Plat → Vin" : "Vin → Plat"}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className="font-heading text-lg font-semibold">{p.result.name}</h3>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="border-wine-mid/50 text-wine-light text-xs">
                          {p.result.type}
                        </Badge>
                        <Badge variant="outline" className="border-wine-mid/50 text-wine-light text-xs">
                          {p.result.region}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{p.result.explanation}</p>
                      <div className="flex justify-between items-center pt-2 border-t border-white/10">
                        <span className="text-xs text-muted-foreground">
                          {new Date(p.savedAt).toLocaleDateString("fr-FR")}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(p._id)}
                          className="text-red-400 hover:bg-red-400/10 text-xs"
                        >
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
      </main>
    </>
  );
}
