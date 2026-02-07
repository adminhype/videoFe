import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { ForgotPasswordData } from "../../../shared/interfaces/auth.interface";

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

  constructor() {}

  onSubmit() {
    if (this.forgotData.email) {
      console.log('Reset Password E-Mail send to:', this.forgotData.email);
      // api call 
      // toast message
    }
  }
}