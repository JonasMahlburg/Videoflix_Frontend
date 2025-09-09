import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Video } from '../video-page/video-page';

@Injectable({
    providedIn: 'root'
})
export class VideoService {
    private apiUrl = 'http://127.0.0.1:8000/api/video/';

    constructor(private http: HttpClient) {}

    loadVideos(): Observable<Video[]> {
        return this.http.get<Video[]>(this.apiUrl);
    }
}