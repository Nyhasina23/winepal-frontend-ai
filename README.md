# WINEPAL — Accord Mets & Vins par IA

<div align="center">
  <h3>🍷 Votre sommelier IA personnel</h3>
  <p>Découvrez les accords mets-vins parfaits grâce à l'intelligence artificielle</p>
</div>

---

## Concept

WINEPAL aide les passionnés de vin à trouver les meilleurs accords grâce à l'IA.
Deux modes de suggestion bidirectionnel :

- **Mode 1 — Plat → Vin** : Décrivez un plat, recevez des recommandations de vins
- **Mode 2 — Vin → Plat** : Décrivez un vin, recevez des suggestions de plats

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Frontend | Next.js 15 App Router, React 19 |
| UI | shadcn/ui canary, Tailwind CSS v4, Framer Motion |
| Formulaires | React Hook Form + Zod |
| Data | TanStack Query v5 |
| Auth | JWT (NextAuth compatible) |
| Backend | NestJS (API REST) |
| Base de données | MongoDB Atlas via Mongoose |
| IA | OpenCode API (compatible OpenAI) |
| Photos | Unsplash API |

## Structure du projet

```
winepal/
├── frontend/          # Next.js App Router
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/    # login, register
│   │   │   ├── (app)/
│   │   │   │   ├── page.tsx          # Home / Hero
│   │   │   │   ├── pairing/page.tsx  # Moteur d'accord
│   │   │   │   └── cellar/page.tsx   # Cave personnelle
│   │   │   └── layout.tsx
│   │   └── components/
│   │       ├── pairing/   # PairingForm, ResultCard
│   │       ├── cellar/    # CellarGrid
│   │       └── layout/    # Navbar, Hero
│   └── .env.local
└── backend/           # NestJS
    ├── src/
    │   ├── auth/      # JWT, bcrypt
    │   ├── pairing/   # PairingService (appel IA)
    │   ├── cellar/    # CRUD favoris
    │   ├── photos/    # Unsplash proxy
    │   └── schemas/   # Mongoose schemas
    └── .env
```

## Installation

### Prérequis

- Node.js 20+
- MongoDB Atlas (ou local)
- Clé API OpenCode
- Clé API Unsplash (optionnelle)

### Backend

```bash
cd backend
npm install
cp .env.example .env  # Configurer les variables
npm run start:dev
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

## Variables d'environnement

### Backend (.env)

```env
MONGODB_URI="mongodb+srv://..."
OPENCODE_API_KEY="sk-..."
OPENCODE_BASE_URL="https://api.opencode.ai/v1"
UNSPLASH_ACCESS_KEY="..."
JWT_SECRET="generate-with-openssl-rand-hex-32"
PORT=3001
FRONTEND_URL="http://localhost:3000"
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL="http://localhost:3001"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-hex-32"
NEXT_PUBLIC_APP_NAME="WINEPAL"
```

## API Endpoints

| Méthode | Route | Description | Auth |
|---------|-------|-------------|------|
| POST | `/auth/register` | Inscription | Non |
| POST | `/auth/login` | Connexion | Non |
| POST | `/pairing/suggest` | Générer accord | Oui |
| GET | `/cellar` | Liste favoris | Oui |
| POST | `/cellar` | Sauvegarder | Oui |
| DELETE | `/cellar/:id` | Supprimer | Oui |

## Design

### Palette de couleurs

```
--wine-deep:    #2D0A14  # Presque noir bordeaux
--wine-dark:    #6B1A2A  # Bordeaux profond
--wine-mid:     #9B3A4A  # Rouge bordeaux
--wine-light:   #C4738A  # Rose vieilli
--wine-blush:   #F2DDE4  # Rose pâle
--gold:         #C9A84C  # Or (accents premium)
--cream:        #FAF6F0  # Blanc ivoire
--charcoal:     #1C1C1E  # Presque noir
```

### Typographie

- **Titres** : Cormorant Garamond (serif élégant)
- **Corps** : Inter (sans-serif moderne)

## Fonctionnalités

- ✅ Moteur d'accord bidirectionnel (Plat→Vin / Vin→Plat)
- ✅ Génération IA avec OpenCode API
- ✅ Photos illustratives via Unsplash
- ✅ Authentification JWT
- ✅ Cave personnelle (CRUD favoris)
- ✅ Animations Framer Motion
- ✅ Glassmorphism UI
- ✅ Design responsive

## License

MIT
