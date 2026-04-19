import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PhotosService {
  private unsplashUrl = 'https://api.unsplash.com/search/photos';

  async searchPhoto(query: string) {
    try {
      const response = await axios.get(this.unsplashUrl, {
        params: {
          query: `${query} wine food`,
          per_page: 1,
        },
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
        },
      });

      if (response.data.results && response.data.results.length > 0) {
        const photo = response.data.results[0];
        return {
          url: photo.urls.regular,
          credit: `Photo by ${photo.user.name}`,
          creditUrl: `${photo.user.links.html}?utm_source=sommia&utm_medium=referral`,
          unsplashUrl: `https://unsplash.com/?utm_source=sommia&utm_medium=referral`,
          downloadLocation: photo.links?.download_location || null,
        };
      }
    } catch (error) {
      console.error('Unsplash error:', error.message);
    }

    return {
      url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800',
      credit: 'Photo by ELEVATE',
      creditUrl: 'https://unsplash.com/@elevate?utm_source=sommia&utm_medium=referral',
      unsplashUrl: 'https://unsplash.com/?utm_source=sommia&utm_medium=referral',
      downloadLocation: null,
    };
  }

  async triggerDownload(downloadLocation: string) {
    try {
      await axios.get(downloadLocation, {
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
        },
      });
    } catch (error) {
      console.error('Unsplash download trigger error:', error.message);
    }
  }
}
