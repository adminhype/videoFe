import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { FooterComponent } from "../../../shared/components/footer/footer.component";

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  email: string = '';

  constructor() {}

  onSubmit() {
    if (this.email) {
      console.log('Reset Password E-Mail send to:', this.email);
      // api call 
      // toast message
    }
  }
}