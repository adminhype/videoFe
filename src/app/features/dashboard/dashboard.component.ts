import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { Video, Category } from '../../shared/interfaces/video.interface';
import { VideoService } from '../../shared/services/video.service';
import { ToastService } from '../../shared/services/toast.service';

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

  private router = inject(Router);
  private videoService = inject(VideoService);
  private toastService = inject(ToastService);
    
  ngOnInit(): void {
    this.videoService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        if (this.categories.length > 0 && this.categories[0].videos.length > 0) {
          this.heroVideo = this.categories[0].videos[0];
      }
    },
      error: (error) => {
        console.error('Error fetching videos', error)
        this.toastService.show('videos not loading', 'error');
      }
    });
  }

  openDetail(video: Video) {
    this.selectedMobileVideo = video;    
    this.heroVideo = video;
  }

  closeDetail() {
    this.selectedMobileVideo = null;
  }

  onLogout() {
    //service later for cookies
    this.toastService.show('Logged out successfully', 'success');
    this.router.navigate(['/login']);
  }
}