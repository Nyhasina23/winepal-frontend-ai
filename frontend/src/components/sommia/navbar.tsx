"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Wine } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userName, setUserName] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  useEffect(() => {
    const token = localStorage.getItem("sommia_token")
    const userStr = localStorage.getItem("sommia_user")
    if (token) {
      setIsAuthenticated(true)
      try {
        const user = JSON.parse(userStr || "{}")
        setUserName(user.name || null)
        setIsAdmin(!!user.isAdmin)
      } catch { /* ignore */ }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("sommia_token")
    localStorage.removeItem("sommia_user")
    setIsAuthenticated(false)
    setUserName(null)
    router.push("/")
    router.refresh()
  }

  const links = [
    { href: "/", label: "Accueil" },
    { href: "/pairing", label: "Accords" },
    ...(isAuthenticated ? [{ href: "/cellar", label: "Ma Cave" }] : []),
    ...(isAdmin ? [{ href: "/admin", label: "Admin" }] : []),
  ]

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-noir/80 backdrop-blur-md border-b border-white/[0.06]" : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-heading text-2xl italic tracking-wide text-or">
          SOMMIA
        </Link>

        <div className="flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-light tracking-wide transition-colors duration-200 hover:text-or",
                pathname === link.href ? "text-or" : "text-perle/70"
              )}
            >
              {link.label}
            </Link>
          ))}

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-perle/60">{userName}</span>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-sm text-perle/60 hover:text-or">
                Déconnexion
              </Button>
            </div>
          ) : (
            <Link href="/auth/login">
              <Button
                variant="ghost"
                size="sm"
                className="border border-bordeaux/50 text-creme/90 hover:bg-bordeaux/20 hover:text-creme text-sm"
              >
                <Wine className="w-4 h-4 mr-1.5" />
                Connexion
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </motion.header>
  )
}
