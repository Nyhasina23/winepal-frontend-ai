import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Pairing, PairingSchema } from '../schemas/pairing.schema';
import { CellarController } from './cellar.controller';
import { CellarService } from './cellar.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pairing.name, schema: PairingSchema }]),
    AuthModule,
  ],
  controllers: [CellarController],
  providers: [CellarService],
  exports: [CellarService],
})
export class CellarModule {}
