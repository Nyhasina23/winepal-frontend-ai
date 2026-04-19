import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Pairing } from '../schemas/pairing.schema';

@Injectable()
export class CellarService {
  constructor(
    @InjectModel(Pairing.name) private pairingModel: Model<Pairing>,
  ) {}

  async findAll(userId: string) {
    return this.pairingModel
      .find({ userId: new Types.ObjectId(userId) })
      .sort({ savedAt: -1 });
  }

  async create(userId: string, data: {
    mode: string;
    input: string;
    occasion?: string;
    result: any;
  }) {
    return this.pairingModel.create({
      userId: new Types.ObjectId(userId),
      ...data,
    });
  }

  async delete(userId: string, id: string) {
    const result = await this.pairingModel.findOneAndDelete({
      _id: new Types.ObjectId(id),
      userId: new Types.ObjectId(userId),
    });
    if (!result) throw new NotFoundException('Accord non trouvé');
    return { message: 'Accord supprimé' };
  }
}
