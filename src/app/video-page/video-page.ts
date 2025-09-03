// src/app/video-page/video-page.component.ts
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideoService } from '../video'; // Importiere den neuen Service
import { ActivatedRoute } from '@angular/router'; // Importiere ActivatedRoute, falls du einen Resolver nutzt
import videojs from 'video.js';

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
export class VideoPage implements OnInit, OnDestroy {
    videos: Video[] = [];
    featuredVideo: Video | null = null;
    safeFeaturedVideoUrl: SafeResourceUrl | null = null;
    isLoading = true;
    error: string | null = null;
    isVideoVisible: boolean = false;
    private player!: any;
    @ViewChild('videoPlayer') videoPlayer!: ElementRef;

    constructor(
        private sanitizer: DomSanitizer,
        private videoService: VideoService, // Nutze den Service anstelle von HttpClient
        private route: ActivatedRoute // Für den Resolver-Ansatz
    ) {}

    ngOnInit(): void {
      this.route.data.subscribe(({ videos }) => {
        this.handleVideoData(videos);
      });
    }

    playVideo(): void {
      this.isVideoVisible = true;
      setTimeout(() => {
        if (this.videoPlayer && this.videoPlayer.nativeElement) {
          this.player = videojs(this.videoPlayer.nativeElement, {}, function onPlayerReady() {
            videojs.log('Your player is ready!');
          });
          this.player.on('ended', () => {
            videojs.log('Awww...over so soon?!');
          });
        }
      });
    }

    ngOnDestroy(): void {
      if (this.player) {
        this.player.dispose();
      }
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
