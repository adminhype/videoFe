import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { LoginData } from '../../../shared/interfaces/auth.interface';
import { ToastService } from '../../../shared/services/toast.service';

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

  passwordVisible = false;


  private router = inject(Router);
  private toastService = inject(ToastService);
  constructor() {}

  get passwordIcon(): string {
    return this.passwordVisible
    ? 'assets/icons/visibility_off.svg'
    : 'assets/icons/visibility.svg';
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit() {
    if (this.loginData.email && this.loginData.password) {
      this.toastService.show('Login successful!', 'success');
      this.router.navigate(['/browse']);
      // TODO: api call later
    }
  }
}