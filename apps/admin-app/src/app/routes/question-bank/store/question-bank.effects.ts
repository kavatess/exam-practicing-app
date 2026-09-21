import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
    catchError,
    debounceTime,
    exhaustMap,
    map,
    of,
    switchMap,
    withLatestFrom,
} from 'rxjs';
import { SubjectManagementActions } from '../../subject-management/store/subject-management.actions';
import { SubjectManagementSelectors } from '../../subject-management/store/subject-management.selectors';
import { QuestionBankActions } from './question-bank.actions';
import { QuestionBankSelectors } from './question-bank.selectors';
import { QuestionBankService } from './question-bank.service';

@Injectable()
export class QuestionBankEffects {
    private readonly actions$: Actions = inject(Actions);
    private readonly store = inject(Store);
    private readonly service = inject(QuestionBankService);

    readonly loadQuestions$ = createEffect(() =>
        this.actions$.pipe(
            ofType(QuestionBankActions.loadQuestions),
            withLatestFrom(
                this.store.select(QuestionBankSelectors.Filter),
                this.store.select(SubjectManagementSelectors.Subjects)
            ),
            // A newer filter makes an in-flight read stale, so it is dropped.
            switchMap(([, filter, subjects]) =>
                this.service.queryQuestions(filter, subjects).pipe(
                    map(({ rows, matchCount, bankTotal }) =>
                        QuestionBankActions.loadQuestionsSuccess({
                            questions: rows,
                            matchCount,
                            bankTotal,
                        })
                    ),
                    catchError((error) =>
                        of(QuestionBankActions.loadQuestionsFailure({ error }))
                    )
                )
            )
        )
    );

    /** Every filter change re-queries; typing waits for a pause first. */
    readonly reloadOnFilterChange$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                QuestionBankActions.selectSubject,
                QuestionBankActions.toggleUnit,
                QuestionBankActions.toggleSubUnit,
                QuestionBankActions.selectType,
                QuestionBankActions.selectDifficulty,
                QuestionBankActions.toggleLevel,
                QuestionBankActions.resetFilters,
                QuestionBankActions.applyScope,
                QuestionBankActions.clearScope,
                QuestionBankActions.saveQuestionSuccess,
                QuestionBankActions.removeQuestionSuccess
            ),
            map(() => QuestionBankActions.loadQuestions())
        )
    );

    readonly reloadOnSearch$ = createEffect(() =>
        this.actions$.pipe(
            ofType(QuestionBankActions.search),
            debounceTime(250),
            map(() => QuestionBankActions.loadQuestions())
        )
    );

    /**
     * Questions are matched by criteria, so an edit to the taxonomy they are
     * tagged on changes what the bank returns.
     */
    readonly reloadOnTaxonomyChange$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                SubjectManagementActions.loadSubjectsSuccess,
                SubjectManagementActions.saveUnitSuccess,
                SubjectManagementActions.removeUnitSuccess,
                SubjectManagementActions.removeSubUnitSuccess
            ),
            map(() => QuestionBankActions.loadQuestions())
        )
    );

    readonly loadMatches$ = createEffect(() =>
        this.actions$.pipe(
            ofType(QuestionBankActions.loadMatches),
            exhaustMap(({ questionId }) =>
                this.service.getMatches(questionId).pipe(
                    map((matches) =>
                        QuestionBankActions.loadMatchesSuccess({
                            questionId,
                            matches,
                        })
                    ),
                    catchError((error) =>
                        of(QuestionBankActions.loadMatchesFailure({ error }))
                    )
                )
            )
        )
    );

    readonly saveQuestion$ = createEffect(() =>
        this.actions$.pipe(
            ofType(QuestionBankActions.saveQuestion),
            exhaustMap(({ questionId, draft }) =>
                this.service.saveQuestion(questionId, draft).pipe(
                    map((question) =>
                        QuestionBankActions.saveQuestionSuccess({ question })
                    ),
                    catchError((error) =>
                        of(QuestionBankActions.saveQuestionFailure({ error }))
                    )
                )
            )
        )
    );

    readonly removeQuestion$ = createEffect(() =>
        this.actions$.pipe(
            ofType(QuestionBankActions.removeQuestion),
            exhaustMap(({ questionId }) =>
                this.service.removeQuestion(questionId).pipe(
                    map((id) =>
                        QuestionBankActions.removeQuestionSuccess({
                            questionId: id,
                        })
                    ),
                    catchError((error) =>
                        of(
                            QuestionBankActions.removeQuestionFailure({
                                error,
                            })
                        )
                    )
                )
            )
        )
    );
}
