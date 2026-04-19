import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Pairing, PairingSchema } from '../schemas/pairing.schema';
import { PairingController } from './pairing.controller';
import { PairingService } from './pairing.service';
import { PhotosService } from '../photos/photos.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pairing.name, schema: PairingSchema }]),
  ],
  controllers: [PairingController],
  providers: [PairingService, PhotosService],
  exports: [PairingService],
})
export class PairingModule {}
