import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-privacy',
  imports: [CommonModule],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss'
})
export class PrivacyComponent {
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}