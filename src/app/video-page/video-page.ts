import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../services/video.service';
import { UniqueCategoriesPipe } from '../pipes/unique-categories-pipe';
import { FilterByCategoryPipe } from '../pipes/filter-by-category-pipe';
import { Header } from '../shared/header/header';
import { Footer } from '../shared/footer/footer';
import { VjsPlayer } from '../vjs-player/vjs-player';

// Schnittstelle ohne die Video-URL-Eigenschaften
export interface Video {
    id: number;
    title: string;
    description: string;
    thumbnail_url: string;
    category: string;
    created_at: string;
}

@Component({
    selector: 'app-video-page',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule, 
        UniqueCategoriesPipe,
        FilterByCategoryPipe,
        Header,
        Footer,
        VjsPlayer,
    ],
    templateUrl: './video-page.html', 
    styleUrls: ['./video-page.scss']
})
export class VideoPageComponent implements OnInit {
    videos: Video[] = [];
    latestVideos: Video[] = [];
    featuredVideo: Video | null = null;
    currentVideoId: number | null = null;
    currentResolution: string = '480p';
    isVideoOverlayOpen: boolean = false;
    showOverlayControls = true;
    private overlayControlsTimeout: any;

    mainPlayerOptions: any;
    overlayPlayerOptions: any;

    @ViewChild('overlayVjs') overlayVjsPlayer?: VjsPlayer;

    constructor(
        private sanitizer: DomSanitizer,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.data.subscribe(({ videos }) => {
            if (videos) {
                this.videos = videos;
                this.getNewestVideos();
                if (this.videos.length > 0) {
                    this.selectVideo(this.videos[0].id);
                }
            }
        });
    }

    selectVideo(id: number): void {
        this.currentVideoId = id;
        this.featuredVideo = this.videos.find(v => v.id === id) || null;
        if (this.featuredVideo) {
            this.mainPlayerOptions = this.getVideoJsOptions(this.featuredVideo, this.currentResolution);
            // Overlay schließen, falls offen
            this.isVideoOverlayOpen = false;
        }
    }

    openVideoOverlay(): void {
        this.isVideoOverlayOpen = true;
        document.body.classList.add('overlay-open');
        this.showControlsTemporarily();
        if (this.featuredVideo) {
            this.overlayPlayerOptions = this.getVideoJsOptions(this.featuredVideo, this.currentResolution);
        }
    }
    
    closeVideoOverlay(): void {
        this.isVideoOverlayOpen = false;
        document.body.classList.remove('overlay-open');
    }

    handleResolutionChange(event: any): void {
        this.currentResolution = event.target.value;
        if (this.featuredVideo) {
            this.overlayPlayerOptions = this.getVideoJsOptions(this.featuredVideo, this.currentResolution);
        }
    }

    private getNewestVideos(): void {
        const fiveDaysAgo = new Date();
        fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
        this.latestVideos = this.videos.filter(v => new Date(v.created_at) >= fiveDaysAgo);
    }

    /**
     * Erstellt die Video-URL dynamisch basierend auf der Video-ID.
     */
    private getBestResolutionUrl(video: Video, resolution: string = '1080p'): string {
        // Annahme, dass die Basis-URL und die Pfadstruktur fest sind.
        const baseUrl = 'http://127.0.0.1:8000/media/hls/';
        // Verweis auf die HLS-Manifestdatei (.m3u8), nicht auf ein einzelnes Segment (.ts)
        const path = `${video.id}/${resolution}/index.m3u8`;
        return `${baseUrl}${path}`;
    }

    getSafeUrl(url: string | undefined): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url || '');
    }

      /**
   * Spult das Video um die angegebene Anzahl an Sekunden vor.
   * @param seconds Die Anzahl der Sekunden, die vorgespult werden soll.
   */
  forwardVideo(seconds: number): void {
    const player = this.overlayVjsPlayer?.player;
    if (player && typeof player.currentTime === 'function') {
      const current = player.currentTime() ?? 0;
      player.currentTime(current + seconds);
    }
  }

  /**
   * Spult das Video um die angegebene Anzahl an Sekunden zurück.
   * @param seconds Die Anzahl der Sekunden, die zurückgespult werden soll.
   */
  rewindVideo(seconds: number): void {
    const player = this.overlayVjsPlayer?.player;
    if (player && typeof player.currentTime === 'function') {
      const current = player.currentTime() ?? 0;
      player.currentTime(Math.max(0, current - seconds));
    }
  }

  getVideoJsOptions(video: Video, resolution: string) {
    return {
      controls: false,
      autoplay: true,
      preload: 'auto',
      sources: [{
        src: this.getBestResolutionUrl(video, resolution),
        type: 'application/x-mpegURL'
      }]
    };
  }

  toggleFullscreen(): void {
    const player = this.overlayVjsPlayer?.player;
    if (player) {
      if (player.isFullscreen()) {
        player.exitFullscreen();
      } else if (typeof player.requestFullscreen === 'function') {
        player.requestFullscreen();
      }
    }
  }

  showControlsTemporarily() {
    this.showOverlayControls = true;
    clearTimeout(this.overlayControlsTimeout);
    this.overlayControlsTimeout = setTimeout(() => {
      this.showOverlayControls = false;
    }, 3000); // 3 Sekunden sichtbar
  }
}