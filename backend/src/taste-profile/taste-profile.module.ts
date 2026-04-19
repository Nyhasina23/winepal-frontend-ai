import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasteProfile, TasteProfileSchema } from '../schemas/taste-profile.schema';
import { TasteProfileController } from './taste-profile.controller';
import { TasteProfileService } from './taste-profile.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TasteProfile.name, schema: TasteProfileSchema }]),
    AuthModule,
  ],
  controllers: [TasteProfileController],
  providers: [TasteProfileService],
  exports: [TasteProfileService],
})
export class TasteProfileModule {}