import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { PairingModule } from './pairing/pairing.module';
import { CellarModule } from './cellar/cellar.module';
import { TasteProfileModule } from './taste-profile/taste-profile.module';
import { TastingNoteModule } from './tasting-note/tasting-note.module';
import { User, UserSchema } from './schemas/user.schema';
import { TastingNote, TastingNoteSchema } from './schemas/tasting-note.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI') || 'mongodb://localhost:27017/winepal',
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: TastingNote.name, schema: TastingNoteSchema }]),
    AuthModule,
    PairingModule,
    CellarModule,
    TasteProfileModule,
    TastingNoteModule,
  ],
})
export class AppModule {}
