# SOMMIA — Frontend

## Concept du projet

**SOMMIA** est une application web d'accords mets-vins propulsée par l'IA qui joue le rôle de sommelier personnel. L'utilisateur décrit un plat ou un vin, et l'IA génère des recommandations personnalisées en tenant compte de son profil gustatif.

Deux modes de suggestion bidirectionnels :

- **Mode Plat → Vin** : L'utilisateur décrit un plat, SOMMIA recommande un vin qui l'accompagne parfaitement
- **Mode Vin → Plat** : L'utilisateur décrit un vin, SOMMIA suggère des plats qui le subliment

Chaque recommandation est enrichie par le **profil gustatif** de l'utilisateur (onboarding quiz en 6 étapes + feedback 👍/👎), ce qui permet à l'IA d'adapter ses suggestions au fil du temps. L'expérience est conçue comme une cave à vin digitale haut de gamme : thème sombre, accents bordeaux et or, bouteille 3D réaliste, partage social élégant.

## Description

Interface web Next.js pour SOMMIA. Landing page immersive avec bouteille 3D réaliste (Three.js LatheGeometry), moteur d'accords mets-vins avec recommandations IA, quiz profil gustatif en 6 étapes, cave personnelle, et partage social (Instagram, Twitter, WhatsApp, téléchargement PNG 1080×1920, Web Share API). Design luxueux de cave à vin haut de gamme. Déployé sur Vercel (`https://sommia.vercel.app`), branch `sommia`.

## Stack

- **Framework** : Next.js 15 App Router, React 19
- **Style** : Tailwind CSS v4, couleurs custom via `@theme inline` dans `globals.css`
- **Animations** : Framer Motion
- **3D** : Three.js via @react-three/fiber + @react-three/drei
- **UI** : shadcn/ui canary
- **Auth** : JWT stocké dans `localStorage` sous la clé `sommia_token`
- **HTTP** : Axios (`src/lib/api.ts`)

## Design

- **Thème** : Sombre, luxueux, sensoriel
- **Accents** : Bordeaux `#6B1A2A`, Or `#C9A84C`
- **Typographie** : Cormorant Garamond italic/titres (`font-heading`), Lato corps
- **Effets** : Glassmorphism, grain, animations Framer Motion

## Structure

```
src/
├── app/
│   ├── layout.tsx                    # Fonts Cormorant Garamond + Lato, metadata SOMMIA
│   ├── globals.css                   # Palette @theme inline, glassmorphism utilities
│   ├── page.tsx                      # Landing page avec lazy loading des sections
│   ├── (app)/
│   │   ├── pairing/page.tsx          # Moteur d'accords mets-vins
│   │   └── cellar/page.tsx           # Cave personnelle
│   └── auth/
│       ├── login/page.tsx            # Connexion
│       ├── register/page.tsx         # Inscription → redirige vers /auth/onboarding
│       └── onboarding/page.tsx       # Quiz profil gustatif en 6 étapes
├── components/
│   ├── sommia/
│   │   ├── wine-bottle-3d.tsx        # ⚠️ NE PAS MODIFIER — bouteille 3D figée
│   │   │                               LatheGeometry 64 segments, étiquettes CylinderGeometry courbées
│   │   │                               Capsule dorée, vin, bouchon, particules dorées
│   │   ├── hero-section.tsx          # IntersectionObserver pour décharger Canvas quand hors vue
│   │   ├── share-modal.tsx          # Partage : Instagram, Twitter, WhatsApp, téléchargement PNG, Web Share API
│   │   ├── demo-section.tsx
│   │   ├── navbar.tsx
│   │   ├── pricing-section.tsx
│   │   ├── showcase-section.tsx
│   │   ├── faq-section.tsx
│   │   ├── email-capture.tsx
│   │   ├── footer.tsx
│   │   ├── scroll-reveal.tsx
│   │   └── social-proof-toast.tsx
│   ├── pairing/
│   │   └── pairing-form.tsx          # Formulaire + résultats + feedback 👍/👎 + badge personnalisé
│   └── ui/                           # shadcn/ui components (button, card, input, etc.)
├── lib/
│   ├── api.ts                        # Axios avec intercepteur sommia_token
│   ├── share.ts                      # shareOnInstagram (clipboard + ouvre instagram.com),
│   │                                   shareOnTwitter, shareOnWhatsApp, shareNative,
│   │                                   generateShareText, captureAndDownload (canvas manuel 1080×1920)
│   ├── pairings.ts                   # Mock data fallback
│   ├── providers.tsx                 # Providers wrapping
│   └── utils.ts                      # shadcn cn() utility
└── types/
    └── index.ts                      # TypeScript interfaces
```

## Conventions

- **Bouteille 3D** (`wine-bottle-3d.tsx`) : NE PAS MODIFIER — figée et fonctionnelle
- **Lazy loading** : Sections below-the-fold via `next/dynamic`, Canvas déchargé via IntersectionObserver
- **Couleurs custom** : Déclarées dans `globals.css` via `@theme inline { --color-bordeaux: ... }`, utilisables directement dans Tailwind (`bg-bordeaux`, `text-or`, etc.)
- **Auth token** : Clé `sommia_token` dans localStorage
- **Partage Instagram** : Pas d'API web → copie texte dans presse-papier + ouvre instagram.com
- **Partage PNG** : Canvas manuel 1080×1920 (html2canvas inutilisable avec images cross-origin)

## Pages et routes

| Route | Description |
|-------|-------------|
| `/` | Landing page (hero, demo, showcase, pricing, FAQ, email capture) |
| `/pairing` | Moteur d'accords mets-vins avec formulaire |
| `/cellar` | Cave personnelle (favoris) |
| `/auth/login` | Connexion |
| `/auth/register` | Inscription |
| `/auth/onboarding` | Quiz profil gustatif en 6 étapes |

## Commandes

```bash
npm install
npm run dev          # Dev server, port 3000
npm run build        # Production build (Next.js 16 + Turbopack)
npm run start        # Start production server
```

## Déploiement

- **Vercel** : branch `sommia`, auto-deploy on push
- URL : `https://sommia.vercel.app`

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Heed deprecation, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->