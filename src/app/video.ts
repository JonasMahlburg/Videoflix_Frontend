// src/app/video.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Video } from './video-page/video-page'; // Importiere die Video-Schnittstelle

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private backendUrl = 'http://127.0.0.1:8000/api/video/';
  private cachedVideos: Video[] | null = null;
  private isLoading = false;
  private data$: Observable<Video[]> | null = null;

  constructor(private http: HttpClient) { }

  /**
   * Lädt die Videos, falls noch nicht geschehen, und gibt sie zurück.
   * Nutzt den Cache, um unnötige API-Aufrufe zu vermeiden.
   */
  loadVideos(): Observable<Video[]> {
    // Wenn Daten schon im Cache sind, gib sie sofort zurück
    if (this.cachedVideos) {
      return of(this.cachedVideos);
    } 
    
    // Wenn der Ladevorgang bereits läuft, gib das laufende Observable zurück
    if (this.isLoading && this.data$) {
      return this.data$;
    }

    // Starte den API-Aufruf und speichere das Observable
    this.isLoading = true;
    this.data$ = this.http.get<Video[]>(this.backendUrl).pipe(
      tap(data => {
        this.cachedVideos = data; // Cache die Daten nach erfolgreichem Aufruf
        this.isLoading = false;
      })
    );
    
    return this.data$;
  }
}