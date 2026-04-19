import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { OpenAI } from 'openai';
import { PhotosService } from '../photos/photos.service';
import { TasteProfileService } from '../taste-profile/taste-profile.service';

@Injectable()
export class PairingService {
  private groq: OpenAI;

  constructor(
    private photosService: PhotosService,
    private tasteProfileService: TasteProfileService,
  ) {
    this.groq = new OpenAI({
      apiKey: process.env.GROQ_API_KEY || '',
      baseURL: 'https://api.groq.com/openai/v1',
    });
  }

  private async callGroq(systemPrompt: string, userPrompt: string, fallbackData: any) {
    try {
      const response = await this.groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.8,
        max_tokens: 2000,
      });

      const content = response.choices?.[0]?.message?.content;
      if (!content) return fallbackData;

      const cleaned = content.replace(/^```(?:json)?\n?/gm, '').replace(/```$/gm, '').trim();
      const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
      if (!jsonMatch) return fallbackData;

      const parsed = JSON.parse(jsonMatch[0]);
      if (!parsed.suggestions || !Array.isArray(parsed.suggestions)) return fallbackData;

      const suggestions = await Promise.all(
        parsed.suggestions.map(async (s: any) => {
          const photo = await this.photosService.searchPhoto(s.searchQuery);
          return { ...s, photoUrl: photo.url, photoCredit: photo.credit, photoCreditUrl: photo.creditUrl, photoUnsplashUrl: photo.unsplashUrl, photoDownloadLocation: photo.downloadLocation };
        }),
      );

      return { suggestions };
    } catch (error: any) {
      console.warn('Groq error, using fallback:', error.message);
      return fallbackData;
    }
  }

  async generateSuggestions(data: {
    mode: 'dish-to-wine' | 'wine-to-dish';
    input: string;
    occasion?: string;
    budget?: string;
    preference?: string;
    userId?: string;
  }) {
    const systemPrompt = `Tu es SOMMIA, un sommelier expert et chef passionné avec une connaissance approfondie des accords mets-vins.

RÈGLE ABSOLUE : Retourne EXACTEMENT 3 suggestions dans un tableau JSON. Ni plus, ni moins.
Aucun texte avant ou après le JSON. Pas de markdown. Commence par { et termine par }.

Structure JSON obligatoire :
{"suggestions":[{"name":"","type":"","region":"","grape":"","explanation":"","characteristics":["","",""],"badge":"","searchQuery":""},{"name":"","type":"","region":"","grape":"","explanation":"","characteristics":["","",""],"badge":"","searchQuery":""},{"name":"","type":"","region":"","grape":"","explanation":"","characteristics":["","",""],"badge":"","searchQuery":""}]}`;

    const modeLabel = data.mode === 'dish-to-wine'
      ? `Quel vin recommanderais-tu pour accompagner ce plat : "${data.input}"`
      : `Quels plats recommanderais-tu pour accompagner ce vin : "${data.input}"`;

    const occasionStr = data.occasion ? `\nOccasion : ${data.occasion}` : '';
    const budgetStr = data.budget ? `\nBudget : ${data.budget}` : '';
    const prefStr = data.preference ? `\nPréférence : ${data.preference}` : '';

    let profileStr = '';
    if (data.userId) {
      try {
        profileStr = await this.tasteProfileService.getPromptContext(data.userId);
      } catch {}
    }

    const userPrompt = `${modeLabel}${occasionStr}${budgetStr}${prefStr}${profileStr ? '\n\n' + profileStr : ''}`;

    return this.callGroq(systemPrompt, userPrompt, this.getFallbackSuggestions(data));
  }

  async generateForYou(userId: string) {
    let profileStr = '';
    try {
      profileStr = await this.tasteProfileService.getPromptContext(userId);
    } catch {}

    if (!profileStr) {
      profileStr = "L'utilisateur n'a pas encore de profil gustatif. Propose des vins populaires et variés pour un néophyte curieux.";
    }

    const systemPrompt = `Tu es SOMMIA, un sommelier expert. Génère EXACTEMENT 4 suggestions de vins personnalisées.

RÈGLE ABSOLUE : Retourne EXACTEMENT 4 suggestions dans un tableau JSON. Ni plus, ni moins.
Aucun texte avant ou après le JSON. Pas de markdown. Commence par { et termine par }.

Structure JSON obligatoire :
{"suggestions":[{"name":"","type":"","region":"","grape":"","explanation":"","characteristics":["","",""],"badge":"","searchQuery":""}]}

Chaque suggestion doit être différente et surprendre l'utilisateur.`;

    const userPrompt = `Propose-moi 4 vins que je devrais découvrir ce soir, en tenant compte de mes goûts.\n\n${profileStr}`;

    const fallbackData = {
      suggestions: [
        { name: 'Chablis Premier Cru 2020', type: 'Vin blanc', region: 'Bourgogne', grape: 'Chardonnay', explanation: 'Un Chablis minéral et élégant, parfait pour découvrir la finesse des vins blancs bourguignons.', characteristics: ['Température: 10-12°C', 'Potentiel de garde: 5-8 ans', 'Accord: huîtres, sashimi'], badge: 'Coup de cœur', searchQuery: 'chablis white wine glass' },
        { name: 'Barolo 2019', type: 'Vin rouge', region: 'Piémont', grape: 'Nebbiolo', explanation: 'Le roi des vins italiens, avec ses arômes de rose tartrée, truffe et cerise.', characteristics: ['Température: 16-18°C', 'Potentiel de garde: 15+ ans', 'À carafer 2h'], badge: 'Exceptionnel', searchQuery: 'barolo wine bottle' },
        { name: 'Champagne Brut Réserve', type: 'Effervescent', region: 'Champagne', grape: 'Chardonnay, Pinot Noir', explanation: 'Un champagne d\'apéritif polyvalent, finesse et élégance.', characteristics: ['Température: 6-8°C', 'Millésime: non millésimé', 'Accord: apéritif, fruits de mer'], badge: 'Incontournable', searchQuery: 'champagne glass celebration' },
        { name: 'Margaux 2018', type: 'Vin rouge', region: 'Bordeaux', grape: 'Cabernet Sauvignon, Merlot', explanation: 'Un Margaux soyeux et complexe, l\'essence du Bordeaux raffiné.', characteristics: ['Température: 16-18°C', 'Potentiel de garde: 20+ ans', 'Accord: agneau, gibier'], badge: 'Prestige', searchQuery: 'margaux bordeaux wine' },
      ],
    };

    return this.callGroq(systemPrompt, userPrompt, fallbackData);
  }

  async generateDiscover(category?: string, region?: string) {
    const categoryStr = category ? `Catégorie demandée : ${category}.` : '';
    const regionStr = region ? `Région demandée : ${region}.` : '';
    const theme = categoryStr || regionStr || 'Propose une sélection variée couvrant différents styles.';

    const systemPrompt = `Tu es SOMMIA, un sommelier expert. Génère EXACTEMENT 6 suggestions de vins à découvrir.

RÈGLE ABSOLUE : Retourne EXACTEMENT 6 suggestions dans un tableau JSON. Ni plus, ni moins.
Aucun texte avant ou après le JSON. Pas de markdown. Commence par { et termine par }.

Structure JSON obligatoire :
{"suggestions":[{"name":"","type":"","region":"","grape":"","explanation":"","characteristics":["","",""],"badge":"","searchQuery":""}]}

${theme} Varie les styles, régions et prix.`;

    const userPrompt = `Fais-moi découvrir 6 vins passionnants. ${categoryStr} ${regionStr}`;

    const fallbackData = {
      suggestions: [
        { name: 'Sancerre Blanc 2022', type: 'Vin blanc', region: 'Loire', grape: 'Sauvignon Blanc', explanation: 'Un Sauvignon Blanc vif et minéral, parfait pour l\'apéritif ou les fruits de mer.', characteristics: ['Température: 8-10°C', 'Jeune et frais', 'Accord: chèvre, fruits de mer'], badge: 'Découverte', searchQuery: 'sancerre white wine bottle' },
        { name: 'Côte-Rôtie 2019', type: 'Vin rouge', region: 'Rhône', grape: 'Syrah', explanation: 'Un rouge du Nord condensé et élégant, avec des arômes de violet et épices.', characteristics: ['Température: 16-18°C', 'Garde: 10-15 ans', 'Accord: viande rouge, gibier'], badge: 'Remarquable', searchQuery: 'cote rotie rhone wine' },
        { name: 'Prosecco Superiore DOCG', type: 'Effervescent', region: 'Vénétie', grape: 'Glera', explanation: 'Un Prosecco de qualité supérieure, frais et festif.', characteristics: ['Température: 6-8°C', 'Accord: apéritif, brunch', 'Bulles fines'], badge: 'Festif', searchQuery: 'prosecco sparkling wine' },
        { name: 'Chinon 2021', type: 'Vin rouge', region: 'Loire', grape: 'Cabernet Franc', explanation: 'Un rouge léger et fruited sur des notes de poivron et framboise.', characteristics: ['Température: 14-16°C', 'Accord: volaille, charcuterie', 'Servir légèrement rafraîchi'], badge: 'Accessible', searchQuery: 'chinon loire wine' },
        { name: 'Gewurztraminer 2021', type: 'Vin blanc', region: 'Alsace', grape: 'Gewurztraminer', explanation: 'Un blanc aromatique et exubérant, rose et litchi en bouche.', characteristics: ['Température: 8-10°C', 'Accord: cuisine asiatique, fromages forts', 'Moelleux'], badge: 'Original', searchQuery: 'gewurztraminer alsace wine' },
        { name: 'Rioja Reserva 2017', type: 'Vin rouge', region: 'Rioja', grape: 'Tempranillo', explanation: 'Un rouge espagnol évolué au boisé élégant et aux tanins soyeux.', characteristics: ['Température: 16-18°C', 'Garde: 10-20 ans', 'Accord: tapas, agneau rôti'], badge: 'Classique', searchQuery: 'rioja reserva spanish wine' },
      ],
    };

    return this.callGroq(systemPrompt, userPrompt, fallbackData);
  }

  private async getFallbackSuggestions(data: {
    mode: 'dish-to-wine' | 'wine-to-dish';
    input: string;
  }) {
    const fallbacks = data.mode === 'dish-to-wine'
      ? [
          {
            name: 'Châteauneuf-du-Pape Rouge 2018',
            type: 'Vin rouge',
            region: 'Vallée du Rhône',
            grape: 'Grenache, Syrah, Mourvèdre',
            explanation: `Les arômes de garrigue et d'épices de ce Châteauneuf-du-Pape subliment parfaitement votre "${data.input}". La richesse du vin complète les saveurs du plat tout en apportant une belle complexité en bouche.`,
            characteristics: ['Température de service: 16-18°C', 'Potentiel de garde: 10 ans', 'À carafer 30 min'],
            badge: 'Accord parfait',
            searchQuery: 'chateauneuf du pape wine glass',
          },
          {
            name: 'Sancerre Blanc 2021',
            type: 'Vin blanc',
            region: 'Loire',
            grape: 'Sauvignon Blanc',
            explanation: `La fraîcheur minérale et les notes d'agrumes de ce Sancerre apportent un contraste élégant à "${data.input}". Un accord qui mise sur la complémentarité des textures.`,
            characteristics: ['Température de service: 10-12°C', 'Jeune et frais', 'Idéal en apéritif'],
            badge: 'Suggestion audacieuse',
            searchQuery: 'sancerre white wine bottle',
          },
          {
            name: 'Côtes de Provence Rosé 2022',
            type: 'Vin rosé',
            region: 'Provence',
            grape: 'Grenache, Cinsault',
            explanation: `La délicatesse de ce rosé de Provence offre un équilibre parfait avec "${data.input}". Ses notes de fruits rouges frais et sa finale saline créent une harmonie remarquable.`,
            characteristics: ['Température de service: 8-10°C', 'Légèreté et fraîcheur', 'Accord estival'],
            badge: 'Classique revisité',
            searchQuery: 'provence rose wine glass summer',
          },
        ]
      : [
          {
            name: 'Magret de canard aux cerises',
            type: 'Plat principal',
            region: 'Sud-Ouest',
            grape: 'Canard du Sud-Ouest',
            explanation: `Le magret de canard, avec sa viande riche et sa sauce aux cerises, est l'accompagnement idéal pour votre vin. Les tanins du vin coupent le gras du canard tandis que les cerises font écho aux arômes fruités.`,
            characteristics: ['Cuisson: saignant', 'Sauce aux cerises noires', 'Accompagnement: pommes grenaille'],
            badge: 'Accord parfait',
            searchQuery: 'duck breast cherry sauce gourmet',
          },
          {
            name: 'Risotto aux champignons et truffe',
            type: 'Plat principal',
            region: 'Italie du Nord',
            grape: 'Cèpes, truffe noire',
            explanation: `Les arômes terreux du risotto aux champignons résonnent avec la complexité de votre vin. La crème de parmesan apporte une onctuosité qui enveloppe les tanins.`,
            characteristics: ['Riz: Carnaroli', 'Truffe noire râpée', 'Repos: 3 min avant de servir'],
            badge: 'Suggestion audacieuse',
            searchQuery: 'mushroom truffle risotto gourmet',
          },
          {
            name: 'Plateau de fromages affinés',
            type: 'Fromage',
            region: 'France',
            grape: 'Comté, Roquefort, Brie',
            explanation: `Un plateau de fromages bien composé révèle les multiples facettes de votre vin. Le Comté apporte la noix, le Roquefort la puissance, et le Brie la douceur — chaque fromage transforme le vin différemment.`,
            characteristics: ['Température: sortie de frigo 30 min', 'Pain aux noix', 'Confiture de figues'],
            badge: 'Classique revisité',
            searchQuery: 'french cheese board wine pairing',
          },
        ];

    const suggestions = await Promise.all(
      fallbacks.map(async (s) => {
        const photo = await this.photosService.searchPhoto(s.searchQuery);
        return { ...s, photoUrl: photo.url, photoCredit: photo.credit, photoCreditUrl: photo.creditUrl, photoUnsplashUrl: photo.unsplashUrl, photoDownloadLocation: photo.downloadLocation };
      }),
    );

    return { suggestions };
  }
}
