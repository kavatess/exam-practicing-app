import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { TestTypePipe } from '@libs/angular';
import { TestTypes } from '@libs/models';
import { DashboardStoreState } from '../store/dashboard.reducer';
import { CourseSelectors } from '../store/dashboard.selectors';
import { CourseActions } from '../store/dashboard.actions';

@Component({
    selector: 'epa-test-history',
    standalone: true,
    imports: [CommonModule, TestTypePipe],
    templateUrl: './test-history.component.html',
    styleUrl: './test-history.component.scss',
})
export class TestHistoryComponent implements OnInit {
    readonly TestTypes = TestTypes;

    constructor(private readonly store: Store<DashboardStoreState>) {}

    get testList$() {
        return this.store.select(CourseSelectors.TestHistoryList);
    }

    ngOnInit(): void {
        this.store.dispatch(CourseActions.getTestHistory());
    }

    changePage(page: number) {
        this.store.dispatch(CourseActions.changeHistoryPage({ page }));
    }
}
