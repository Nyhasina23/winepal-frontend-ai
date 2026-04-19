"use client"

import dynamic from "next/dynamic"
import { Navbar } from "@/components/sommia/navbar"
import { HeroSection } from "@/components/sommia/hero-section"
import { ScrollReveal } from "@/components/sommia/scroll-reveal"
import { useScroll, motion } from "framer-motion"

const DemoSection = dynamic(() => import("@/components/sommia/demo-section").then(m => ({ default: m.DemoSection })), { ssr: false })
const ShowcaseSection = dynamic(() => import("@/components/sommia/showcase-section").then(m => ({ default: m.ShowcaseSection })), { ssr: false })
const PricingSection = dynamic(() => import("@/components/sommia/pricing-section").then(m => ({ default: m.PricingSection })), { ssr: false })
const EmailCapture = dynamic(() => import("@/components/sommia/email-capture").then(m => ({ default: m.EmailCapture })), { ssr: false })
const FAQSection = dynamic(() => import("@/components/sommia/faq-section").then(m => ({ default: m.FAQSection })), { ssr: false })
const Footer = dynamic(() => import("@/components/sommia/footer").then(m => ({ default: m.Footer })), { ssr: false })
const SocialProofToast = dynamic(() => import("@/components/sommia/social-proof-toast").then(m => ({ default: m.SocialProofToast })), { ssr: false })

export default function HomePage() {
  const { scrollYProgress } = useScroll()

  return (
    <>
      <motion.div className="progress-bar" style={{ scaleX: scrollYProgress }} />
      <Navbar />
      <main className="relative">
        <HeroSection />
        <ScrollReveal><div id="demo"><DemoSection /></div></ScrollReveal>
        <ScrollReveal><ShowcaseSection /></ScrollReveal>
        <ScrollReveal><PricingSection /></ScrollReveal>
        <ScrollReveal><EmailCapture /></ScrollReveal>
        <ScrollReveal><FAQSection /></ScrollReveal>
      </main>
      <Footer />
      <SocialProofToast />
    </>
  )
}