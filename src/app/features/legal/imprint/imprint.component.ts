import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-imprint',
  imports: [CommonModule],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.scss'
})
export class ImprintComponent {
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}