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
      if (!content) {
        console.warn('Groq returned no content, using fallback');
        return this.getFallbackSuggestions(data);
      }

      const cleaned = content.replace(/^```(?:json)?\n?/gm, '').replace(/```$/gm, '').trim();
      const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.warn('No JSON found in Groq response, using fallback');
        console.warn('Raw response:', content.substring(0, 200));
        return this.getFallbackSuggestions(data);
      }

      const parsed = JSON.parse(jsonMatch[0]);

      if (!parsed.suggestions || !Array.isArray(parsed.suggestions)) {
        console.warn('Invalid Groq response format, using fallback');
        return this.getFallbackSuggestions(data);
      }

      const suggestions = await Promise.all(
        parsed.suggestions.map(async (s: any) => {
          const photo = await this.photosService.searchPhoto(s.searchQuery);
          return { ...s, photoUrl: photo.url, photoCredit: photo.credit };
        }),
      );

      return { suggestions };
    } catch (error: any) {
      console.warn('Groq error, using fallback:', error.message);
      return this.getFallbackSuggestions(data);
    }
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
        return { ...s, photoUrl: photo.url, photoCredit: photo.credit };
      }),
    );

    return { suggestions };
  }
}
