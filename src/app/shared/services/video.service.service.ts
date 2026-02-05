import { Injectable } from '@angular/core';
import { Category, Video } from '../interfaces/video.interface';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private categories: Category[] = [
    {
      name: 'New on Videoflix',
      videos: [
        { 
          id: 1, 
          title: 'Breakout', 
          description: 'In a high-security prison, a wrongly convicted man formulates a meticulous plan to break out and prove his innocence. He must navigate a web of alliances and betrayals to reclaim his freedom and expose the truth.', 
          thumbnail: 'assets/images/index_bg.jpg',
          videoUrl: 'assets/videos/doku.mp4'
        },
        { 
          id: 2, 
          title: 'Rhythms', 
          description: 'A young drummer discovers a hidden talent that could change the world of music forever, but faces challenges that test his passion.', 
          thumbnail: 'assets/images/index_bg.jpg',
          videoUrl: 'assets/videos/dramav2.mp4'
        },
        { 
          id: 3, 
          title: 'Moon', 
          description: 'Astronauts on a lunar base encounter a mysterious signal that threatens their mission and their lives.', 
          thumbnail: 'assets/images/index_bg.jpg',
          videoUrl: 'assets/videos/dummy.mp4'
        }
      ]
    },
    {
      name: 'Documentary',
      videos: [
        { 
          id: 4, 
          title: 'Whales', 
          description: 'Dive deep into the ocean to explore the majestic lives of whales.', 
          thumbnail: 'assets/images/index_bg.jpg',
          videoUrl: 'assets/videos/dummy.mp4'
        },
        { 
          id: 5, 
          title: 'Wonders', 
          description: 'Explore the architectural and natural wonders of the modern world.', 
          thumbnail: 'assets/images/index_bg.jpg',
          videoUrl: 'assets/videos/dummy.mp4'
        },
        { 
          id: 6, 
          title: 'Life', 
          description: 'A journey through the evolution of life on Earth.', 
          thumbnail: 'assets/images/index_bg.jpg',
          videoUrl: 'assets/videos/dummy.mp4'
        }
      ]
    },
    {
        name: 'Drama',
        videos: [
          { 
            id: 7, 
            title: '48 Hours', 
            description: 'A detective has only 48 hours to solve a kidnapping case.', 
            thumbnail: 'assets/images/index_bg.jpg',
            videoUrl: 'assets/videos/dummy.mp4'
          },
          { 
            id: 8, 
            title: 'Crime', 
            description: 'The gritty reality of organized crime in the 1920s.', 
            thumbnail: 'assets/images/index_bg.jpg',
            videoUrl: 'assets/videos/dummy.mp4'
          },
          { 
            id: 9, 
            title: 'Time', 
            description: 'A romance that transcends time and space.', 
            thumbnail: 'assets/images/index_bg.jpg',
            videoUrl: 'assets/videos/dummy.mp4'
          }
        ]
      },
      {
        name: 'Romance',
        videos: [
          { 
            id: 10, 
            title: 'When I met you', 
            description: 'A chance encounter leads to a lifetime of love.', 
            thumbnail: 'assets/images/index_bg.jpg',
            videoUrl: 'assets/videos/comedy.mp4'
          },
          { 
            id: 11, 
            title: 'Hate you', 
            description: 'From enemies to lovers, a classic tale of passion.', 
            thumbnail: 'assets/images/index_bg.jpg',
            videoUrl: 'assets/videos/dummy.mp4'
          },
          { 
            id: 12, 
            title: 'Love', 
            description: 'Different stories of love intersecting in New York City.', 
            thumbnail: 'assets/images/index_bg.jpg',
            videoUrl: 'assets/videos/dummy.mp4'
          }
        ]
      }
  ];

  constructor() { }

  getCategories(): Category[] {
    return this.categories;
  }

  getVideoById(id: number): Video | undefined {
    for (const category of this.categories) {
      const foundVideo = category.videos.find(video => video.id === id);
      if (foundVideo) {
        return foundVideo;
      }
    }
    return undefined;
  }
}