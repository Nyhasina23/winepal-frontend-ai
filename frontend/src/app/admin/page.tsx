"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import api from "@/lib/api"
import { Mail, Calendar, Shield, ArrowLeft, Users, Search } from "lucide-react"
import Link from "next/link"

interface User {
  _id: string
  email: string
  name: string
  isAdmin: boolean
  createdAt: string
}

export default function AdminPage() {
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("sommia_token")
    const userStr = localStorage.getItem("sommia_user")
    if (!token || !userStr) {
      router.push("/auth/login")
      return
    }
    try {
      const user = JSON.parse(userStr)
      if (!user.isAdmin) {
        router.push("/")
        return
      }
    } catch {
      router.push("/")
      return
    }

    fetchUsers()
  }, [router])

  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await api.get("/admin/users")
      setUsers(res.data)
    } catch (err: any) {
      if (err.response?.status === 403) {
        router.push("/")
        return
      }
      setError("Impossible de charger les utilisateurs")
    } finally {
      setLoading(false)
    }
  }

  const filtered = users.filter((u) =>
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    (u.name && u.name.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="min-h-screen bg-noir">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <Link href="/" className="text-or/60 text-sm font-light hover:text-or transition-colors inline-flex items-center gap-1">
          <ArrowLeft className="w-3 h-3" />
          Retour à l&apos;accueil
        </Link>

        <div className="mt-8 mb-10">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-6 h-6 text-or" />
            <h1 className="font-heading text-4xl italic text-creme">Administration</h1>
          </div>
          <p className="text-perle/50 font-light">
            Tableau de bord réservé aux administrateurs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="glass rounded-none p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-or/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-or" />
              </div>
              <div>
                <p className="text-creme text-2xl font-heading">{users.length}</p>
                <p className="text-perle/40 text-xs font-light">Utilisateurs inscrits</p>
              </div>
            </div>
          </div>
          <div className="glass rounded-none p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-bordeaux/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-bordeaux-light" />
              </div>
              <div>
                <p className="text-creme text-2xl font-heading">{users.filter(u => u.isAdmin).length}</p>
                <p className="text-perle/40 text-xs font-light">Administrateurs</p>
              </div>
            </div>
          </div>
          <div className="glass rounded-none p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-or/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-or" />
              </div>
              <div>
                <p className="text-creme text-2xl font-heading">
                  {users.length > 0
                    ? new Date(users[0].createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })
                    : "—"}
                </p>
                <p className="text-perle/40 text-xs font-light">Dernière inscription</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass rounded-none p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <h2 className="font-heading text-xl italic text-creme">Liste des utilisateurs</h2>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-perle/30" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-none pl-10 pr-4 py-2 text-sm text-perle font-light placeholder:text-perle/30 focus:border-or/40 focus:outline-none"
              />
            </div>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-14 bg-white/5 rounded-none animate-pulse" />
              ))}
            </div>
          ) : error ? (
            <p className="text-red-400/80 font-light text-center py-8">{error}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left text-perle/40 text-xs font-light tracking-widest uppercase pb-3 pl-4">Nom</th>
                    <th className="text-left text-perle/40 text-xs font-light tracking-widest uppercase pb-3">Email</th>
                    <th className="text-left text-perle/40 text-xs font-light tracking-widest uppercase pb-3">Rôle</th>
                    <th className="text-left text-perle/40 text-xs font-light tracking-widest uppercase pb-3 pr-4">Inscription</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((user, i) => (
                    <motion.tr
                      key={user._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="py-3.5 pl-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-bordeaux/20 flex items-center justify-center text-creme text-xs font-heading">
                            {(user.name || user.email)[0].toUpperCase()}
                          </div>
                          <span className="text-creme/90 text-sm font-light">
                            {user.name || "—"}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5">
                        <span className="text-perle/60 text-sm font-light inline-flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5" />
                          {user.email}
                        </span>
                      </td>
                      <td className="py-3.5">
                        {user.isAdmin ? (
                          <span className="text-xs font-light px-2 py-0.5 bg-or/15 text-or border border-or/25 rounded-none">
                            Admin
                          </span>
                        ) : (
                          <span className="text-xs font-light px-2 py-0.5 bg-white/5 text-perle/40 border border-white/[0.06] rounded-none">
                            Utilisateur
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 pr-4">
                        <span className="text-perle/40 text-xs font-light">
                          {new Date(user.createdAt).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <p className="text-perle/30 text-sm font-light text-center py-8">Aucun utilisateur trouvé</p>
              )}
            </div>
          )}

          <div className="mt-4 flex items-center justify-between">
            <p className="text-perle/30 text-xs font-light">
              {filtered.length} utilisateur{filtered.length !== 1 ? "s" : ""}
            </p>
            <button
              onClick={fetchUsers}
              className="text-or/60 text-xs font-light hover:text-or transition-colors"
            >
              Rafraîchir
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}