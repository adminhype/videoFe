import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { ForgotPasswordData } from "../../../shared/interfaces/auth.interface";
import { ToastService } from '../../../shared/services/toast.service';
import { AuthService } from '../../../shared/services/auth.service';

/**
 * Allows users to request a password reset link by providing their registered email address.
 */
@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  /** 
   * Holds the data entered in the form.
   * Bound to the HTML template via Angular's ngModel.
   */
  forgotData: ForgotPasswordData = {
    email: ''
  };
  
  private toastService = inject(ToastService);
  private authService = inject(AuthService);

  /**
   * Submits the forgot password form.
   * If an email is provided, it sends a reset request to the backend.
   * Displays a success or error toast notification based on the server response.
   */
  onSubmit() {
    if (this.forgotData.email) {
      this.authService.requestPasswordReset(this.forgotData).subscribe({
        next: () => {
          this.toastService.show('Reset password email sent successfully', 'success');
          
          // Clear the input field after a successful request
          this.forgotData.email = '';
        },
        error: (error) => {
          console.error('Forgot pw error', error);
          this.toastService.show('Something went wrong. Please try again.', 'error');
        }
      });
    }
  }
}