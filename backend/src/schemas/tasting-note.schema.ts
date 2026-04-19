import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class TastingNote extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  wineName: string;

  @Prop()
  vintage: string;

  @Prop()
  region: string;

  @Prop()
  grape: string;

  @Prop({ min: 1, max: 5 })
  rating: number;

  @Prop()
  color: string;

  @Prop([String])
  aromas: string[];

  @Prop()
  notes: string;

  @Prop()
  photoUrl: string;

  @Prop({ default: Date.now })
  tastedAt: Date;
}

export const TastingNoteSchema = SchemaFactory.createForClass(TastingNote);