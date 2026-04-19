import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TastingNote, TastingNoteSchema } from '../schemas/tasting-note.schema';
import { TastingNoteController } from './tasting-note.controller';
import { TastingNoteService } from './tasting-note.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TastingNote.name, schema: TastingNoteSchema }]),
    AuthModule,
  ],
  controllers: [TastingNoteController],
  providers: [TastingNoteService],
  exports: [TastingNoteService],
})
export class TastingNoteModule {}