import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TasteProfile } from '../schemas/taste-profile.schema';

@Injectable()
export class TasteProfileService {
  constructor(
    @InjectModel(TasteProfile.name) private profileModel: Model<TasteProfile>,
  ) {}

  async saveQuiz(
    userId: string,
    data: {
      wineTypes?: string[];
      regions?: string[];
      flavors?: string[];
      budget?: string;
      bodyPreference?: string;
      sweetnessPreference?: string;
      avoid?: string[];
    },
  ) {
    const existing = await this.profileModel.findOne({ userId });

    if (existing) {
      existing.preferences = {
        ...existing.preferences,
        ...data,
      };
      existing.onboardingCompleted = true;
      return existing.save();
    }

    return this.profileModel.create({
      userId,
      preferences: {
        wineTypes: data.wineTypes || [],
        regions: data.regions || [],
        flavors: data.flavors || [],
        budget: data.budget || 'medium',
        bodyPreference: data.bodyPreference || 'medium',
        sweetnessPreference: data.sweetnessPreference || 'dry',
        avoid: data.avoid || [],
      },
      onboardingCompleted: true,
    });
  }

  async getProfile(userId: string) {
    const profile = await this.profileModel.findOne({ userId });
    if (!profile) {
      return {
        userId,
        preferences: {
          wineTypes: [],
          regions: [],
          flavors: [],
          budget: 'medium',
          bodyPreference: 'medium',
          sweetnessPreference: 'dry',
          avoid: [],
        },
        ratings: [],
        onboardingCompleted: false,
      };
    }
    return profile;
  }

  async ratePairing(userId: string, pairingId: string, rating: 'like' | 'dislike') {
    const profile = await this.profileModel.findOneAndUpdate(
      { userId },
      { $pull: { ratings: { pairingId } } },
      { new: true },
    );

    const updated = await this.profileModel.findOneAndUpdate(
      { userId },
      {
        $push: {
          ratings: { pairingId, rating, createdAt: new Date() },
        },
      },
      { new: true, upsert: true },
    );

    return {
      pairingId,
      rating,
      profile: updated,
    };
  }

  async getPromptContext(userId: string): Promise<string> {
    const profile = await this.profileModel.findOne({ userId });
    if (!profile || !profile.onboardingCompleted) return '';

    const p = profile.preferences;
    const parts: string[] = [];

    if (p.wineTypes.length > 0) {
      parts.push(`Types de vins préférés : ${p.wineTypes.join(', ')}`);
    }
    if (p.regions.length > 0) {
      parts.push(`Régions préférées : ${p.regions.join(', ')}`);
    }
    if (p.flavors.length > 0) {
      parts.push(`Arômes appréciés : ${p.flavors.join(', ')}`);
    }
    if (p.avoid.length > 0) {
      parts.push(`À éviter absolument : ${p.avoid.join(', ')}`);
    }
    if (p.budget) {
      parts.push(`Budget : ${p.budget}`);
    }
    if (p.bodyPreference) {
      parts.push(`Corps préféré : ${p.bodyPreference}`);
    }
    if (p.sweetnessPreference) {
      parts.push(`Douceur préférée : ${p.sweetnessPreference}`);
    }

    const likedRatings = profile.ratings.filter((r) => r.rating === 'like');
    const dislikedRatings = profile.ratings.filter((r) => r.rating === 'dislike');

    if (likedRatings.length > 0) {
      parts.push(`L'utilisateur a aimé ${likedRatings.length} de ses précédents accords`);
    }
    if (dislikedRatings.length > 0) {
      parts.push(`L'utilisateur n'a pas aimé ${dislikedRatings.length} de ses précédents accords`);
    }

    return parts.length > 0
      ? `PROFIL GUSTATIF DE L'UTILISATEUR (personnalise les recommandations) :\n${parts.join('\n')}`
      : '';
  }
}