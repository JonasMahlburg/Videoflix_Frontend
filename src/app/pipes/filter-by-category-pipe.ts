import { Pipe, PipeTransform } from '@angular/core';
import { Video } from '../video-page/video-page'; // Passe den Pfad bei Bedarf an

@Pipe({
  name: 'filterByCategory',
  standalone: true // Ganz wichtig für Standalone-Komponenten
})
export class FilterByCategoryPipe implements PipeTransform {
  transform(videos: Video[] | null, category: string): Video[] {
    if (!videos || !category) {
      return [];
    }
    return videos.filter(video => video.category === category);
  }
}
