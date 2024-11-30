import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { APP_ROUTES } from '../../../app.routes';

@Component({
    selector: 'epa-navigation-menu',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './navigation-menu.component.html',
    styleUrls: ['./navigation-menu.component.scss'],
})
export class NavigationMenuComponent {
    readonly AppRoutes = APP_ROUTES;

    constructor(private readonly routerService: Router) {}

    get currentRoute() {
        return this.routerService.url.split('/')[1] || '';
    }

    navigateTo(route: string) {
        this.routerService.navigate([route]);
    }
}
