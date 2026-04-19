"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { shareOnInstagram, shareOnTwitter, shareOnWhatsApp, shareNative, generateShareText, captureAndDownload } from "@/lib/share"

interface ShareModalProps {
  suggestion: {
    name: string
    type: string
    region: string
    grape: string
    explanation: string
    badge: string
    photoUrl: string
    photoCredit?: string
    photoCreditUrl?: string
    photoUnsplashUrl?: string
    photoDownloadLocation?: string
  }
  input: string
  mode: string
  onClose: () => void
}

export function ShareModal({ suggestion, input, mode, onClose }: ShareModalProps) {
  const [capturing, setCapturing] = useState(false)

  const shareText = generateShareText(suggestion, input, mode)

  const handleDownload = async () => {
    setCapturing(true)
    try {
      await captureAndDownload(suggestion, input, mode)
      if (suggestion.photoDownloadLocation) {
        fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/photos/download`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ downloadLocation: suggestion.photoDownloadLocation }),
        }).catch(() => {})
      }
    } catch (err) {
      console.error("Download error:", err)
    } finally {
      setCapturing(false)
    }
  }

  const handleShareNative = async () => {
    setCapturing(true)
    try {
      await shareNative({ title: "SOMMIA — Accord Mets-Vins", text: shareText })
    } catch (err) {
      console.error("Share error:", err)
    } finally {
      setCapturing(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-noir/80 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-charbon border border-white/10 rounded-none max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-xl italic text-creme">Partager cet accord</h3>
            <button onClick={onClose} className="text-perle/40 hover:text-creme transition-colors text-xl leading-none">&times;</button>
          </div>

          <div className="bg-noir border border-white/[0.06] rounded-none overflow-hidden">
            <div className="relative h-40 overflow-hidden">
              <img src={suggestion.photoUrl} alt={suggestion.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/40 to-transparent" />
              <div className="absolute top-3 right-3">
                <span className="bg-bordeaux/90 text-creme text-xs font-light px-2 py-1 rounded-none">{suggestion.badge}</span>
              </div>
              <div className="absolute bottom-3 left-4 right-4">
                <h4 className="font-heading text-2xl italic text-creme leading-tight">{suggestion.name}</h4>
                <p className="text-perle/70 text-xs font-light mt-1">{suggestion.type} · {suggestion.region}</p>
              </div>
            </div>
            <div className="p-4 space-y-2">
              <p className="text-perle/60 text-xs font-light leading-relaxed line-clamp-3">{suggestion.explanation}</p>
              <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                <div className="flex items-center gap-2 text-xs text-perle/40">
                  <span className="w-1 h-1 bg-or rounded-full" />
                  {suggestion.grape}
                </div>
                <div className="flex items-center gap-2">
                  {suggestion.photoCreditUrl ? (
                    <a href={suggestion.photoCreditUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] text-perle/30 font-light hover:text-or/50 transition-colors">
                      {suggestion.photoCredit}
                    </a>
                  ) : (
                    <span className="text-[10px] text-perle/30 font-light">{suggestion.photoCredit}</span>
                  )}
                  {suggestion.photoUnsplashUrl && (
                    <a href={suggestion.photoUnsplashUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] text-perle/25 font-light hover:text-perle/40 transition-colors">
                      Unsplash
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-perle/40 text-xs font-light text-center">Partager sur</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => shareOnInstagram(shareText)}
                className="flex items-center justify-center gap-2 bg-[#E1306C]/10 hover:bg-[#E1306C]/20 border border-[#E1306C]/20 text-[#E1306C] py-2.5 rounded-none text-sm font-light transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                Instagram
              </button>
              <button
                onClick={() => shareOnTwitter(shareText)}
                className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-perle py-2.5 rounded-none text-sm font-light transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                X / Twitter
              </button>
              <button
                onClick={() => shareOnWhatsApp(shareText)}
                className="flex items-center justify-center gap-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/20 text-[#25D366] py-2.5 rounded-none text-sm font-light transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </button>
              <button
                onClick={handleDownload}
                disabled={capturing}
                className="flex items-center justify-center gap-2 bg-or/10 hover:bg-or/20 border border-or/20 text-or py-2.5 rounded-none text-sm font-light transition-colors disabled:opacity-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                {capturing ? "Génération..." : "Télécharger"}
              </button>
            </div>

            {"share" in navigator && (
              <button
                onClick={handleShareNative}
                disabled={capturing}
                className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-perle py-2.5 rounded-none text-sm font-light transition-colors disabled:opacity-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.51l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" /></svg>
                Partager via l&apos;appareil
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}