import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { Video, Category } from '../../shared/interfaces/video.interface';
import { VideoService } from '../../shared/services/video.service.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  selectedMobileVideo: Video | null = null;
  heroVideo: Video | null = null;
  categories: Category[] = [];

  constructor(private router: Router, private videoService: VideoService) {}

  ngOnInit(): void {
    this.categories = this.videoService.getCategories();
    if (this.categories.length > 0 && this.categories[0].videos.length > 0) {
      this.heroVideo = this.categories[0].videos[0];
    }
  }

  openDetail(video: Video) {
    this.selectedMobileVideo = video;    
    this.heroVideo = video;
  }

  closeDetail() {
    this.selectedMobileVideo = null;
  }

  onLogout() {
    console.log('Logging out...');
    this.router.navigate(['/login']);
  }
}