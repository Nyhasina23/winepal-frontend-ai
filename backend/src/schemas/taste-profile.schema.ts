import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class TasteProfile extends Document {
  @Prop({ required: true, unique: true, index: true })
  userId: string;

  @Prop({
    type: {
      wineTypes: { type: [String], default: [] },
      regions: { type: [String], default: [] },
      flavors: { type: [String], default: [] },
      budget: { type: String, default: 'medium' },
      bodyPreference: { type: String, default: 'medium' },
      sweetnessPreference: { type: String, default: 'dry' },
      avoid: { type: [String], default: [] },
    },
    default: {
      wineTypes: [],
      regions: [],
      flavors: [],
      budget: 'medium',
      bodyPreference: 'medium',
      sweetnessPreference: 'dry',
      avoid: [],
    },
  })
  preferences: {
    wineTypes: string[];
    regions: string[];
    flavors: string[];
    budget: string;
    bodyPreference: string;
    sweetnessPreference: string;
    avoid: string[];
  };

  @Prop({ type: [{ pairingId: String, rating: String, createdAt: Date }], default: [] })
  ratings: { pairingId: string; rating: string; createdAt: Date }[];

  @Prop({ default: false })
  onboardingCompleted: boolean;
}

export const TasteProfileSchema = SchemaFactory.createForClass(TasteProfile);