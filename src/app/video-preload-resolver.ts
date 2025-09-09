// src/app/video-preload.resolver.ts
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { VideoService } from './services/video.service';
import { Video } from './video-page/video-page';

@Injectable({
  providedIn: 'root'
})
export class VideoPreloadResolver implements Resolve<Video[]> {
  constructor(private videoService: VideoService) {}

  resolve(): Observable<Video[]> {
    return this.videoService.loadVideos();
  }
}