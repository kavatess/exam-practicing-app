import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NavigationMenuComponent } from './shared/components/navigation-menu/navigation-menu.component';
import { distinctUntilChanged, map } from 'rxjs';
import { APP_ROUTES } from './app.routes';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    imports: [CommonModule, RouterModule, NavigationMenuComponent],
    selector: 'epa-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    readonly APP_ROUTES = APP_ROUTES;
    readonly title = 'exam-practicing-app';

    constructor(private readonly route: ActivatedRoute) {}

    get currRoute$() {
        return this.route?.children[0]?.url.pipe(
            map((url) => url[0].path),
            distinctUntilChanged()
        );
    }
}
