import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { ResetPasswordData } from "../../../shared/interfaces/auth.interface";
import { ToastService } from '../../../shared/services/toast.service';
import { AuthService } from '../../../shared/services/auth.service';

/**
 * Processes the final step of the password reset flow.
 * Extracts the reset credentials from the URL and allows the user to securely define a new password.
 */
@Component({
  selector: 'app-reset-password',
  imports: [CommonModule, FormsModule, FooterComponent, HeaderComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit{

  private uid: string = '';
  private token: string = '';

  resetData: ResetPasswordData = {
    password: '',
    confirmPassword: ''
  };

  /** Tracks visibility state for the main password field. */
  passwordVisible = false;
  /** Tracks visibility state for the confirm password field. */
  confirmPasswordVisible = false;

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private toastService = inject(ToastService);
  private authService = inject(AuthService);

  /**
   * Extracts the unique user ID (`uid`) and security `token` from the route parameters.
   * Aborts and redirects to the login page if the reset link is invalid or incomplete.
   */
  ngOnInit(): void {
    this.uid = this.route.snapshot.paramMap.get('uid') || '';
    this.token = this.route.snapshot.paramMap.get('token') || '';
    
    // Safety check: Prevent users from staying on this page without valid reset credentials
    if(!this.uid || !this.token){
      this.toastService.show('invalid password reset link.', 'error');
      this.router.navigate(['/login']);
    }
}

  get passwordIcon(): string{
    return this.passwordVisible
    ? 'assets/icons/visibility_off.svg'
    : 'assets/icons/visibility.svg';
  }

  get confirmPasswordIcon(): string {
    return this.confirmPasswordVisible
    ? 'assets/icons/visibility_off.svg'
    : 'assets/icons/visibility.svg';
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  toggleConfirmPasswordVisibility() {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }

  /**
   * Validates if the new password and confirmation match.
   * Returns true if the confirm field is currently empty to prevent premature error messages while typing.
   */
  passwordsMatch(): boolean {
    if (!this.resetData.confirmPassword) return true; 
    return this.resetData.password === this.resetData.confirmPassword;
  }

  /**
   * Submits the new password along with the URL credentials to the backend.
   * Redirects the user to the login page so they can authenticate with the new password.
   */
  onSubmit() {
    if (this.resetData.password && this.passwordsMatch()) {
      this.authService.confirmPasswordReset(this.uid, this.token, this.resetData).subscribe({
        next: () => {
          this.toastService.show('Password reset successfully.', 'success');
          this.router.navigate(['/login']);
        },
        error: () => {
          this.toastService.show('Failed to reset password', 'error');
        }
      });
    }
  }
}