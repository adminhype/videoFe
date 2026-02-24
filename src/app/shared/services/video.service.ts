import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, map } from 'rxjs';
import { Category, Video, VideoBackendResponse } from '../interfaces/video.interface';

/**
 * Fetches video data from the API and transforms it for the frontend.
 */
@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private http = inject(HttpClient);
  private apiUrl = environment.baseUrl;
  private mediaUrl = environment.mediaUrl;

  /**
   * Fetches all videos from the backend, maps them to the frontend model,
   * and groups them by their categories (genres).
   * 
   * @returns An observable of categorized video lists.
   */
  getCategories(): Observable<Category[]> {
    return this.http.get<VideoBackendResponse[]>(`${this.apiUrl}/video/`)
      .pipe(map(this.processBackendResponse.bind(this)));
  }

  /**
   * Fetches the video list and finds a specific video by its ID.
   * 
   * @param id The unique ID of the video.
   * @returns An observable containing the Video object, or undefined if not found.
   */
  getVideoById(id: number): Observable<Video | undefined> {
    return this.http.get<VideoBackendResponse[]>(`${this.apiUrl}/video/`).pipe(
      map(videos => {
        const found = videos.find(v => v.id === id);
        return found ? this.mapToVideo(found) : undefined;
      })
    );
  }

  /** Maps raw backend data into structured categories. */
  private processBackendResponse(backendVideos: VideoBackendResponse[]): Category[] {
    const videos = backendVideos.map(v => this.mapToVideo(v));
    return this.groupVideosByCategory(videos);
  }

  /** Transforms a raw backend response object into the frontend Video model. */
  private mapToVideo(v: VideoBackendResponse): Video {
    return { 
	id: v.id,
	title: v.title,
	description: v.description,
	thumbnail: v.thumbnail_url.replace('http://', 'https://'),
	genre: v.category,
	videoUrl: `${this.mediaUrl}/hls/${v.id}/`,
	has720p: v.has_720p,
	has1080p: v.has_1080p
    };
  }

  /** Groups a flat list of videos into a structured array of Categories based on genre. */
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
