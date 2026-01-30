import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { HeaderComponent } from "../../../shared/components/header/header.component";

@Component({
  selector: 'app-reset-password',
  imports: [CommonModule, FormsModule, FooterComponent, HeaderComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

  // TODO: typ
  resetData = {
    password: '',
    confirmPassword: ''
  };

  passwordVisible = false;
  confirmPasswordVisible = false;

  constructor() {}
  // TODO: show pw
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  toggleConfirmPasswordVisibility() {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }

  passwordsMatch(): boolean {
    if (!this.resetData.confirmPassword) return true; 
    return this.resetData.password === this.resetData.confirmPassword;
  }

  onSubmit() {
    if (this.resetData.password && this.passwordsMatch()) {
      console.log('Reset Password attempt:', this.resetData);
      // api call later
    }
  }
}