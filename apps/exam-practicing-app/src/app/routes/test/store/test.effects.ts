import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TestService } from './test.service';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { TestActions } from './test.actions';
import { TestStoreState } from './test.reducer';

@Injectable()
export class LibraryEffects {
    private readonly actions$: Actions = inject(Actions);
    private readonly store: Store<TestStoreState> = inject(
        Store<TestStoreState>
    );

    constructor(private readonly service: TestService) {}

    readonly getTest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TestActions.getTest),
            exhaustMap((action) =>
                this.service.getTestById(action.testId).pipe(
                    map((data) => TestActions.getTestSuccess({ data })),
                    catchError((error) =>
                        of(TestActions.getTestFailure({ error }))
                    )
                )
            )
        )
    );
}
