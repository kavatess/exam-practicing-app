import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownItemComponent } from './dropdown-item/dropdown-item.component';
import { QuestListComponent } from './quest-list/quest-list.component';

@Component({
    selector: 'epa-dashboard',
    standalone: true,
    imports: [CommonModule, DropdownItemComponent, QuestListComponent],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
