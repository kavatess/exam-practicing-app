import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { PracticeStoreState } from './practice.reducer';
import { PracticeService } from './practice.service';
import {
    catchError,
    exhaustMap,
    map,
    of,
    switchMap,
    withLatestFrom,
} from 'rxjs';
import { PracticeActions } from './practice.actions';
import { PracticeSelectors } from './practice.selectors';
import { Router } from '@angular/router';
import { APP_ROUTES } from '../../../app.routes';

@Injectable()
export class PracticeEffects {
    private readonly actions$: Actions = inject(Actions);
    private readonly store: Store<PracticeStoreState> = inject(
        Store<PracticeStoreState>
    );

    constructor(
        private readonly service: PracticeService,
        private readonly router: Router
    ) {}

    readonly getPracticeExam$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PracticeActions.getPracticeExam),
            exhaustMap((action) =>
                this.service.getPracticeTest(action.practiceId).pipe(
                    map((data) =>
                        PracticeActions.getPracticeExamSuccess({ data })
                    ),
                    catchError((error) =>
                        of(PracticeActions.getPracticeExamFailure({ error }))
                    )
                )
            )
        )
    );

    readonly checkAnswer$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PracticeActions.checkAnswer),
            withLatestFrom(
                this.store.select(PracticeSelectors.CurrQuestion),
                this.store.select(PracticeSelectors.UserAnswer)
            ),
            exhaustMap(([, question, answer]) => {
                const isCorrect = question.data.answer === answer;
                return of(PracticeActions.checkAnswerSuccess({ isCorrect }));
            })
        )
    );

    readonly continue$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PracticeActions.continue),
            withLatestFrom(
                this.store.select(PracticeSelectors.CurrIndex),
                this.store.select(PracticeSelectors.Questions),
                this.store.select(PracticeSelectors.PracticeId)
            ),
            exhaustMap(([, currIndex, questions, practiceId]) => {
                if (currIndex === questions.length - 1) {
                    this.router.navigate([
                        APP_ROUTES.PRACTICE,
                        practiceId,
                        'result',
                    ]);
                    return of(null);
                } else {
                    return of(PracticeActions.nextQuestion());
                }
            })
        )
    );

    readonly complete$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PracticeActions.complete),
            withLatestFrom(
                this.store.select(PracticeSelectors.PracticeId),
                this.store.select(PracticeSelectors.PracticeExam)
            ),
            switchMap(([, practiceId, data]) =>
                this.service.completePractice(practiceId as string, data).pipe(
                    map((result) =>
                        PracticeActions.completeSuccess({ result })
                    ),
                    catchError((error) =>
                        of(PracticeActions.completeFalure({ error }))
                    )
                )
            )
        )
    );
}
