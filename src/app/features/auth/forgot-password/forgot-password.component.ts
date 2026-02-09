import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { ForgotPasswordData } from "../../../shared/interfaces/auth.interface";
import { ToastService } from '../../../shared/services/toast.service';

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
  constructor() {}

  onSubmit() {
    if (this.forgotData.email) {
      console.log('Reset Password E-Mail send to:', this.forgotData.email);
      this.toastService.show('Reset password email sent successfully', 'success');
      this.router.navigate(['/login']);
      // api call 
    }
  }
}