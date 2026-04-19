import { Controller, Post, Get, Query, Body, UseGuards, Req, Headers } from '@nestjs/common';
import { PairingService } from './pairing.service';
import { AuthGuard } from '@nestjs/passport';

class SuggestDto {
  mode: 'dish-to-wine' | 'wine-to-dish';
  input: string;
  occasion?: string;
  budget?: string;
  preference?: string;
}

@Controller('pairing')
export class PairingController {
  constructor(private pairingService: PairingService) {}

  @Post('suggest')
  async suggest(@Body() body: SuggestDto, @Headers('authorization') authHeader?: string) {
    let userId: string | undefined;
    if (authHeader?.startsWith('Bearer ')) {
      try {
        const payload = JSON.parse(
          Buffer.from(authHeader.split(' ')[1].split('.')[1], 'base64').toString(),
        );
        userId = payload.sub;
      } catch {}
    }
    return this.pairingService.generateSuggestions({ ...body, userId });
  }

  @Get('for-you')
  @UseGuards(AuthGuard('jwt'))
  async forYou(@Req() req: any) {
    return this.pairingService.generateForYou(req.user.userId);
  }

  @Get('discover')
  async discover(@Query('category') category?: string, @Query('region') region?: string) {
    return this.pairingService.generateDiscover(category, region);
  }
}