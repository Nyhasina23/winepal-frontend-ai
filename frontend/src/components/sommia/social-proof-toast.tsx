"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SOCIAL_PROOF_TOASTS } from "@/lib/pairings"
import { Wine } from "lucide-react"

export function SocialProofToast() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % SOCIAL_PROOF_TOASTS.length)
        setVisible(true)
      }, 500)
    }, 8000)

    // Show first toast after 3s
    setTimeout(() => setVisible(true), 3000)

    return () => clearInterval(interval)
  }, [])

  const toast = SOCIAL_PROOF_TOASTS[currentIndex]

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: -400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -400, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="fixed bottom-6 left-6 z-50 glass rounded-lg px-4 py-3 max-w-xs"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-bordeaux/40 flex items-center justify-center">
              <Wine className="w-4 h-4 text-or" />
            </div>
            <div>
              <p className="text-creme/80 text-xs font-light">
                <span className="text-or">{toast.name}</span> vient de générer un accord{" "}
                <span className="text-creme">{toast.dish}</span> →{" "}
                <span className="text-creme">{toast.wine}</span>
              </p>
              <p className="text-perle/30 text-[10px] font-light mt-0.5">{toast.time}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
