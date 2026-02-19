export interface Video {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  genre: string;
  videoUrl: string;
  duration?: number;
  has720p: boolean;
  has1080p: boolean;
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
  has_720p: boolean;
  has_1080p: boolean;
}