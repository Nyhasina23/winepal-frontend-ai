"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import api from "@/lib/api";
import { useState } from "react";

const formSchema = z.object({
  input: z.string().min(3, "Veuillez décrire votre plat ou vin"),
  occasion: z.string().optional(),
  budget: z.string().optional(),
  preference: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface Suggestion {
  name: string;
  type: string;
  region: string;
  grape: string;
  explanation: string;
  characteristics: string[];
  badge: string;
  photoUrl: string;
  photoCredit: string;
  searchQuery: string;
}

interface PairingFormProps {
  mode: "dish-to-wine" | "wine-to-dish";
}

export function PairingForm({ mode }: PairingFormProps) {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
      occasion: "",
      budget: "",
      preference: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await api.post("/pairing/suggest", {
        mode,
        ...data,
      });
      setSuggestions(res.data.suggestions);
    } catch (error) {
      console.error("Erreur lors de la génération:", error);
    } finally {
      setLoading(false);
    }
  };

  const isDishToWine = mode === "dish-to-wine";

  return (
    <div className="space-y-8">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="input" className="text-lg font-heading">
            {isDishToWine ? "Décrivez votre plat" : "Décrivez votre vin"}
          </Label>
          <Textarea
            id="input"
            placeholder={
              isDishToWine
                ? "Ex: poulet rôti aux herbes de Provence..."
                : "Ex: Bourgogne Pinot Noir 2019..."
            }
            className="mt-2 min-h-[120px] glass"
            {...form.register("input")}
          />
          {form.formState.errors.input && (
            <p className="text-red-400 text-sm mt-1">{form.formState.errors.input.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="occasion">Occasion</Label>
            <select
              id="occasion"
              className="mt-1 w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm"
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
            <Label htmlFor="budget">Budget</Label>
            <select
              id="budget"
              className="mt-1 w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm"
              {...form.register("budget")}
            >
              <option value="">Sélectionner</option>
              <option value="budget">€</option>
              <option value="medium">€€</option>
              <option value="premium">€€€</option>
            </select>
          </div>

          <div>
            <Label htmlFor="preference">Préférence</Label>
            <select
              id="preference"
              className="mt-1 w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm"
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

        <motion.div whileTap={{ scale: 0.95 }}>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-wine-mid hover:bg-wine-dark text-white py-6 text-lg rounded-xl"
          >
            {loading ? "Génération en cours..." : isDishToWine ? "Trouver le vin parfait" : "Trouver le plat parfait"}
          </Button>
        </motion.div>
      </form>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="glass p-4 space-y-4">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </Card>
          ))}
        </div>
      )}

      {suggestions.length > 0 && !loading && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {suggestions.map((s, i) => (
            <ResultCard key={i} suggestion={s} mode={mode} input={form.getValues("input")} />
          ))}
        </motion.div>
      )}
    </div>
  );
}

function ResultCard({ suggestion, mode, input }: { suggestion: Suggestion; mode: string; input: string }) {
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const token = typeof window !== "undefined" ? localStorage.getItem("winepal_token") : null;

  const handleSave = async () => {
    if (!token) return;
    setSaveError(null);
    try {
      await api.post("/cellar", {
        mode,
        input: input || suggestion.name,
        result: suggestion,
      });
      setSaved(true);
    } catch (error: any) {
      if (error.response?.status === 401) {
        setSaveError("Session expirée. Reconnectez-vous.");
        localStorage.removeItem("winepal_token");
        localStorage.removeItem("winepal_user");
      } else {
        setSaveError("Erreur lors de la sauvegarde");
      }
    }
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <Card className="glass overflow-hidden group">
        <div className="relative h-48 overflow-hidden">
          <img
            src={suggestion.photoUrl}
            alt={suggestion.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-3 right-3">
            <Badge
              variant="secondary"
              className="bg-wine-dark/80 text-gold border-gold/30"
            >
              {suggestion.badge}
            </Badge>
          </div>
        </div>

        <div className="p-5 space-y-3">
          <h3 className="font-heading text-xl font-semibold">{suggestion.name}</h3>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="border-wine-mid/50 text-wine-light">
              {suggestion.type}
            </Badge>
            <Badge variant="outline" className="border-wine-mid/50 text-wine-light">
              {suggestion.region}
            </Badge>
            <Badge variant="outline" className="border-wine-mid/50 text-wine-light">
              {suggestion.grape}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {suggestion.explanation}
          </p>

          <ul className="space-y-1">
            {suggestion.characteristics.map((c, i) => (
              <li key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                <span className="w-1 h-1 bg-gold rounded-full" />
                {c}
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <span className="text-xs text-muted-foreground">{suggestion.photoCredit}</span>
            {token && (
              <Button
                size="sm"
                variant="ghost"
                onClick={handleSave}
                disabled={saved}
                className="text-gold hover:bg-gold/10 text-xs"
              >
                {saved ? "Sauvegardé ✓" : "Sauvegarder dans ma cave"}
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
