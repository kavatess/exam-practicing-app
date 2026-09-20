import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from './core/auth.service';
import { CommonModule } from '@angular/common';
import { ADMIN_APP_ROUTES } from './app.routes';

interface AdmNavItem {
  route: string;
  label: string;
  icon: string;
}

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

  readonly navItems: AdmNavItem[] = [
    {
      route: ADMIN_APP_ROUTES.DASHBOARD,
      label: 'Dashboard',
      icon: 'M4 4h6v7H4V4Zm0 9h6v7H4v-7Zm10-9h6v5h-6V4Zm0 7h6v9h-6v-9Z',
    },
    {
      route: ADMIN_APP_ROUTES.SUBJECT_MANAGEMENT,
      label: 'Subject Management',
      icon: 'M5 5a2 2 0 0 1 2-2h11v16H7a2 2 0 0 0-2 2V5Zm2 12h11',
    },
    {
      route: ADMIN_APP_ROUTES.EXAMS,
      label: 'Exams',
      icon: 'M8 3h8a1 1 0 0 1 1 1v16l-5-2.5L7 20V4a1 1 0 0 1 1-1Zm1.5 5h5',
    },
    {
      route: ADMIN_APP_ROUTES.QUESTION_BANK,
      label: 'Question Bank',
      icon: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 13.5v.01M9.6 9.3a2.5 2.5 0 1 1 3.6 2.4c-.7.4-1.2 1-1.2 1.8',
    },
    {
      route: ADMIN_APP_ROUTES.USER_MANAGEMENT,
      label: 'User Management',
      icon: 'M16 19v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M9.5 10.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM17 4.6a3.5 3.5 0 0 1 0 6.8M21 19v-1a4 4 0 0 0-3-3.8',
    },
    {
      route: ADMIN_APP_ROUTES.ACHIEVEMENT_MANAGEMENT,
      label: 'Achievements',
      icon: 'M8 3h8l-1.6 5.2M8 3l1.6 5.2M12 21a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z',
    },
    {
      route: ADMIN_APP_ROUTES.QUEST_MANAGEMENT,
      label: 'Quests',
      icon: 'M6 21V4h11l-1.6 3.5L17 11H6',
    },
    {
      route: ADMIN_APP_ROUTES.SHOP_MANAGEMENT,
      label: 'Shop',
      icon: 'M5 8h14l-1 12H6L5 8Zm4 0V6a3 3 0 0 1 6 0v2',
    },
    {
      route: ADMIN_APP_ROUTES.ORDERS_PAYMENTS,
      label: 'Orders & Payments',
      icon: 'M3 7h18v11H3V7Zm0 4.5h18M6 15h4',
    },
  ];

  constructor(public authService: AuthService) {}
}
