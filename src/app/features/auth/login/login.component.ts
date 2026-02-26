import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { LoginData } from '../../../shared/interfaces/auth.interface';
import { ToastService } from '../../../shared/services/toast.service';
import { AuthService } from '../../../shared/services/auth.service';

/**
 * Authenticates the user and redirects to the `/browse` area upon success.
 */
@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterLink, FormsModule, FooterComponent, HeaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {  
  
  loginData: LoginData = {
    email: '',
    password: ''
  };

  /** Tracks if the password input should be displayed as plain text. */
  passwordVisible = false;

  private router = inject(Router);
  private toastService = inject(ToastService);
  private authService = inject(AuthService);

  /**
   * Returns the correct SVG path for the eye icon based on the current visibility state.
   */
  get passwordIcon(): string {
    return this.passwordVisible
    ? 'assets/icons/visibility_off.svg'
    : 'assets/icons/visibility.svg';
  }

  /**
   * Toggles the password field type between 'password' (obscured) and 'text' (visible).
   */
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  /**
   * Submits the credentials to the backend.
   * If valid, the user is redirected to the main content area.
   */
  onSubmit() {
    if (this.loginData.email && this.loginData.password) {
      this.authService.login(this.loginData).subscribe({
        next: (response) => {

          if (response.token) {
            // Store the token in localStorage for future authenticated requests
            localStorage.setItem('token', response.token);
          }else{
            localStorage.setItem('token', 'activate-session');
          }
          this.toastService.show('Login successful!', 'success');
          
          // Redirect authenticated users to the main video browsing area
          this.router.navigate(['/browse']);
        },
        error: () => {
          this.toastService.show('Login failed', 'error');
        }
      });
    }
  }
}