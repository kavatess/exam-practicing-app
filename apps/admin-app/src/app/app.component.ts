import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { filter, map, startWith } from 'rxjs';
import { AuthService } from './core/auth.service';
import { ADMIN_APP_ROUTES } from './app.routes';

interface NavLink {
  label: string;
  route: string;
  icon: string;
}

@Component({
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'admin-app';
  // Make enum available in the template for router links
  readonly ADMIN_APP_ROUTES = ADMIN_APP_ROUTES;

  readonly navLinks: NavLink[] = [
    { label: 'Dashboard', route: ADMIN_APP_ROUTES.DASHBOARD, icon: 'dashboard' },
    { label: 'Subject Management', route: ADMIN_APP_ROUTES.SUBJECT_MANAGEMENT, icon: 'menu_book' },
    { label: 'Question Bank', route: ADMIN_APP_ROUTES.QUESTION_BANK, icon: 'quiz' },
    { label: 'Achievement Management', route: ADMIN_APP_ROUTES.ACHIEVEMENT_MANAGEMENT, icon: 'emoji_events' },
    { label: 'Quest Management', route: ADMIN_APP_ROUTES.QUEST_MANAGEMENT, icon: 'flag' },
    { label: 'Shop Management', route: ADMIN_APP_ROUTES.SHOP_MANAGEMENT, icon: 'storefront' },
    { label: 'User Management', route: ADMIN_APP_ROUTES.USER_MANAGEMENT, icon: 'people' },
  ];

  pageTitle = '';

  constructor(
    public authService: AuthService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        startWith(null),
        map(() => {
          let route = this.activatedRoute.root;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route.snapshot.data['title'] || '';
        })
      )
      .subscribe((title) => (this.pageTitle = title));
  }

  get currentUser() {
    return this.authService.getCurrentUser();
  }

  get userInitials(): string {
    const user = this.currentUser;
    if (!user) return '';
    return `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/', ADMIN_APP_ROUTES.LOGIN]);
  }
}
