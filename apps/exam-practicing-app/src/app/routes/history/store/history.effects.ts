import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { HistoryStoreState } from './history.reducer';
import { HistoryService } from './history.service';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { HistoryActions } from './history.actions';
import { Router } from '@angular/router';
import { ResultTypes } from '@libs/models';

@Injectable()
export class HistoryEffects {
    private readonly actions$: Actions = inject(Actions);
    private readonly store: Store<HistoryStoreState> = inject(
        Store<HistoryStoreState>
    );

    constructor(
        private readonly service: HistoryService,
        private readonly router: Router
    ) {}

    readonly initHistory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(HistoryActions.initHistory),
            exhaustMap(() =>
                this.service.getHistoryList().pipe(
                    map((list) => HistoryActions.initHistorySuccess({ list })),
                    catchError((error) =>
                        of(HistoryActions.initHistoryFailure({ error }))
                    )
                )
            )
        )
    );

    readonly getResultDetails$ = createEffect(() =>
        this.actions$.pipe(
            ofType(HistoryActions.getResult),
            exhaustMap((action) => {
                const service =
                    action.resultType === ResultTypes.Test
                        ? this.service.getTestResult
                        : this.service.getPracticeResult;

                return service(action.testId).pipe(
                    map((data) => HistoryActions.getResultSuccess({ data })),
                    catchError((error) =>
                        of(HistoryActions.getResultFailure({ error }))
                    )
                );
            })
        )
    );
}
