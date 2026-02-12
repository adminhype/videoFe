import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router} from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { RegisterData} from "../../../shared/interfaces/auth.interface";
import { ToastService } from '../../../shared/services/toast.service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  @ViewChild('registerForm') registerForm!: NgForm;

  registerData: RegisterData = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  privacyPolicyAccepted = false;
  passwordVisible = false;
  confirmPasswordVisible = false;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastService = inject(ToastService);
  private authService = inject(AuthService);
  constructor() { }

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

  passwordsMatch(): boolean {
    if (!this.registerData.confirmPassword) return true;
    return this.registerData.password === this.registerData.confirmPassword;
  }

  onSubmit() {
    if (this.registerData.email && this.passwordsMatch() && this.privacyPolicyAccepted) {
      this.authService.register(this.registerData).subscribe({
        next: (response) => {
          console.log('Register attempt:', response);
          this.toastService.show('Registration successful! Please check your email to activate your account', 'success', 3000);
          this.registerForm.resetForm();
        this.privacyPolicyAccepted = false;
      },
        error: (error) => {
          console.error('Registration error:', error);
          this.toastService.show('Registration failed', 'error');
        }
      });
    }
  }
}