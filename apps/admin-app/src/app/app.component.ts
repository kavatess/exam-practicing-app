import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from './core/auth.service';
import { CommonModule } from '@angular/common';
import { ADMIN_APP_ROUTES } from './app.routes';

@Component({
  standalone: true,
  imports: [RouterModule, CommonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'admin-app';
  // Make enum available in the template for router links
  readonly ADMIN_APP_ROUTES = ADMIN_APP_ROUTES;

  constructor(public authService: AuthService) {}
}
