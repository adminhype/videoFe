import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { Video, Category } from '../../shared/interfaces/video.interface';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  selectedMobileVideo: Video | null = null;

  heroVideo: Video | null = null;

  categories: Category[] = [
    {
      name: 'New on Videoflix',
      videos: [
        { 
          id: 1, 
          title: 'Breakout', 
          description: 'In a high-security prison, a wrongly convicted man formulates a meticulous plan to break out and prove his innocence. He must navigate a web of alliances and betrayals to reclaim his freedom and expose the truth.', 
          thumbnail: 'assets/images/index_bg.jpg' 
        },
        { 
          id: 2, 
          title: 'Rhythms', 
          description: 'A young drummer discovers a hidden talent that could change the world of music forever, but faces challenges that test his passion.', 
          thumbnail: 'assets/images/index_bg.jpg' 
        },
        { 
          id: 3, 
          title: 'Moon', 
          description: 'Astronauts on a lunar base encounter a mysterious signal that threatens their mission and their lives.', 
          thumbnail: 'assets/images/index_bg.jpg' 
        }
      ]
    },
    {
      name: 'Documentary',
      videos: [
        { id: 4, title: 'Whales', description: 'Dive deep into the ocean to explore the majestic lives of whales.', thumbnail: 'assets/images/index_bg.jpg' },
        { id: 5, title: 'Wonders', description: 'Explore the architectural and natural wonders of the modern world.', thumbnail: 'assets/images/index_bg.jpg' },
        { id: 6, title: 'Life', description: 'A journey through the evolution of life on Earth.', thumbnail: 'assets/images/index_bg.jpg' }
      ]
    },
    {
        name: 'Drama',
        videos: [
          { id: 7, title: '48 Hours', description: 'A detective has only 48 hours to solve a kidnapping case.', thumbnail: 'assets/images/index_bg.jpg' },
          { id: 8, title: 'Crime', description: 'The gritty reality of organized crime in the 1920s.', thumbnail: 'assets/images/index_bg.jpg' },
          { id: 9, title: 'Time', description: 'A romance that transcends time and space.', thumbnail: 'assets/images/index_bg.jpg' }
        ]
      },
      {
        name: 'Romance',
        videos: [
          { id: 10, title: 'When I met you', description: 'A chance encounter leads to a lifetime of love.', thumbnail: 'assets/images/index_bg.jpg' },
          { id: 11, title: 'Hate you', description: 'From enemies to lovers, a classic tale of passion.', thumbnail: 'assets/images/index_bg.jpg' },
          { id: 12, title: 'Love', description: 'Different stories of love intersecting in New York City.', thumbnail: 'assets/images/index_bg.jpg' }
        ]
      }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.categories.length > 0 && this.categories[0].videos.length > 0) {
      this.heroVideo = this.categories[0].videos[0];
    }
  }

  openDetail(video: Video) {
    this.selectedMobileVideo = video;    
    this.heroVideo = video;

    // TODO: desktop scroll for video
  }

  closeDetail() {
    this.selectedMobileVideo = null;
  }

  onLogout() {
    console.log('Logging out...');
    this.router.navigate(['/login']);
  }
}