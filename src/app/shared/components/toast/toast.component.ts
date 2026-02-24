import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

/**
 * Displays global toast notifications to the user.
 * It automatically listens to the injected ToastService for new messages.
 * 
 * @example
 * <app-toast />
 */
@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
  /** 
   * The service that manages the toast state and messages. 
   * It is public so it can be used directly in the HTML template.
   */
  toastService = inject(ToastService);
}