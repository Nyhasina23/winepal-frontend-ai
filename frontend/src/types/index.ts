export interface Pairing {
  dish: string
  wine: string
  region: string
  grape: string
  vintage: number
  score: number
  description: string
  color: "rouge" | "blanc" | "rosé" | "pétillant"
  searchQuery: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface PricingPlan {
  name: string
  price: number
  annualPrice: number
  description: string
  features: string[]
  highlighted?: boolean
  cta: string
}

export interface Testimonial {
  name: string
  role: string
  quote: string
  avatar: string
}

export interface SocialProofToast {
  name: string
  dish: string
  wine: string
  time: string
}
