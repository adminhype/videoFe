import { Injectable, signal } from '@angular/core';
import { ToastType, ToastMessage } from '../interfaces/toast.interface';

/**
 * Manages the state of the global toast notification.
 * Uses Angular Signals to provide reactive updates to the UI.
 */
@Injectable({
  providedIn: 'root'
})
export class ToastService {
  /** 
   * Signal holding the current toast message. 
   * Null means no toast is currently visible. 
   */
  toastState = signal<ToastMessage | null>(null);
  private timeoutId: ReturnType<typeof setTimeout> | undefined;
  
  /**
   * Displays a toast notification and automatically hides it after a delay.
   * If a toast is already visible, it will be replaced.
   * 
   * @param text The message to display.
   * @param type The visual style ('success' or 'error'). Defaults to 'success'.
   * @param duration Time in milliseconds before the toast disappears. Defaults to 3000ms.
   */
  show(text: string, type: ToastType = 'success', duration: number = 3000){
    if(this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.toastState.set({ text, type });
    this.timeoutId = setTimeout(() => {
      this.close();
    }, duration);
  }

  /**
   * Manually closes the currently visible toast notification and clears the timer.
   */
  close() {
    this.toastState.set(null);
    if(this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
  }
}