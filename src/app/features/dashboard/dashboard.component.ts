import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FooterComponent } from "../../shared/components/footer/footer.component";

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {


  // mock data later with backend
  categories = [
    {
      name: 'New on Videoflix',
      videos: [
        { id: 1, title: 'Breakout', thumbnail: 'assets/images/index_bg.jpg' },
        { id: 2, title: 'Rhythms', thumbnail: 'assets/images/index_bg.jpg' },
        { id: 3, title: 'Moon', thumbnail: 'assets/images/index_bg.jpg' }
      ]
    },
    {
      name: 'Documentary',
      videos: [
        { id: 4, title: 'Whales', thumbnail: 'assets/images/index_bg.jpg' },
        { id: 5, title: 'Wonders', thumbnail: 'assets/images/index_bg.jpg' },
        { id: 6, title: 'Life', thumbnail: 'assets/images/index_bg.jpg' }
      ]
    },
    {
      name: 'Drama',
      videos: [
        { id: 7, title: '48 Hours', thumbnail: 'assets/images/index_bg.jpg' },
        { id: 8, title: 'Crime', thumbnail: 'assets/images/index_bg.jpg' },
        { id: 9, title: 'Time', thumbnail: 'assets/images/index_bg.jpg' }
      ]
    },
    {
      name: 'Romance',
      videos: [
        { id: 10, title: 'When I met you', thumbnail: 'assets/images/index_bg.jpg' },
        { id: 11, title: 'Hate you', thumbnail: 'assets/images/index_bg.jpg' },
        { id: 12, title: 'Love', thumbnail: 'assets/images/index_bg.jpg' }
      ]
    }
  ];

  constructor(private router: Router) {}

  onLogout() {
    // later logout
    console.log('Logging out...');
    this.router.navigate(['/login']);
  }
}