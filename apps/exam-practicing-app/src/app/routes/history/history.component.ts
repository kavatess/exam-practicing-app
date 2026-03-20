import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { HistoryStoreState } from './store/history.reducer';
import { HistoryActions } from './store/history.actions';
import { HistorySelectors } from './store/history.selectors';
import { Observable } from 'rxjs';
import { Result, ResultTypes } from '@libs/models';
import { Router } from '@angular/router';
import { APP_ROUTES } from '../../app.routes';

@Component({
    selector: 'epa-history',
    standalone: true,
    imports: [CommonModule, DatePipe],
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
    historyList$: Observable<Result[]>;
    ResultTypes = ResultTypes;

    constructor(
        private readonly store: Store<HistoryStoreState>,
        private readonly router: Router
    ) {
        this.historyList$ = this.store.select(HistorySelectors.ResultList);
    }

    ngOnInit(): void {
        this.store.dispatch(HistoryActions.initHistory());
    }

    formatDuration(mseconds: number): string {
        if (isNaN(mseconds) || mseconds < 0) {
            return '0m';
        }
        const minutes = Math.round(mseconds / 60 / 1000);
        return `${minutes}m`;
    }

    getScorePercentage(result: Result): number {
        if (!result.score || !result.maxScore) {
            return 0;
        }
        return (result.score / result.maxScore) * 100;
    }

    viewResultDetails(result: Result): void {
        const resultId = result.testId || result.practiceId;
        if (!resultId) return;

        // Assuming the route is /history/details/:type/:id
        this.router.navigate([APP_ROUTES.HISTORY, resultId]);
    }
}
