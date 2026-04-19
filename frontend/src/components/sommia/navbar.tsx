"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Wine, ChevronDown, Menu, X, Compass, Sparkles, BookOpen, Library } from "lucide-react"

function DropdownMenu({ label, icon: Icon, items, pathname, isOpen, onToggle, onClose }: {
  label: string
  icon: React.ComponentType<{ className?: string }>
  items: { href: string; label: string; icon: React.ComponentType<{ className?: string }> }[]
  pathname: string
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isActive = items.some((item) => pathname === item.href)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={onToggle}
        className={cn(
          "flex items-center gap-1 text-sm font-light tracking-wide transition-colors duration-200 hover:text-or",
          isActive ? "text-or" : "text-perle/70"
        )}
      >
        <Icon className="w-3.5 h-3.5" />
        {label}
        <ChevronDown className={cn("w-3 h-3 transition-transform duration-200", isOpen && "rotate-180")} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-52 bg-charbon border border-white/[0.08] rounded-none shadow-xl shadow-noir/50 overflow-hidden z-50"
          >
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-2.5 px-4 py-2.5 text-sm font-light transition-colors hover:bg-white/[0.04]",
                  pathname === item.href ? "text-or" : "text-perle/60"
                )}
              >
                <item.icon className="w-3.5 h-3.5" />
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userName, setUserName] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

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

  useEffect(() => {
    setMobileOpen(false)
    setOpenDropdown(null)
  }, [pathname])

  const handleLogout = () => {
    localStorage.removeItem("sommia_token")
    localStorage.removeItem("sommia_user")
    setIsAuthenticated(false)
    setUserName(null)
    setMobileOpen(false)
    router.push("/")
    router.refresh()
  }

  const exploreItems = isAuthenticated
    ? [
        { href: "/discover", label: "Découvrir", icon: Compass },
        { href: "/for-you", label: "Pour vous", icon: Sparkles },
      ]
    : [
        { href: "/discover", label: "Découvrir", icon: Compass },
      ]

  const spaceItems = [
    { href: "/cellar", label: "Ma Cave", icon: Library },
    { href: "/tasting-notes", label: "Carnet de dégustation", icon: BookOpen },
    ...(isAdmin ? [{ href: "/admin", label: "Admin", icon: Wine }] : []),
  ]

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled || mobileOpen ? "bg-noir/95 backdrop-blur-md border-b border-white/[0.06]" : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-heading text-2xl italic tracking-wide text-or">
          SOMMIA
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          <Link
            href="/pairing"
            className={cn(
              "text-sm font-light tracking-wide transition-colors duration-200 hover:text-or",
              pathname === "/pairing" ? "text-or" : "text-perle/70"
            )}
          >
            Accords
          </Link>

          <DropdownMenu
            label="Explorer"
            icon={Compass}
            items={exploreItems}
            pathname={pathname}
            isOpen={openDropdown === "explore"}
            onToggle={() => setOpenDropdown(openDropdown === "explore" ? null : "explore")}
            onClose={() => setOpenDropdown(null)}
          />

          {isAuthenticated && (
            <DropdownMenu
              label="Mon Espace"
              icon={Library}
              items={spaceItems}
              pathname={pathname}
              isOpen={openDropdown === "space"}
              onToggle={() => setOpenDropdown(openDropdown === "space" ? null : "space")}
              onClose={() => setOpenDropdown(null)}
            />
          )}

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

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-perle/70 hover:text-or transition-colors"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-white/[0.06]"
          >
            <div className="px-6 py-4 space-y-1 bg-noir/95">
              <Link
                href="/pairing"
                className={cn(
                  "block px-3 py-2.5 text-sm font-light rounded-none transition-colors",
                  pathname === "/pairing" ? "text-or bg-or/10" : "text-perle/70 hover:text-or hover:bg-white/[0.04]"
                )}
              >
                Accords
              </Link>

              <div className="pt-2 pb-1">
                <p className="px-3 text-[10px] font-light tracking-widest uppercase text-perle/30">Explorer</p>
              </div>
              {exploreItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2.5 text-sm font-light rounded-none transition-colors",
                    pathname === item.href ? "text-or bg-or/10" : "text-perle/60 hover:text-or hover:bg-white/[0.04]"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}

              {isAuthenticated && (
                <>
                  <div className="pt-3 pb-1">
                    <p className="px-3 text-[10px] font-light tracking-widest uppercase text-perle/30">Mon Espace</p>
                  </div>
                  {spaceItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2.5 px-3 py-2.5 text-sm font-light rounded-none transition-colors",
                        pathname === item.href ? "text-or bg-or/10" : "text-perle/60 hover:text-or hover:bg-white/[0.04]"
                      )}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  ))}
                </>
              )}

              <div className="pt-3 border-t border-white/[0.06]">
                {isAuthenticated ? (
                  <div className="flex items-center justify-between px-3 py-2.5">
                    <span className="text-sm text-perle/50 font-light">{userName}</span>
                    <button
                      onClick={handleLogout}
                      className="text-sm text-perle/50 hover:text-or font-light transition-colors"
                    >
                      Déconnexion
                    </button>
                  </div>
                ) : (
                  <Link href="/auth/login" className="flex items-center gap-2 px-3 py-2.5 text-sm font-light text-or hover:text-or-light transition-colors">
                    <Wine className="w-4 h-4" />
                    Connexion
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}