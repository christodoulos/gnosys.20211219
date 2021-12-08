import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'gnosys-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'imsafer';
  active = '';

  constructor(private router: Router) {}

  navigateTo(path: string) {
    this.active = path;
    this.router.navigate([path]);
  }

  outletColor() {
    switch (this.active) {
      case 'robust':
        return 'red';
      case 'firesafety':
        return 'green';
      case 'evacuation':
        return 'yellow';
      case 'risk':
        return 'indigo';
      default:
        return 'grey';
    }
  }
}
