export interface Video {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  genre?: string;
}

export interface Category {
  name: string;
  videos: Video[];
}