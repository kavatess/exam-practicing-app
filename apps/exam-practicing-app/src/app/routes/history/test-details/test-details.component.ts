import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { HistoryStoreState } from '../store/history.reducer';
import { HistoryActions } from '../store/history.actions';
import { HistorySelectors } from '../store/history.selectors';
import { QuestionStates, ResultTypes } from '@libs/models';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { NgCircleProgressModule } from 'ng-circle-progress';

@Component({
    selector: 'epa-test-details',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatProgressBarModule,
        MatIconModule,
        NgCircleProgressModule,
    ],
    templateUrl: './test-details.component.html',
    styleUrl: './test-details.component.scss',
})
export class TestDetailsComponent implements OnInit {
    readonly QuestionStates = QuestionStates;

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly store: Store<HistoryStoreState>
    ) {}

    get testId() {
        return this.activatedRoute.snapshot.params['id'] || '';
    }

    get result$() {
        return this.store.select(HistorySelectors.ResultDetails);
    }

    ngOnInit(): void {
        this.store.dispatch(
            HistoryActions.getResult({
                testId: this.testId,
                resultType: ResultTypes.Practice,
            })
        );
    }
}
