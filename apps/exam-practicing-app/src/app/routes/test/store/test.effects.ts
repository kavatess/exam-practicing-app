import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TestService } from './test.service';
import { catchError, exhaustMap, map, of, withLatestFrom } from 'rxjs';
import { TestActions } from './test.actions';
import { TestStoreState } from './test.reducer';
import { TestSelectors } from './test.selectors';
import { Router } from '@angular/router';
import { APP_ROUTES } from '../../../app.routes';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class TestEffects {
    private readonly actions$: Actions = inject(Actions);
    private readonly router: Router = inject(Router);
    private readonly store: Store<TestStoreState> = inject(
        Store<TestStoreState>
    );

    constructor(
        private readonly service: TestService,
        private readonly modalService: NgbModal
    ) {}

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

    readonly submitTest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TestActions.submitTest),
            withLatestFrom(this.store.select(TestSelectors.TestData)),
            exhaustMap(([, data]) =>
                this.service.submitTest(data).pipe(
                    map((data) => {
                        this.modalService.dismissAll();
                        this.router.navigate([APP_ROUTES.HISTORY, data.id]);
                        return TestActions.submitTestSuccess({ data });
                    }),
                    catchError((error) =>
                        of(TestActions.submitTestFailure({ error }))
                    )
                )
            )
        )
    );
}
