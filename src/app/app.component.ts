import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
  
} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'rutas';

  constructor(private router: Router) {}

  goTo(path: string) {
    this.router.navigate([path]);
  }
}
