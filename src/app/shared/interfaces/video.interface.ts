/** 
 * Frontend representation of a video. 
 * Mapped from the raw backend response for easier use in components.
 */
export interface Video {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  genre: string;
  videoUrl: string;
  duration?: number;
  /** Indicates if a 720p stream is available. */
  has720p: boolean;
  /** Indicates if a 1080p stream is available. */
  has1080p: boolean;
}

/** Groups a list of videos under a specific genre/category name. */
export interface Category {
  name: string;
  videos: Video[];
}

/** 
 * Raw data structure returned by the video API. 
 * Should be mapped to the `Video` interface before using it in the UI.
 */
export interface VideoBackendResponse {
  id: number;
  created_at: string;
  title: string;
  description: string;
  thumbnail_url: string;
  category: string;
  has_720p: boolean;
  has_1080p: boolean;
}