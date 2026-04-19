import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true, _id: true })
export class Pairing extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true, enum: ['dish-to-wine', 'wine-to-dish'] })
  mode: string;

  @Prop({ required: true })
  input: string;

  @Prop()
  occasion: string;

  @Prop({ type: Object, required: true })
  result: {
    name: string;
    type: string;
    region: string;
    grape: string;
    explanation: string;
    photoUrl: string;
    photoCredit: string;
    characteristics: string[];
    badge: string;
  };

  @Prop({ default: Date.now })
  savedAt: Date;
}

export const PairingSchema = SchemaFactory.createForClass(Pairing);
