import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Global footer component.
 * Displays static links to legal pages like privacy policy and imprint.
 * 
 * @example
 * <app-footer />
 */
@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}