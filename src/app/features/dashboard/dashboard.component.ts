import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { Video, Category } from '../../shared/interfaces/video.interface';
import { VideoService } from '../../shared/services/video.service';
import { ToastService } from '../../shared/services/toast.service';
import { AuthService } from '../../shared/services/auth.service';
import { HlsVideoDirective } from '../../shared/directives/hls-video.directive';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink, FooterComponent, HlsVideoDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  selectedVideo: Video | null = null;
  heroVideo: Video | null = null;
  categories: Category[] = [];

  private router = inject(Router);
  private videoService = inject(VideoService);
  private toastService = inject(ToastService);
  private authService = inject(AuthService);
    
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
    this.selectedVideo = video;
  }

  closeDetail() {
    this.selectedVideo = null;
  }

  onLogout() {
    this.authService.logout().subscribe({
      next: () => {
        this.toastService.show('Logged out successfully', 'success');    
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('logout error:', err);
        this.router.navigate(['/login'])
      }
    })
  }
}