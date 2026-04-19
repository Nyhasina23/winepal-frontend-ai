# SOMMIA — Backend

## Concept du projet

**SOMMIA** est une application web d'accords mets-vins propulsée par l'IA qui joue le rôle de sommelier personnel. L'utilisateur décrit un plat ou un vin, et l'IA génère des recommandations personnalisées en tenant compte de son profil gustatif.

Deux modes de suggestion bidirectionnels :

- **Mode Plat → Vin** : L'utilisateur décrit un plat, SOMMIA recommande un vin qui l'accompagne parfaitement
- **Mode Vin → Plat** : L'utilisateur décrit un vin, SOMMIA suggère des plats qui le subliment

Chaque recommandation est enrichie par le **profil gustatif** de l'utilisateur (onboarding quiz en 6 étapes + feedback 👍/👎), ce qui permet à l'IA d'adapter ses suggestions au fil du temps. L'expérience est conçue comme une cave à vin digitale haut de gamme : thème sombre, accents bordeaux et or, bouteille 3D réaliste, partage social élégant.

## Description

API REST NestJS alimentant l'application SOMMIA. Gère l'authentification JWT, les recommandations IA via Groq, le quiz profil gustatif, la cave personnelle (favoris), et la recherche de photos via Unsplash. Hébergé sur Render.com (`https://winepal-backend-ai.onrender.com`), branch `sommia`.

## Stack

- **Runtime** : Node.js 20+
- **Framework** : NestJS
- **Base de données** : MongoDB Atlas via Mongoose
- **IA** : Groq API (`llama-3.3-70b-versatile`, gratuit)
- **Photos** : Unsplash API
- **Auth** : JWT + bcrypt

## Structure

```
src/
├── main.ts                        # CORS origin:true, 0.0.0.0, ValidationPipe whitelist:true
├── app.module.ts                   # Importe tous les modules
├── auth/
│   ├── auth.controller.ts          # POST /auth/register, POST /auth/login
│   ├── auth.service.ts             # bcrypt hash/compare, JWT sign/verify
│   ├── auth.module.ts              # JwtModule register
│   └── jwt.strategy.ts             # Passport JWT strategy
├── pairing/
│   ├── pairing.controller.ts       # POST /pairing/suggest (extrait userId du Bearer token, optionnel)
│   ├── pairing.service.ts          # Appel Groq API avec profil gustatif dans le prompt, fallback mock data
│   └── pairing.module.ts           # Importe TasteProfileModule
├── cellar/
│   ├── cellar.controller.ts        # GET /cellar, POST /cellar, DELETE /cellar/:id
│   ├── cellar.service.ts           # CRUD Mongoose
│   └── cellar.module.ts
├── taste-profile/
│   ├── taste-profile.controller.ts # POST /quiz, GET /me, POST /feedback, GET /prompt-context
│   ├── taste-profile.service.ts    # Quiz save, ratings, getPromptContext
│   └── taste-profile.module.ts     # Importe AuthModule
├── photos/
│   └── photos.service.ts           # Recherche Unsplash
├── common/
│   └── guards/
│       └── jwt-auth.guard.ts       # Guard JWT réutilisable
└── schemas/
    ├── user.schema.ts              # User Mongoose schema
    ├── pairing.schema.ts           # PairingResult schema
    └── taste-profile.schema.ts    # TasteProfile: userId, preferences, ratings, onboardingCompleted
```

## Conventions

- **CORS** : `origin: true` reflète l'origin de la requête (nécessaire pour credentials)
- **ValidationPipe** : `whitelist: true` supprime les propriétés non déclarées dans le DTO
- **Pairing** : Le controller accepte les deux formats `{ preferences: {...} }` et champs à plat dans le body
- **Groq** : Réponse nettoyée via `content.match(/\{[\s\S]*\}/)` avant JSON.parse
- **Branding** : Les prompts IA mentionnent "SOMMIA" (pas WinePal)

## Variables d'environnement (.env)

```env
MONGODB_URI="mongodb+srv://..."
GROQ_API_KEY="gsk_..."
JWT_SECRET="..."
UNSPLASH_ACCESS_KEY="..."
PORT=3001
```

## Commandes

```bash
npm install
npm run start:dev    # Dev avec hot reload, port 3001
npm run build
npm run start:prod
```

## Déploiement

- **Render.com** : branch `sommia`, auto-deploy on push
- URL : `https://winepal-backend-ai.onrender.com`