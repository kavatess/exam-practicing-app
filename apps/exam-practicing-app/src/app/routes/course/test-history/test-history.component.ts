import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { CourseStoreState } from '../store/course.reducer';
import { CourseSelectors } from '../store/course.selectors';
import { TestTypePipe } from '@libs/angular';
import { CourseActions } from '../store/course.actions';
import { TestTypes } from '@libs/models';

@Component({
    selector: 'epa-test-history',
    standalone: true,
    imports: [CommonModule, TestTypePipe],
    templateUrl: './test-history.component.html',
    styleUrl: './test-history.component.scss',
})
export class TestHistoryComponent implements OnInit {
    readonly TestTypes = TestTypes;

    constructor(private readonly store: Store<CourseStoreState>) {}

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
