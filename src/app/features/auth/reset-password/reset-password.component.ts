import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { ResetPasswordData } from "../../../shared/interfaces/auth.interface";
@Component({
  selector: 'app-reset-password',
  imports: [CommonModule, FormsModule, FooterComponent, HeaderComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

  resetData: ResetPasswordData = {
    password: '',
    confirmPassword: ''
  };

  passwordVisible = false;
  confirmPasswordVisible = false;

  constructor() {}

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