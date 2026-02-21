import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { AuthService } from '../../../shared/services/auth.service';
import { ToastService } from '../../../shared/services/toast.service';
import { ActivationResponse } from '../../../shared/interfaces/auth.interface';

@Component({
  selector: 'app-activate-account',
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.scss'
})
export class ActivateAccountComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);

  ngOnInit(): void {
    const uid = this.route.snapshot.paramMap.get('uid');
    const token = this.route.snapshot.paramMap.get('token');

    if (uid && token) {
      this.activate(uid, token);
    } else {
      this.handleError('Invalid activation link.');
    }
  }
  
  activate(uid: string, token: string) {
    this.authService.activateAccount(uid, token).subscribe({
      next: (response: ActivationResponse) => {
        const msg = response.message || 'Account successfully activated! You can now log in.';
        this.toastService.show(msg, 'success');
        setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2800);
      },
      error: (error) => {
        console.error('Activation error:', error);
        this.handleError('Activation failed or link expired.');
      }
    });
  }

  handleError(msg: string) {
    this.toastService.show(msg, 'error');
    setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2800);
  }
}