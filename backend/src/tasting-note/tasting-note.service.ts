import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TastingNote } from '../schemas/tasting-note.schema';

@Injectable()
export class TastingNoteService {
  constructor(
    @InjectModel(TastingNote.name) private noteModel: Model<TastingNote>,
  ) {}

  async create(userId: string, data: Partial<TastingNote>): Promise<TastingNote> {
    return this.noteModel.create({ userId, ...data });
  }

  async findByUser(userId: string): Promise<TastingNote[]> {
    return this.noteModel.find({ userId }).sort({ tastedAt: -1 }).lean();
  }

  async findById(id: string, userId: string): Promise<TastingNote> {
    const note = await this.noteModel.findOne({ _id: id, userId });
    if (!note) throw new NotFoundException('Note de dégustation introuvable');
    return note;
  }

  async update(id: string, userId: string, data: Partial<TastingNote>): Promise<TastingNote> {
    const note = await this.noteModel.findOneAndUpdate(
      { _id: id, userId },
      { $set: data },
      { new: true },
    );
    if (!note) throw new NotFoundException('Note de dégustation introuvable');
    return note;
  }

  async delete(id: string, userId: string): Promise<void> {
    const result = await this.noteModel.deleteOne({ _id: id, userId });
    if (result.deletedCount === 0) throw new NotFoundException('Note de dégustation introuvable');
  }
}