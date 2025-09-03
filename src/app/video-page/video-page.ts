// src/app/video-page/video-page.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideoService } from '../video'; // Importiere den neuen Service
import { ActivatedRoute } from '@angular/router'; // Importiere ActivatedRoute, falls du einen Resolver nutzt


export interface Video {
    id: number;
    created_at: string;
    title: string;
    description: string;
    thumbnail_url: string; 
    category: string;
    videoUrl: string;
}

@Component({
    selector: 'app-video-page',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './video-page.html',
    styleUrls: ['./video-page.scss']
})
export class VideoPage implements OnInit {
    videos: Video[] = [];
    featuredVideo: Video | null = null;
    safeFeaturedVideoUrl: SafeResourceUrl | null = null;
    isLoading = true;
    error: string | null = null;

    constructor(
        private sanitizer: DomSanitizer,
        private videoService: VideoService, // Nutze den Service anstelle von HttpClient
        private route: ActivatedRoute // Für den Resolver-Ansatz
    ) {}

    ngOnInit(): void {
      // Methode A: Daten über den Service laden (ohne Resolver)
      // this.videoService.loadVideos().subscribe(
      //   data => {
      //     this.handleVideoData(data);
      //   },
      //   err => {
      //     console.error('Fehler beim Abrufen der Videos', err);
      //     this.error = 'Videos konnten nicht geladen werden.';
      //     this.isLoading = false;
      //   }
      // );
      
      // Methode B: Daten vom Resolver erhalten (empfohlen)
      this.route.data.subscribe(({ videos }) => {
        this.handleVideoData(videos);
      });
    }

    private handleVideoData(data: Video[]): void {
      this.videos = data;
      if (this.videos.length > 0) {
          this.selectVideo(this.videos[0]);
      }
      this.isLoading = false;
    }

    /**
     * Wählt ein Video aus, das im Hauptplayer angezeigt wird
     */
    selectVideo(video: Video): void {
        this.featuredVideo = video;
        this.safeFeaturedVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(video.videoUrl);
    }
}
