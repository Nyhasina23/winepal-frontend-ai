"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wine } from "lucide-react";
import api from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("sommia_token", res.data.access_token);
      localStorage.setItem("sommia_user", JSON.stringify(res.data.user));
      router.push("/");
      router.refresh();
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div className="noise-overlay" />
      <div className="absolute inset-0 bg-gradient-to-br from-bordeaux/10 via-noir to-noir" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link href="/" className="font-heading text-4xl italic text-or">
            SOMMIA
          </Link>
          <div className="flex items-center justify-center gap-2 mt-2 text-perle/30 text-sm font-light">
            <Wine className="w-3 h-3" />
            Sommelier IA
          </div>
        </div>

        <div className="glass rounded-xl p-8 space-y-6">
          <h1 className="font-heading text-2xl italic text-creme text-center">Connexion</h1>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-perle/60 text-sm font-light">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                className="mt-1 bg-white/[0.04] border-white/[0.08] text-creme/80 placeholder:text-perle/30 focus:border-or/30 rounded-none"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-perle/60 text-sm font-light">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1 bg-white/[0.04] border-white/[0.08] text-creme/80 placeholder:text-perle/30 focus:border-or/30 rounded-none"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-bordeaux hover:bg-bordeaux-light text-creme py-5 rounded-none relative overflow-hidden group"
            >
              <span className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10">{loading ? "Connexion..." : "Se connecter"}</span>
            </Button>
          </form>

          <p className="text-center text-sm text-perle/40 font-light">
            Pas encore de compte ?{" "}
            <Link href="/auth/register" className="text-or hover:underline">
              Créer un compte
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
