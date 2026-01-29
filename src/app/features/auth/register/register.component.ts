import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { FooterComponent } from "../../../shared/components/footer/footer.component";

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerData = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  passwordVisible = false;
  confirmPasswordVisible = false;

  constructor() {}

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  toggleConfirmPasswordVisibility() {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }
  // type
  passwordsMatch() {
    if (!this.registerData.confirmPassword) return true;
    return this.registerData.password === this.registerData.confirmPassword;
  }

  onSubmit() {
    if (this.registerData.email && this.passwordsMatch()) {
      console.log('Register attempt:', this.registerData);
      // api call later
    }
  }
}