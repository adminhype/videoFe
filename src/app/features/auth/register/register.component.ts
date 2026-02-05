import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { RegisterData } from "../../../shared/interfaces/register.interface";

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  registerData: RegisterData = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  privacyPolicyAccepted = false;
  passwordVisible = false;
  confirmPasswordVisible = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const emailParam = params.get('email');
      if (emailParam) {
        this.registerData.email = emailParam!;
      }
    });
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
    if (this.registerData.email && this.passwordsMatch()) {
      console.log('Register attempt:', this.registerData);
      // api call later
    }
  }
}