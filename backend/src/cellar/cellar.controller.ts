import { Controller, Get, Post, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { CellarService } from './cellar.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('cellar')
export class CellarController {
  constructor(private cellarService: CellarService) {}

  @Get()
  async findAll(@Request() req) {
    return this.cellarService.findAll(req.user.userId);
  }

  @Post()
  async create(@Request() req, @Body() body: any) {
    return this.cellarService.create(req.user.userId, body);
  }

  @Delete(':id')
  async delete(@Request() req, @Param('id') id: string) {
    return this.cellarService.delete(req.user.userId, id);
  }
}
