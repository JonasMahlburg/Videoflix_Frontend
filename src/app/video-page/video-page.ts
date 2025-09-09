import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import Hls from 'hls.js';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../services/video.service';
import { UniqueCategoriesPipe } from '../pipes/unique-categories-pipe';
import { FilterByCategoryPipe } from '../pipes/filter-by-category-pipe';

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
        FilterByCategoryPipe
    ],
    templateUrl: './video-page.html',
    styleUrls: ['./video-page.scss']
})
export class VideoPageComponent implements OnInit, OnDestroy {
    @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
    @ViewChild('overlayVideo') overlayVideo!: ElementRef<HTMLVideoElement>;
    
    videos: Video[] = [];
    latestVideos: Video[] = [];
    featuredVideo: Video | null = null;
    currentVideoId: number | null = null;
    currentResolution: string = '480p';
    isVideoOverlayOpen: boolean = false;

    private hls: Hls | null = null;
    private overlayHls: Hls | null = null;

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

    ngOnDestroy(): void {
        this.destroyHlsPlayers();
    }

    selectVideo(id: number): void {
        this.currentVideoId = id;
        this.featuredVideo = this.videos.find(v => v.id === id) || null;
    }

    playVideoInMainPlayer(id: number, resolution: string): void {
        if (this.hls) {
            this.hls.destroy();
        }
        
        const videoElement = this.videoPlayer.nativeElement;
        const video = this.videos.find(v => v.id === id);
        if (!video) {
            console.error('Video or URL not found');
            return;
        }

        const videoUrl = this.getBestResolutionUrl(video);
        
        this.hls = new Hls({
            startLevel: -1, 
            startFragPrefetch: true,
            fragLoadingTimeOut: 10000,
            fragLoadingMaxRetry: 3,
        });
        this.hls.loadSource(videoUrl);
        this.hls.attachMedia(videoElement);
        
        this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
             videoElement.play().catch(e => console.log("Play failed:", e));
        });
    }

    openVideoOverlay(): void {
        this.isVideoOverlayOpen = true;
        document.body.classList.add('overlay-open');
        this.loadVideoInOverlay(this.currentVideoId, this.currentResolution);
    }
    
    closeVideoOverlay(): void {
        this.isVideoOverlayOpen = false;
        document.body.classList.remove('overlay-open');
        if (this.overlayHls) {
            this.overlayHls.destroy();
            this.overlayHls = null;
        }
    }

    handleResolutionChange(event: any): void {
        this.currentResolution = event.target.value;
        this.loadVideoInOverlay(this.currentVideoId, this.currentResolution);
    }

    loadVideoInOverlay(id: number | null, resolution: string): void {
        if (!id) return;
        
        if (this.overlayHls) {
            this.overlayHls.destroy();
        }

        const videoElement = this.overlayVideo.nativeElement;
        const video = this.videos.find(v => v.id === id);
        if (!video) return;

        const videoUrl = this.getBestResolutionUrl(video, resolution);

        this.overlayHls = new Hls({
            startLevel: -1, 
            startFragPrefetch: true,
            fragLoadingTimeOut: 10000,
            fragLoadingMaxRetry: 3,
        });
        this.overlayHls.loadSource(videoUrl);
        this.overlayHls.attachMedia(videoElement);
        
        this.overlayHls.on(Hls.Events.MANIFEST_PARSED, () => {
             videoElement.play().catch(e => console.log("Play failed:", e));
        });
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

    private destroyHlsPlayers(): void {
        if (this.hls) {
            this.hls.destroy();
            this.hls = null;
        }
        if (this.overlayHls) {
            this.overlayHls.destroy();
            this.overlayHls = null;
        }
    }

    getSafeUrl(url: string | undefined): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url || '');
    }
}