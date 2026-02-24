import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

/**
 * Static legal page displaying the imprint (Impressum).
 * Provides a dynamic back-navigation to return the user to their previous context.
 */
@Component({
  selector: 'app-imprint',
  imports: [CommonModule],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.scss'
})
export class ImprintComponent {
  
  private location = inject(Location);

  /**
   * Navigates exactly one step back in the browser's history.
   * This ensures the user returns to where they came from (e.g., the landing page or the dashboard) 
   * rather than a hardcoded route.
   */
  goBack() {
    this.location.back();
  }
}