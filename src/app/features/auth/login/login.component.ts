import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from "../../../shared/components/footer/footer.component";

@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterLink, FormsModule, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  // typ?
  
  loginData = {
    email: '',
    password: ''
  };

  showPassword = false;

  private router = inject(Router);
  constructor() {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginData.email && this.loginData.password) {
      console.log('Login attempt:', this.loginData);
      this.router.navigate(['/browse']);
      // TODO: api call later
    }
  }
}