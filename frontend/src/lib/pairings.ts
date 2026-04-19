import type { Pairing, FAQItem, PricingPlan, Testimonial, SocialProofToast } from "@/types"

export const PAIRINGS: Pairing[] = [
  {
    dish: "Saumon grillé",
    wine: "Chablis Premier Cru",
    region: "Bourgogne, France",
    grape: "Chardonnay",
    vintage: 2020,
    score: 95,
    description: "La minéralité cristalline du Chablis sublime la richesse du saumon, créant un équilibre parfait entre la fraîcheur du vin et les huiles du poisson.",
    color: "blanc",
    searchQuery: "chablis wine salmon",
  },
  {
    dish: "Agneau rôti",
    wine: "Châteauneuf-du-Pape",
    region: "Vallée du Rhône, France",
    grape: "Grenache, Syrah",
    vintage: 2018,
    score: 97,
    description: "La puissance aromatique de ce Châteauneuf épouse les épices de l'agneau. Les tanins fondus enveloppent la viande avec une élégance remarquable.",
    color: "rouge",
    searchQuery: "chateauneuf du pape lamb",
  },
  {
    dish: "Risotto aux truffes",
    wine: "Barolo Riserva",
    region: "Piémont, Italie",
    grape: "Nebbiolo",
    vintage: 2016,
    score: 96,
    description: "Les arômes de rose et de goudron du Barolo dialoguent magnifiquement avec la terre de la truffe. Un accord d'une profondeur inouïe.",
    color: "rouge",
    searchQuery: "barolo truffle risotto",
  },
  {
    dish: "Plateau de fromages",
    wine: "Sauternes",
    region: "Bordeaux, France",
    grape: "Sémillon, Sauvignon",
    vintage: 2017,
    score: 94,
    description: "La douceur miellée du Sauternes contraste divinement avec le sel et le caractère des fromages affinés. L'accord sucré-salé par excellence.",
    color: "blanc",
    searchQuery: "sauternes cheese board",
  },
  {
    dish: "Foie gras",
    wine: "Tokaji Aszú 5 Puttonyos",
    region: "Tokaj, Hongrie",
    grape: "Furmint, Hárslevelű",
    vintage: 2015,
    score: 98,
    description: "Le nectar doré de Tokaj est l'accompagnement historique du foie gras. L'acidité vive du Furmint coupe le gras tandis que les arômes de coing enchant.",
    color: "blanc",
    searchQuery: "tokaji foie gras",
  },
  {
    dish: "Tiramisu",
    wine: "Vin Santo del Chianti",
    region: "Toscane, Italie",
    grape: "Trebbiano, Malvasia",
    vintage: 2014,
    score: 92,
    description: "Les notes de noix et de miel du Vin Santo résonnent avec le café du tiramisu. Un accord italien d'une harmonie parfaite.",
    color: "blanc",
    searchQuery: "vin santo tiramisu",
  },
  {
    dish: "Homard thermidor",
    wine: "Meursault Premier Cru",
    region: "Bourgogne, France",
    grape: "Chardonnay",
    vintage: 2019,
    score: 96,
    description: "Le beurre noisette et les arômes de brioche du Meursault épousent la richesse de la sauce thermidor. Un accord de haute gastronomie.",
    color: "blanc",
    searchQuery: "meursault lobster",
  },
  {
    dish: "Magret de canard",
    wine: "Madiran",
    region: "Sud-Ouest, France",
    grape: "Tannat",
    vintage: 2017,
    score: 94,
    description: "La structure tannique puissante du Madiran est l'allié idéal du canard. Les arômes de fruits noirs et d'épices complètent la sauce aux cerises.",
    color: "rouge",
    searchQuery: "madiran duck breast",
  },
]

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Comment fonctionne SOMMIA ?",
    answer: "SOMMIA utilise une intelligence artificielle spécialisée en œnologie et gastronomie. Décrivez simplement votre plat ou votre vin, et notre IA analyse les arômes, textures et profils gustatifs pour vous proposer l'accord parfait.",
  },
  {
    question: "L'IA est-elle vraiment experte en vin ?",
    answer: "Notre modèle a été entraîné sur des milliers de références œnologiques, les guides des meilleurs sommeliers du monde, et les bases de données de Wine Spectator et Robert Parker. Les résultats sont comparables à ceux d'un sommelier certifié.",
  },
  {
    question: "Puis-je sauvegarder mes accords préférés ?",
    answer: "Oui ! Créez un compte gratuit et accédez à votre Cave personnelle où tous vos accords sont sauvegardés. Vous pouvez les retrouver, les organiser et les partager facilement.",
  },
  {
    question: "Quels types de vins sont couverts ?",
    answer: "SOMMIA couvre plus de 200 cépages et toutes les régions viticoles du monde : France, Italie, Espagne, Californie, Australie, Argentine, et bien d'autres. Rouges, blancs, rosés, effervescents et vins doux naturels.",
  },
  {
    question: "Le service est-il gratuit ?",
    answer: "L'accès de base est gratuit et illimité. Le plan Gourmet offre des fonctionnalités avancées : recommandations personnalisées, notes de dégustation détaillées, et accès prioritaire aux nouvelles fonctionnalités.",
  },
]

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "DÉCOUVERTE",
    price: 0,
    annualPrice: 0,
    description: "Pour explorer l'univers des accords",
    features: [
      "Accords illimités",
      "3 suggestions par recherche",
      "Photos illustratives",
      "Sauvegarde dans la cave",
    ],
    cta: "Commencer gratuitement",
  },
  {
    name: "GOURMET",
    price: 9.99,
    annualPrice: 7.99,
    description: "Pour les passionnés exigeants",
    features: [
      "Tout le plan Découverte",
      "Notes de dégustation détaillées",
      "Recommandations personnalisées",
      "Accès prioritaire aux nouveautés",
      "Export PDF de vos accords",
      "Support dédié",
    ],
    highlighted: true,
    cta: "Devenir Gourmet",
  },
  {
    name: "SOMMELIER",
    price: 24.99,
    annualPrice: 19.99,
    description: "Pour les professionnels",
    features: [
      "Tout le plan Gourmet",
      "API access",
      "Accords pour événements",
      "Carte des vins personnalisée",
      "Formation œnologie incluse",
      "Multi-utilisateurs (5 max)",
    ],
    cta: "Contacter l'équipe",
  },
]

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Marie Dupont",
    role: "Amatrice de vin, Paris",
    quote: "SOMMIA m'a fait découvrir des accords que je n'aurais jamais imaginés. Le Chablis avec le saumon, c'était extraordinaire !",
    avatar: "👩‍🦰",
  },
  {
    name: "Jean-Pierre Martin",
    role: "Chef cuisinier, Lyon",
    quote: "J'utilise SOMMIA au quotidien pour inspirer mes accords mets-vins. La précision des recommandations est bluffante.",
    avatar: "👨‍🍳",
  },
  {
    name: "Sophie Laurent",
    role: "Sommelière, Bordeaux",
    quote: "Même en tant que professionnelle, je trouve des pépites grâce à SOMMIA. C'est un outil formidable pour élargir ses horizons.",
    avatar: "👩‍💼",
  },
]

export const SOCIAL_PROOF_TOASTS: SocialProofToast[] = [
  { name: "Marie", dish: "Saumon", wine: "Chablis", time: "il y a 2 min" },
  { name: "Pierre", dish: "Agneau", wine: "Châteauneuf-du-Pape", time: "il y a 5 min" },
  { name: "Sophie", dish: "Risotto", wine: "Barolo", time: "il y a 8 min" },
  { name: "Luc", dish: "Foie gras", wine: "Sauternes", time: "il y a 12 min" },
  { name: "Claire", dish: "Homard", wine: "Meursault", time: "il y a 15 min" },
]
