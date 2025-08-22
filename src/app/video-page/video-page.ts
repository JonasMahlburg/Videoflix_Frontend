import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

// Interface zur Definition der Videodaten-Struktur
export interface Video {
  id: number;
  created_at: string;
  title: string;
  description: string;
  thumbnail_url: string; // Jetzt passend zur Backend-Antwort
  category: string;
  videoUrl: string; // Wenn dein Backend keine videoUrl sendet, musst du diese Eigenschaft anders behandeln
}

@Component({
  selector: 'app-video-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-page.html',
  styleUrls: ['./video-page.scss']
})
export class VideoPage implements OnInit {
  
  // Die URL deiner Backend-API
  private backendUrl = 'http://127.0.0.1:8000/api/video/';

  videos: Video[] = [];
  featuredVideo: Video | null = null;
  safeFeaturedVideoUrl: SafeResourceUrl | null = null;
  isLoading = true;
  error: string | null = null;

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.fetchVideos();
  }

  /**
   * Ruft die Videodaten vom Backend ab
   */
  fetchVideos(): void {
    this.http.get<Video[]>(this.backendUrl).subscribe({
      next: (data) => {
        this.videos = data;
        if (this.videos.length > 0) {
          this.selectVideo(this.videos[0]);
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Fehler beim Abrufen der Videos', err);
        this.error = 'Videos konnten nicht geladen werden. Bitte versuche es später noch einmal.';
        this.isLoading = false;
      }
    });
  }

  /**
   * Wählt ein Video aus, das im Hauptplayer angezeigt wird
   * @param video Das auszuwählende Video
   */
  selectVideo(video: Video): void {
    this.featuredVideo = video;
    // Sanitizer wird benötigt, um die Video-URL als vertrauenswürdig zu markieren
    this.safeFeaturedVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(video.videoUrl);
  }

}
