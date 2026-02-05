export interface Video {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  genre?: string;
  videoUrl: string;
  duration?: number;
}

export interface Category {
  name: string;
  videos: Video[];
}