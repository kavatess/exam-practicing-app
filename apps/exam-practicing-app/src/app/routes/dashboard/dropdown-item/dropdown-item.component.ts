import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { DropdownItemDirective } from './dropdown-item.directive';
import { DashboardStoreState } from '../store/dashboard.reducer';
import { Store } from '@ngrx/store';
import {
    CourseSelectors,
    EnergiesSelectors,
    GemsSelectors,
    StreakSelectors,
} from '../store/dashboard.selectors';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { APP_ROUTES } from '../../../app.routes';
import $ from 'jquery';

@Component({
    selector: 'epa-dropdown-item',
    standalone: true,
    imports: [
        CommonModule,
        DropdownItemDirective,
        NgbDropdownModule,
        MatButtonModule,
        RouterModule,
    ],
    templateUrl: './dropdown-item.component.html',
    styleUrl: './dropdown-item.component.scss',
})
export class DropdownItemComponent implements OnInit {
    readonly daysOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

    constructor(
        private readonly store: Store<DashboardStoreState>,
        private readonly router: Router
    ) {}

    get courses$() {
        return this.store.select(CourseSelectors.CourseList);
    }

    get selectedCourse$() {
        return this.store.select(CourseSelectors.CourseData);
    }

    get streakDays$() {
        return this.store.select(StreakSelectors.StreakDays);
    }

    get energies$() {
        return this.store.select(EnergiesSelectors.EnergyAmount);
    }

    get gems$() {
        return this.store.select(GemsSelectors.GemAmount);
    }

    ngOnInit(): void {
        $(document).ready(function () {
            $('.dropdown').hover(
                function () {
                    $(this).addClass('hovering');
                },
                function () {
                    $(this).removeClass('hovering');
                }
            );
        });
    }

    navigateToShop() {
        this.router.navigate([APP_ROUTES.SHOP]);
    }
}
