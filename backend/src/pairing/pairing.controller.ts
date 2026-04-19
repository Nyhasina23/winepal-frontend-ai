import { Controller, Post, Body } from '@nestjs/common';
import { PairingService } from './pairing.service';

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
  async suggest(@Body() body: SuggestDto) {
    return this.pairingService.generateSuggestions(body);
  }
}
