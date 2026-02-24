import { CommonModule} from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Global header component.
 * Contains the main navigation and optionally a login button.
 * 
 * @example
 * <app-header [showLoginButton]="false" />
 */
@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  /**
   * Determines if the login button should be visible.
   * @default true
   */
  @Input() showLoginButton: boolean = true;
}