import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';

/**
 * Usually the first page unauthenticated users see. 
 * It features a quick-start form to capture the user's email address.
 */
@Component({
  selector: 'app-landing',
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  
  /** 
   * The email address entered by the user. 
   * Bound to the input field in the HTML template.
   */
  email = '';

  private router = inject(Router);

  /**
   * Submits the quick-start form on the landing page.
   * If the entered email is valid, it navigates to the registration page
   * and passes the email as a query parameter, so the user doesn't have to type it again.
   * 
   * @param form The Angular template-driven form object.
   */
  onSubmit(form: NgForm) {
    if (form.valid) {
      // Redirect to the register page and pre-fill the email via URL parameters
      this.router.navigate(['/register'], { queryParams: { email: this.email } });
    }
  }
}