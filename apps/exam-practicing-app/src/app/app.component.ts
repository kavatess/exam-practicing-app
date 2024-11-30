import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationMenuComponent } from './shared/components/navigation-menu/navigation-menu.component';

@Component({
    standalone: true,
    imports: [RouterModule, NavigationMenuComponent],
    selector: 'epa-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'exam-practicing-app';
}
