import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { AuthService } from '../../../shared/services/auth.service';
import { ToastService } from '../../../shared/services/toast.service';
import { ActivationResponse } from '../../../shared/interfaces/auth.interface';

/**
 * This page is usually accessed via a link sent to the user's email.
 * It automatically extracts the required credentials from the URL and attempts to activate the account.
 */
@Component({
  selector: 'app-activate-account',
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.scss'
})
export class ActivateAccountComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);

  /**
   * Lifecycle hook that runs when the component initializes.
   * Extracts the `uid` and `token` from the route parameters and triggers the activation process.
   */
  ngOnInit(): void {
    const uid = this.route.snapshot.paramMap.get('uid');
    const token = this.route.snapshot.paramMap.get('token');

    if (uid && token) {
      this.activate(uid, token);
    } else {
      this.handleError('Invalid activation link.');
    }
  }
  
  /**
   * Calls the backend to activate the user's account using the provided credentials.
   * On success, shows a confirmation toast and redirects to the login page.
   * 
   * @param uid The unique user ID extracted from the URL.
   * @param token The activation token extracted from the URL.
   */
  activate(uid: string, token: string) {
    this.authService.activateAccount(uid, token).subscribe({
      next: (response: ActivationResponse) => {
        const msg = response.message || 'Account successfully activated! You can now log in.';
        this.toastService.show(msg, 'success');
        
        // Wait for the toast to be readable before redirecting
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2800);
      },
      error: (error) => {
        console.error('Activation error:', error);
        this.handleError('Activation failed or link expired.');
      }
    });
  }

  /**
   * Handles activation errors or invalid links.
   * Displays an error message and redirects the user to the login page.
   * 
   * @param msg The error message to display in the toast notification.
   */
  handleError(msg: string) {
    this.toastService.show(msg, 'error');
    
    setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2800);
  }
}