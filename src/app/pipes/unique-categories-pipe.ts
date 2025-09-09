import { Pipe, PipeTransform } from '@angular/core';
import { Video } from '../video-page/video-page'

@Pipe({
  name: 'uniqueCategories',
  standalone: true // Wichtig: Machen Sie die Pipe standalone
})
export class UniqueCategoriesPipe implements PipeTransform {

  transform(videos: Video[] | null): string[] {
    if (!videos) {
      return [];
    }

    const uniqueCategories = new Set<string>();
    videos.forEach(video => {
      if (video.category) {
        uniqueCategories.add(video.category);
      }
    });

    // Konvertiert das Set zurück in ein Array und sortiert es
    return Array.from(uniqueCategories).sort();
  }

}
