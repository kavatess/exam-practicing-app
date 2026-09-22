import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { DashboardActions } from './dashboard.actions';
import { DashboardSelectors } from './dashboard.selectors';
import { DashboardService } from './dashboard.service';

@Injectable()
export class DashboardEffects {
    private readonly actions$: Actions = inject(Actions);
    private readonly store = inject(Store);
    private readonly service = inject(DashboardService);

    readonly loadDashboard$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DashboardActions.loadDashboard),
            withLatestFrom(
                this.store.select(DashboardSelectors.RevenueRange),
                this.store.select(DashboardSelectors.TestsRange),
                this.store.select(DashboardSelectors.ExamsRange)
            ),
            // A newer range makes an in-flight read stale, so it is dropped.
            switchMap(([, revenueRange, testsRange, examsRange]) =>
                this.service
                    .getDashboard({ revenueRange, testsRange, examsRange })
                    .pipe(
                        map((snapshot) =>
                            DashboardActions.loadDashboardSuccess({ snapshot })
                        ),
                        catchError((error) =>
                            of(
                                DashboardActions.loadDashboardFailure({
                                    error,
                                })
                            )
                        )
                    )
            )
        )
    );

    /** Any range change re-reads; the server buckets, so the client can't. */
    readonly reloadOnRangeChange$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                DashboardActions.selectRevenueRange,
                DashboardActions.selectTestsRange,
                DashboardActions.selectExamsRange
            ),
            map(() => DashboardActions.loadDashboard())
        )
    );
}
