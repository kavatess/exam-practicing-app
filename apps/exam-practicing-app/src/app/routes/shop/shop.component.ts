import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownItemComponent } from '../dashboard/dropdown-item/dropdown-item.component';
import { QuestListComponent } from '../dashboard/quest-list/quest-list.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'epa-shop',
    standalone: true,
    imports: [
        CommonModule,
        DropdownItemComponent,
        QuestListComponent,
        MatButtonModule,
    ],
    templateUrl: './shop.component.html',
    styleUrl: './shop.component.scss',
})
export class ShopComponent {}
