import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { ForgotPasswordData } from "../../../shared/interfaces/auth.interface";
import { ToastService } from '../../../shared/services/toast.service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  forgotData: ForgotPasswordData = {
    email: ''
  };
  
  private router = inject(Router);
  private toastService = inject(ToastService);
  private authService = inject(AuthService);
  constructor() {}

  onSubmit() {
    if (this.forgotData.email) {
      this.authService.requestPasswordReset(this.forgotData).subscribe({
        next: () => {
          this.toastService.show('Reset password email sent successfully', 'success');
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