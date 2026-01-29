import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-landing',
  imports: [HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

}
