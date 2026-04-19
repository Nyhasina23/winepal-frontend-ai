"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("winepal_token");
    const userStr = localStorage.getItem("winepal_user");
    if (token) {
      setIsAuthenticated(true);
      try {
        const user = JSON.parse(userStr || "{}");
        setUserName(user.name || null);
      } catch { /* ignore */ }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("winepal_token");
    localStorage.removeItem("winepal_user");
    setIsAuthenticated(false);
    setUserName(null);
    router.push("/");
    router.refresh();
  };

  const links = [
    { href: "/", label: "Accueil" },
    { href: "/pairing", label: "Accords" },
    ...(isAuthenticated ? [{ href: "/cellar", label: "Ma Cave" }] : []),
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-heading text-xl font-semibold tracking-wide">
          <span className="text-wine-light">WINE</span>
          <span className="text-gold">PAL</span>
        </Link>

        <div className="flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm transition-colors hover:text-gold",
                pathname === link.href ? "text-gold" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">{userName}</span>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-sm">
                Déconnexion
              </Button>
            </div>
          ) : (
            <Link href="/auth/login">
              <Button variant="outline" size="sm" className="border-wine-mid text-wine-light hover:bg-wine-dark">
                Connexion
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
