import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, map } from 'rxjs';
import { Category, Video, VideoBackendResponse } from '../interfaces/video.interface';

@Injectable({
  providedIn: 'root'
})

export class VideoService {
  private http = inject(HttpClient);
  private apiUrl = environment.baseUrl;
  constructor () {}

  getCategories(): Observable<Category[]> {
    return this.http.get<VideoBackendResponse[]>(`${this.apiUrl}/video/`)
      .pipe(map(this.processBackendResponse.bind(this)));
  }

  getVideoById(id: number): Observable<Video | undefined> {
    return this.http.get<VideoBackendResponse[]>(`${this.apiUrl}/video/`).pipe(
      map(videos => {
        const found = videos.find(v => v.id === id);
        return found ? this.mapToVideo(found) : undefined;
      })
    );
  }

  private processBackendResponse(backendVideos: VideoBackendResponse[]): Category[] {
    const videos = backendVideos.map(v => this.mapToVideo(v));
    return this.groupVideosByCategory(videos);
  }

  private mapToVideo(v: VideoBackendResponse): Video {
    return {
      id: v.id,
      title: v.title,
      description: v.description,
      thumbnail: v.thumbnail_url,
      genre: v.category,
      videoUrl: `${this.apiUrl}/video/${v.id}/`
    };
  }

  private groupVideosByCategory(videos: Video[]): Category[] {
    const categoriesMap = new Map<string, Video[]>();
    videos.forEach(video => {
      if (!categoriesMap.has(video.genre)) {
        categoriesMap.set(video.genre, []);
      }
      categoriesMap.get(video.genre)?.push(video);
    });
    return Array.from(categoriesMap, ([name, videos]) => ({ name, videos }));
  }
}