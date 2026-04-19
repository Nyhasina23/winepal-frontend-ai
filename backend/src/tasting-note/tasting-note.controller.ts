import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TastingNoteService } from './tasting-note.service';

@Controller('tasting-notes')
@UseGuards(AuthGuard('jwt'))
export class TastingNoteController {
  constructor(private noteService: TastingNoteService) {}

  @Get()
  async findAll(@Req() req: any) {
    return this.noteService.findByUser(req.user.userId);
  }

  @Post()
  async create(@Req() req: any, @Body() body: any) {
    return this.noteService.create(req.user.userId, body);
  }

  @Put(':id')
  async update(@Req() req: any, @Param('id') id: string, @Body() body: any) {
    return this.noteService.update(id, req.user.userId, body);
  }

  @Delete(':id')
  async remove(@Req() req: any, @Param('id') id: string) {
    return this.noteService.delete(id, req.user.userId);
  }
}