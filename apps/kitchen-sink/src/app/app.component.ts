import { Component } from '@angular/core';

import { MenuItem } from '@mono/navigation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  menuItems: MenuItem[] = [
    { name: 'Home', route: '/', icon: 'home' }
  ];

  constructor() { }
}
