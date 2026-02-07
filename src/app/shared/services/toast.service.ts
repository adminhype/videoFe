import { Injectable, signal } from '@angular/core';
import { ToastType, ToastMessage } from '../interfaces/toast.interface';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toastState = signal<ToastMessage | null>(null);
  private timeoutId: ReturnType<typeof setTimeout> | undefined;
  
  show(text: string, type: ToastType = 'success', duration: number = 3000){
    if(this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.toastState.set({ text, type });
    this.timeoutId = setTimeout(() => {
      this.close();
    }, duration);
  }

  close() {
    this.toastState.set(null);
    if(this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
  }
}
