const SITE_URL = "https://sommia.vercel.app"

export async function shareOnInstagram(text: string) {
  try {
    await navigator.clipboard.writeText(text + "\n\n" + SITE_URL)
  } catch {}
  const url = "https://www.instagram.com/"
  window.open(url, "_blank", "noopener,noreferrer")
}

export function shareOnTwitter(text: string) {
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(SITE_URL)}`
  window.open(url, "_blank", "width=600,height=400,noopener,noreferrer")
}

export function shareOnWhatsApp(text: string) {
  const url = `https://wa.me/?text=${encodeURIComponent(text + "\n" + SITE_URL)}`
  window.open(url, "_blank", "noopener,noreferrer")
}

export async function shareNative(data: { title: string; text: string; url?: string }) {
  if (navigator.share) {
    try {
      await navigator.share({ ...data, url: SITE_URL })
      return true
    } catch {
      return false
    }
  }
  return false
}

export function generateShareText(suggestion: {
  name: string
  type: string
  region: string
  badge: string
}, input: string, mode: string): string {
  if (mode === "dish-to-wine") {
    return `🍷 SOMMIA me recommande « ${suggestion.name} » (${suggestion.type}, ${suggestion.region}) avec « ${input} »\n\n${suggestion.badge} ✦\n\nDécouvrez votre sommelier IA →`
  }
  return `🍽️ SOMMIA recommande « ${suggestion.name} » pour accompagner votre vin\n\n${suggestion.badge} ✦\n\nDécouvrez votre sommelier IA →`
}

export async function captureAndDownload(suggestion: {
  name: string
  type: string
  region: string
  grape: string
  explanation: string
  badge: string
  photoUrl: string
  photoCredit?: string
}, input: string, mode: string): Promise<boolean> {
  const W = 1080
  const H = 1920
  const PX = 70
  const canvas = document.createElement("canvas")
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext("2d")!

  ctx.fillStyle = "#0A0A0C"
  ctx.fillRect(0, 0, W, H)

  const bgGrad = ctx.createRadialGradient(W * 0.7, H * 0.2, 0, W * 0.5, H * 0.5, H)
  bgGrad.addColorStop(0, "rgba(107, 26, 42, 0.15)")
  bgGrad.addColorStop(1, "transparent")
  ctx.fillStyle = bgGrad
  ctx.fillRect(0, 0, W, H)

  const photoTop = 0
  const photoH = 700
  try {
    const img = new Image()
    img.crossOrigin = "anonymous"
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve()
      img.onerror = () => reject()
      img.src = suggestion.photoUrl
    })
    const scale = Math.max(W / img.width, photoH / img.height)
    const dw = img.width * scale
    const dh = img.height * scale
    ctx.save()
    ctx.beginPath()
    ctx.rect(0, 0, W, photoH)
    ctx.clip()
    ctx.drawImage(img, (W - dw) / 2, (photoH - dh) / 2, dw, dh)
    ctx.restore()
  } catch {}

  const fadeH = 300
  const fadeGrad = ctx.createLinearGradient(0, photoTop + photoH - fadeH, 0, photoTop + photoH)
  fadeGrad.addColorStop(0, "rgba(10, 10, 12, 0)")
  fadeGrad.addColorStop(1, "rgba(10, 10, 12, 1)")
  ctx.fillStyle = fadeGrad
  ctx.fillRect(0, photoTop + photoH - fadeH, W, fadeH)

  let y = photoTop + photoH + 30

  ctx.font = "600 24px Georgia, serif"
  const badgeText = suggestion.badge.toUpperCase()
  const badgeW = ctx.measureText(badgeText).width + 30
  ctx.fillStyle = "rgba(107, 26, 42, 0.85)"
  const badgeH = 36
  const badgeR = 2
  ctx.beginPath()
  ctx.moveTo(PX + badgeR, y)
  ctx.lineTo(PX + badgeW - badgeR, y)
  ctx.arcTo(PX + badgeW, y, PX + badgeW, y + badgeR, badgeR)
  ctx.lineTo(PX + badgeW, y + badgeH - badgeR)
  ctx.arcTo(PX + badgeW, y + badgeH, PX + badgeW - badgeR, y + badgeH, badgeR)
  ctx.lineTo(PX + badgeR, y + badgeH)
  ctx.arcTo(PX, y + badgeH, PX, y + badgeH - badgeR, badgeR)
  ctx.lineTo(PX, y + badgeR)
  ctx.arcTo(PX, y, PX + badgeR, y, badgeR)
  ctx.fill()
  ctx.fillStyle = "#C9A84C"
  ctx.fillText(badgeText, PX + 15, y + 26)
  y += badgeH + 28

  ctx.font = "italic 56px Georgia, serif"
  ctx.fillStyle = "#FAF6F0"
  const nameLines = wrapText(ctx, suggestion.name, W - PX * 2)
  for (const line of nameLines) {
    ctx.fillText(line, PX, y)
    y += 64
  }
  y += 10

  ctx.font = "300 26px Georgia, serif"
  ctx.fillStyle = "#BDB8B0"
  ctx.fillText(`${suggestion.type}  ·  ${suggestion.region}`, PX, y)
  y += 38

  ctx.font = "300 24px Georgia, serif"
  ctx.fillStyle = "#8B7D6B"
  ctx.fillText(`Cépage : ${suggestion.grape}`, PX, y)
  y += 50

  ctx.strokeStyle = "rgba(201, 168, 76, 0.25)"
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(PX, y)
  ctx.lineTo(W - PX, y)
  ctx.stroke()
  y += 30

  ctx.font = "300 24px Georgia, serif"
  ctx.fillStyle = "#BDB8B0"
  const explLines = wrapText(ctx, suggestion.explanation, W - PX * 2)
  const maxExplLines = 4
  for (let i = 0; i < Math.min(explLines.length, maxExplLines); i++) {
    ctx.fillText(i === maxExplLines - 1 && explLines.length > maxExplLines ? explLines[i] + "…" : explLines[i], PX, y)
    y += 36
  }
  y += 30

  ctx.font = "italic 28px Georgia, serif"
  ctx.fillStyle = "#6B1A2A"
  const inputLabel = mode === "dish-to-wine" ? "Avec :" : "Pour :"
  const inputText = `${inputLabel} ${input}`
  const inputLines = wrapText(ctx, inputText, W - PX * 2)
  for (const line of inputLines) {
    ctx.fillText(line, PX, y)
    y += 40
  }

  const footerY = H - 150

  ctx.strokeStyle = "rgba(201, 168, 76, 0.25)"
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(PX, footerY)
  ctx.lineTo(W - PX, footerY)
  ctx.stroke()

  ctx.font = "italic 38px Georgia, serif"
  ctx.fillStyle = "#C9A84C"
  ctx.textAlign = "center"
  ctx.fillText("S O M M I A", W / 2, footerY + 40)

  ctx.font = "300 20px Georgia, serif"
  ctx.fillStyle = "#BDB8B0"
  ctx.fillText("Votre sommelier IA", W / 2, footerY + 72)

  ctx.font = "300 18px Georgia, serif"
  ctx.fillStyle = "#666"
  ctx.fillText("sommia.vercel.app", W / 2, footerY + 100)

  if (suggestion.photoCredit) {
    ctx.font = "300 14px Georgia, serif"
    ctx.fillStyle = "#444"
    ctx.fillText(suggestion.photoCredit, W / 2, footerY + 124)
  }

  ctx.textAlign = "left"

  try {
    const link = document.createElement("a")
    link.download = `sommia-${suggestion.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}.png`
    link.href = canvas.toDataURL("image/png")
    link.click()
    return true
  } catch {
    return false
  }
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(" ")
  const lines: string[] = []
  let current = ""
  for (const word of words) {
    const test = current ? current + " " + word : word
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current)
      current = word
    } else {
      current = test
    }
  }
  if (current) lines.push(current)
  return lines
}