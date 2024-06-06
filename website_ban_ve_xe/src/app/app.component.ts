import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'website_ban_ve_xe';
  loader: boolean = true;

  constructor() {
  
  }
}
