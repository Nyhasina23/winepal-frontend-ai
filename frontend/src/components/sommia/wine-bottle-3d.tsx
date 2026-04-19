"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Float } from "@react-three/drei"
import * as THREE from "three"

interface WineBottleProps {
  scrollProgress?: number
}

function BottleBody() {
  const geometry = useMemo(() => {
    const points: THREE.Vector2[] = []
    const p = (x: number, y: number) => points.push(new THREE.Vector2(x, y))
    p(0, -1.6)
    p(0.30, -1.6)
    p(0.34, -1.58)
    p(0.38, -1.52)
    p(0.39, -1.45)
    p(0.39, 0.0)
    p(0.39, 0.05)
    p(0.38, 0.12)
    p(0.35, 0.25)
    p(0.30, 0.40)
    p(0.24, 0.52)
    p(0.19, 0.60)
    p(0.16, 0.65)
    p(0.14, 0.72)
    p(0.12, 0.82)
    p(0.11, 0.95)
    p(0.11, 1.05)
    p(0.11, 1.12)
    p(0.11, 1.18)
    p(0.11, 1.22)
    p(0.105, 1.26)
    p(0.10, 1.30)
    p(0.10, 1.34)
    p(0, 1.34)
    return new THREE.LatheGeometry(points, 64)
  }, [])

  return (
    <mesh geometry={geometry}>
      <meshPhysicalMaterial
        color="#1a3a2a"
        transmission={0.15}
        roughness={0.03}
        metalness={0.0}
        thickness={1.2}
        ior={1.5}
        clearcoat={1}
        clearcoatRoughness={0.05}
        envMapIntensity={1.5}
        transparent
        opacity={0.92}
      />
    </mesh>
  )
}

function WineLiquid() {
  const geometry = useMemo(() => {
    const points: THREE.Vector2[] = []
    const p = (x: number, y: number) => points.push(new THREE.Vector2(x, y))
    p(0, -1.59)
    p(0.28, -1.59)
    p(0.33, -1.55)
    p(0.36, -1.48)
    p(0.37, -1.40)
    p(0.37, -0.2)
    p(0.37, -0.15)
    p(0.35, -0.05)
    p(0.31, 0.10)
    p(0.25, 0.25)
    p(0.20, 0.38)
    p(0.155, 0.48)
    p(0, 0.48)
    return new THREE.LatheGeometry(points, 64)
  }, [])

  return (
    <mesh geometry={geometry}>
      <meshPhysicalMaterial
        color="#4A1025"
        roughness={0.3}
        metalness={0.0}
        transmission={0.3}
        thickness={2}
        transparent
        opacity={0.85}
      />
    </mesh>
  )
}

function NeckFoil() {
  const geometry = useMemo(() => {
    const points: THREE.Vector2[] = []
    const p = (x: number, y: number) => points.push(new THREE.Vector2(x, y))
    p(0, 1.05)
    p(0.115, 1.05)
    p(0.118, 1.08)
    p(0.118, 1.12)
    p(0.116, 1.18)
    p(0.115, 1.22)
    p(0.113, 1.26)
    p(0.112, 1.29)
    p(0.112, 1.34)
    p(0.108, 1.37)
    p(0.098, 1.39)
    p(0.090, 1.40)
    p(0, 1.40)
    return new THREE.LatheGeometry(points, 64)
  }, [])

  return (
    <mesh geometry={geometry}>
      <meshPhysicalMaterial
        color="#C9A84C"
        roughness={0.25}
        metalness={0.85}
        clearcoat={0.5}
        envMapIntensity={2}
      />
    </mesh>
  )
}

function Cork() {
  return (
    <mesh position={[0, 1.37, 0]}>
      <cylinderGeometry args={[0.088, 0.09, 0.08, 32]} />
      <meshStandardMaterial color="#8B6914" roughness={0.95} />
    </mesh>
  )
}

function CurvedLabel({
  y, height, radius, arcLength, thetaOffset, texture,
}: {
  y: number; height: number; radius: number; arcLength: number; thetaOffset: number; texture: THREE.Texture
}) {
  const geo = useMemo(
    () => new THREE.CylinderGeometry(radius, radius, height, 64, 1, true, thetaOffset, arcLength),
    [radius, height, thetaOffset, arcLength]
  )

  return (
    <mesh position={[0, y, 0]} geometry={geo}>
      <meshStandardMaterial map={texture} transparent side={THREE.DoubleSide} />
    </mesh>
  )
}

function BottleLabel() {
  const frontTexture = useMemo(() => {
    const W = 1024
    const H = 680
    const canvas = document.createElement("canvas")
    canvas.width = W
    canvas.height = H
    const ctx = canvas.getContext("2d")!

    const bg = ctx.createLinearGradient(0, 0, 0, H)
    bg.addColorStop(0, "#F8F4EB")
    bg.addColorStop(0.5, "#F2EDE2")
    bg.addColorStop(1, "#EBE4D4")
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, W, H)

    const drawCorner = (x: number, y: number, sx: number, sy: number) => {
      ctx.strokeStyle = "#C9A84C"
      ctx.lineWidth = 2.5
      ctx.beginPath(); ctx.moveTo(x, y + 40 * sy); ctx.lineTo(x, y); ctx.lineTo(x + 40 * sx, y); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(x, y + 55 * sy); ctx.lineTo(x, y); ctx.lineTo(x + 55 * sx, y); ctx.stroke()
      ctx.lineWidth = 1
      ctx.beginPath(); ctx.moveTo(x, y + 65 * sy); ctx.lineTo(x, y); ctx.lineTo(x + 65 * sx, y); ctx.stroke()
    }
    drawCorner(30, 30, 1, 1)
    drawCorner(W - 30, 30, -1, 1)
    drawCorner(30, H - 30, 1, -1)
    drawCorner(W - 30, H - 30, -1, -1)

    ctx.strokeStyle = "#C9A84C"
    ctx.lineWidth = 1.5
    ctx.strokeRect(22, 22, W - 44, H - 44)
    ctx.lineWidth = 0.5
    ctx.strokeRect(18, 18, W - 36, H - 36)

    ctx.lineWidth = 0.8; ctx.beginPath(); ctx.moveTo(50, 240); ctx.lineTo(W - 50, 240); ctx.stroke()
    ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(200, 210); ctx.lineTo(W - 200, 210); ctx.stroke()
    ctx.lineWidth = 0.8; ctx.beginPath(); ctx.moveTo(50, 430); ctx.lineTo(W - 50, 430); ctx.stroke()
    ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(200, 460); ctx.lineTo(W - 200, 460); ctx.stroke()

    const drawOrnament = (cx: number, cy: number, s: number) => {
      ctx.save()
      ctx.strokeStyle = "#C9A84C"; ctx.lineWidth = 1.2
      for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.ellipse(cx, cy, s - i * 2, (s - i * 2) * 0.35, 0, 0, Math.PI * 2); ctx.stroke() }
      ctx.beginPath(); ctx.moveTo(cx - s, cy); ctx.lineTo(cx + s, cy); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(cx, cy - s * 0.7); ctx.lineTo(cx, cy + s * 0.7); ctx.stroke()
      for (let a = 0; a < 4; a++) { const angle = (a * Math.PI) / 2 + Math.PI / 4; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(angle) * s * 0.7, cy + Math.sin(angle) * s * 0.25); ctx.stroke() }
      ctx.beginPath(); ctx.arc(cx, cy, 2, 0, Math.PI * 2); ctx.fillStyle = "#C9A84C"; ctx.fill()
      ctx.restore()
    }
    drawOrnament(130, 160, 30)
    drawOrnament(W - 130, 160, 30)

    ctx.fillStyle = "#6B1A2A"; ctx.font = "italic 16px Georgia, serif"; ctx.textAlign = "center"
    ctx.fillText("G R A N D   C R U", 512, 105)
    ctx.fillStyle = "#2D0A14"; ctx.font = "italic 120px Georgia, 'Times New Roman', serif"; ctx.textBaseline = "middle"
    ctx.fillText("SOMMIA", 512, 175)
    ctx.fillStyle = "#8B7D6B"; ctx.font = "24px Georgia, serif"; ctx.fillText("— ◆ —", 512, 225)
    ctx.fillStyle = "#4A3F35"; ctx.font = "22px Georgia, serif"; ctx.fillText("SOMMELIER  ·  INTELLIGENCE  ARTIFICIELLE", 512, 345)
    ctx.strokeStyle = "#C9A84C"; ctx.lineWidth = 0.5; ctx.beginPath(); ctx.moveTo(320, 380); ctx.lineTo(W - 320, 380); ctx.stroke()
    ctx.fillStyle = "#555"; ctx.font = "italic 20px Georgia, serif"
    ctx.fillText("Propriétaire & Éleveur", 512, 410); ctx.fillText("MIS EN BOUTEILLE PAR SOMMIA", 512, 445)
    ctx.fillStyle = "#777"; ctx.font = "18px Georgia, serif"; ctx.fillText("MILLÉSIME  2022", 512, 490)
    ctx.strokeStyle = "#C9A84C"; ctx.lineWidth = 0.5; ctx.beginPath(); ctx.moveTo(370, 520); ctx.lineTo(W - 370, 520); ctx.stroke()
    ctx.fillStyle = "#999"; ctx.font = "14px Georgia, serif"; ctx.fillText("APPELLATION ORIGINALE CONTRÔLÉE", 512, 550)
    ctx.font = "12px Georgia, serif"; ctx.fillStyle = "#aaa"; ctx.fillText("75 cl  ·  13% vol  ·  CONTIENT DES SULFITES", 512, 580)
    ctx.strokeStyle = "#C9A84C"; ctx.lineWidth = 0.5; ctx.beginPath(); ctx.moveTo(380, 600); ctx.lineTo(W - 380, 600); ctx.stroke()
    drawOrnament(512, 640, 18)

    const tex = new THREE.CanvasTexture(canvas)
    tex.needsUpdate = true
    tex.anisotropy = 16
    tex.wrapS = THREE.ClampToEdgeWrapping
    tex.wrapT = THREE.ClampToEdgeWrapping
    return tex
  }, [])

  const backTexture = useMemo(() => {
    const W = 512
    const H = 320
    const canvas = document.createElement("canvas")
    canvas.width = W; canvas.height = H
    const ctx = canvas.getContext("2d")!
    const bg = ctx.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, "#F8F4EB"); bg.addColorStop(1, "#EBE4D4")
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H)
    ctx.strokeStyle = "#C9A84C"; ctx.lineWidth = 1.5; ctx.strokeRect(8, 8, W - 16, H - 16); ctx.lineWidth = 0.5; ctx.strokeRect(14, 14, W - 28, H - 28)
    ctx.lineWidth = 0.8; ctx.beginPath(); ctx.moveTo(50, 90); ctx.lineTo(W - 50, 90); ctx.stroke(); ctx.beginPath(); ctx.moveTo(50, 230); ctx.lineTo(W - 50, 230); ctx.stroke()
    ctx.fillStyle = "#2D0A14"; ctx.font = "italic 32px Georgia, serif"; ctx.textAlign = "center"; ctx.fillText("SOMMIA", W / 2, 60)
    ctx.fillStyle = "#888"; ctx.font = "italic 12px Georgia, serif"; ctx.fillText("SOMMELIER · INTELLIGENCE ARTIFICIELLE", W / 2, 80)
    ctx.fillStyle = "#555"; ctx.font = "13px Georgia, serif"
    ctx.fillText("PRODUIT DE FRANCE", W / 2, 120); ctx.fillText("75 cl  ·  13% vol", W / 2, 145); ctx.fillText("CONTIENT DES SULFITES", W / 2, 170)
    ctx.fillStyle = "#999"; ctx.font = "11px Georgia, serif"; ctx.fillText("DÉPÔT LÉGAL : SOMMIA SAS", W / 2, 210); ctx.fillText("— 2022 —", W / 2, 250)

    const tex = new THREE.CanvasTexture(canvas)
    tex.needsUpdate = true; tex.anisotropy = 16
    tex.wrapS = THREE.ClampToEdgeWrapping; tex.wrapT = THREE.ClampToEdgeWrapping
    return tex
  }, [])

  const B = 0.003

  return (
    <group>
      <CurvedLabel y={-0.5} height={0.50} radius={0.39 + B} arcLength={Math.PI * 1.5} thetaOffset={-Math.PI * 0.75} texture={frontTexture} />
      <CurvedLabel y={-0.5} height={0.24} radius={0.39 + B} arcLength={Math.PI * 0.9} thetaOffset={Math.PI * 0.55} texture={backTexture} />
      <GoldRing y={-0.24} radius={0.395} />
      <GoldRing y={-0.76} radius={0.395} />
    </group>
  )
}

function GoldRing({ y, radius }: { y: number; radius: number }) {
  return (
    <mesh position={[0, y, 0]}>
      <torusGeometry args={[radius, 0.004, 8, 64]} />
      <meshStandardMaterial color="#C9A84C" metalness={0.9} roughness={0.15} />
    </mesh>
  )
}

function GoldenParticles() {
  const pointsRef = useRef<THREE.Points>(null)
  const count = 150

  const positions = useMemo(() => {
    const p = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 1.8 + Math.random() * 1.5
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      p[i * 3 + 2] = r * Math.cos(phi)
    }
    return p
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#C9A84C" size={0.02} transparent opacity={0.5} sizeAttenuation />
    </points>
  )
}

function Scene() {
  const bottleRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (bottleRef.current) bottleRef.current.rotation.y += 0.002
  })

  return (
    <>
      <Float speed={1.0} rotationIntensity={0.12} floatIntensity={0.2}>
        <group ref={bottleRef} position={[1.2, -0.3, 0]}>
          <BottleBody />
          <WineLiquid />
          <NeckFoil />
          <Cork />
          <BottleLabel />
          <GoldRing y={1.22} radius={0.115} />
          <GoldRing y={0.0} radius={0.393} />
          <GoldRing y={-1.57} radius={0.34} />
        </group>
      </Float>

      <GoldenParticles />
      <ambientLight intensity={0.4} />
      <pointLight position={[-4, 3, 4]} color="#C9A84C" intensity={2.5} />
      <pointLight position={[4, 2, -3]} color="#6B1A2A" intensity={2} />
      <spotLight position={[0, 6, 4]} color="#ffffff" intensity={1.5} angle={0.3} penumbra={1} />
      <pointLight position={[0, -3, 2]} color="#2D0A14" intensity={0.5} />
      <pointLight position={[-1, -1, 4]} color="#ffffff" intensity={0.5} />
    </>
  )
}

export default function WineBottle3D({ scrollProgress = 0 }: WineBottleProps) {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 4], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent", position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
    >
      <Scene />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
    </Canvas>
  )
}