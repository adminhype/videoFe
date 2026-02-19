export interface Video {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  genre: string;
  videoUrl: string;
  duration?: number;
}

export interface Category {
  name: string;
  videos: Video[];
}

export interface VideoBackendResponse {
  id: number;
  created_at: string;
  title: string;
  description: string;
  thumbnail_url: string;
  category: string;
}