import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './shared/components/toast/toast.component';

/**
 * The root component of the Videoflix application.
 * Serves as the main layout container for the router and hosts global UI elements.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
  /** The internal name of the application. */
  title = 'videoflix.frontend';
}