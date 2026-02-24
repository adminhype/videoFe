import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

/**
 * Static legal page displaying the privacy policy (Datenschutzerklärung).
 * Provides a dynamic back-navigation to return the user to their previous context.
 */
@Component({
  selector: 'app-privacy',
  imports: [CommonModule],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss'
})
export class PrivacyComponent {
  
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