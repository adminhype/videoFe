import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { Video, Category } from '../../shared/interfaces/video.interface';
import { VideoService } from '../../shared/services/video.service';
import { ToastService } from '../../shared/services/toast.service';
import { AuthService } from '../../shared/services/auth.service';
import { HlsVideoDirective } from '../../shared/directives/hls-video.directive';

/**
 * Main entry point after a successful login. 
 * Loads categorized video content, manages the featured hero video, 
 * and handles the state for the video detail overlay.
 */
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink, FooterComponent, HlsVideoDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  /** The currently selected video for the detail overlay. Null if the overlay is closed. */
  selectedVideo: Video | null = null;
  
  /** The featured video displayed prominently at the top of the dashboard. */
  heroVideo: Video | null = null;
  
  categories: Category[] = [];

  private router = inject(Router);
  private videoService = inject(VideoService);
  private toastService = inject(ToastService);
  private authService = inject(AuthService);
    
  /**
   * Fetches all video categories on initialization.
   * Automatically sets the first available video from the first category as the featured hero video.
   */
  ngOnInit(): void {
    this.videoService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        
        // Auto-select the very first video as the hero video if data is available
        if (this.categories.length > 0 && this.categories[0].videos.length > 0) {
          this.heroVideo = this.categories[0].videos[0];
        }
      },
      error: () => {
        this.toastService.show('videos not loading', 'error');
      }
    });
  }

  /**
   * Opens the detail overlay for a specific video.
   * 
   * @param video The video object to display in the detail view.
   */
  openDetail(video: Video) {
    this.selectedVideo = video;
  }

  /**
   * Closes the active video detail overlay by clearing the selection.
   */
  closeDetail() {
    this.selectedVideo = null;
  }

  /**
   * Invalidates the user session on the backend and redirects to the login screen.
   * Forces a redirect even if the backend request fails to ensure local logout.
   */
  onLogout() {
    this.authService.logout().subscribe({
      next: () => {
        localStorage.removeItem('token');
        this.toastService.show('Logged out successfully', 'success');    
        this.router.navigate(['/login']);
      },
      error: () => {
        localStorage.removeItem('token');
        
        // Fallback: Redirect to login anyway if the backend is unreachable
        this.router.navigate(['/login']);
      }
    })
  }
}