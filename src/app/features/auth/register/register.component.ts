import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute} from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { RegisterData} from "../../../shared/interfaces/auth.interface";
import { ToastService } from '../../../shared/services/toast.service';
import { AuthService } from '../../../shared/services/auth.service';

/**
 * Handles new user registration, including password validation 
 * and pre-filling the email address from URL parameters.
 */
@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  /** 
   * Reference to the template-driven form. 
   * Used to completely reset the form state (including touched/dirty flags) after success.
   */
  @ViewChild('registerForm') registerForm!: NgForm;

  registerData: RegisterData = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  privacyPolicyAccepted = false;
  
  /** Tracks visibility state for the main password field. */
  passwordVisible = false;
  /** Tracks visibility state for the confirm password field. */
  confirmPasswordVisible = false;

  private route = inject(ActivatedRoute);
  private toastService = inject(ToastService);
  private authService = inject(AuthService);

  /**
   * Pre-fills the email input if an `email` query parameter is present in the URL
   * (e.g., when navigating from the quick-start form on the landing page).
   */
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const emailParam = params.get('email');
      if (emailParam) {
        this.registerData.email = emailParam!;
      }
    });
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
   * Validates if the password and confirmation password match.
   * Returns true if the confirm field is currently empty to prevent premature error messages while typing.
   */
  passwordsMatch(): boolean {
    if (!this.registerData.confirmPassword) return true;
    return this.registerData.password === this.registerData.confirmPassword;
  }

  /**
   * Submits the registration form to the backend if all client-side validations pass.
   * Resets the form and prompts the user to check their email upon success.
   */
  onSubmit() {
    if (this.registerData.email && this.passwordsMatch() && this.privacyPolicyAccepted) {
      this.authService.register(this.registerData).subscribe({
        next: (response) => {
          this.toastService.show('Registration successful! Please check your email to activate your account', 'success', 3000);
          
          // Clear form data and reset validation states
          this.registerForm.resetForm();
          this.privacyPolicyAccepted = false;
        },
        error: () => {
          this.toastService.show('Registration failed', 'error');
        }
      });
    }
  }
}