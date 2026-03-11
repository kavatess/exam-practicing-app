import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownItemComponent } from '../dashboard/dropdown-item/dropdown-item.component';
import { QuestListComponent } from '../dashboard/quest-list/quest-list.component';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { ShopStoreState } from './store/shop.reducer';
import { ShopActions } from './store/shop.actions';
import { ShopSelectors } from './store/shop.selectors';
import { Observable } from 'rxjs';
import { ShopSection } from '@libs/models';

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
export class ShopComponent implements OnInit {
    shopList$: Observable<ShopSection[] | null>;

    constructor(private readonly store: Store<ShopStoreState>) {
        this.shopList$ = this.store.select(ShopSelectors.ShopList);
    }

    ngOnInit(): void {
        this.store.dispatch(ShopActions.getShopList());
    }
}
