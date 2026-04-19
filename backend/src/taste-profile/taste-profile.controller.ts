import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TasteProfileService } from './taste-profile.service';

@Controller('taste-profile')
export class TasteProfileController {
  constructor(private readonly tasteProfileService: TasteProfileService) {}

  @Post('quiz')
  @UseGuards(AuthGuard('jwt'))
  async saveQuiz(
    @Req() req: any,
    @Body() body: {
      preferences?: {
        wineTypes?: string[];
        regions?: string[];
        flavors?: string[];
        budget?: string;
        bodyPreference?: string;
        sweetnessPreference?: string;
        avoid?: string[];
      };
      wineTypes?: string[];
      regions?: string[];
      flavors?: string[];
      budget?: string;
      bodyPreference?: string;
      sweetnessPreference?: string;
      avoid?: string[];
    },
  ) {
    const userId = req.user.userId;
    const data = body.preferences || body;
    return this.tasteProfileService.saveQuiz(userId, {
      wineTypes: data.wineTypes,
      regions: data.regions,
      flavors: data.flavors,
      budget: data.budget,
      bodyPreference: data.bodyPreference,
      sweetnessPreference: data.sweetnessPreference,
      avoid: data.avoid,
    });
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async getMyProfile(@Req() req: any) {
    const userId = req.user.userId;
    return this.tasteProfileService.getProfile(userId);
  }

  @Post('feedback')
  @UseGuards(AuthGuard('jwt'))
  async ratePairing(
    @Req() req: any,
    @Body() body: { pairingId: string; rating: 'like' | 'dislike' },
  ) {
    const userId = req.user.userId;
    return this.tasteProfileService.ratePairing(userId, body.pairingId, body.rating);
  }

  @Get('prompt-context')
  @UseGuards(AuthGuard('jwt'))
  async getPromptContext(@Req() req: any) {
    const userId = req.user.userId;
    return this.tasteProfileService.getPromptContext(userId);
  }
}