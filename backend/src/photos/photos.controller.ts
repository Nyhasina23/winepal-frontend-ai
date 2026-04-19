import { Controller, Post, Body } from '@nestjs/common';
import { PhotosService } from './photos.service';

@Controller('photos')
export class PhotosController {
  constructor(private photosService: PhotosService) {}

  @Post('download')
  async triggerDownload(@Body() body: { downloadLocation: string }) {
    if (body.downloadLocation) {
      await this.photosService.triggerDownload(body.downloadLocation);
    }
    return { triggered: true };
  }
}