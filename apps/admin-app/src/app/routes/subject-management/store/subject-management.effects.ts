import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { SubjectManagementActions } from './subject-management.actions';
import { SubjectManagementService } from './subject-management.service';

@Injectable()
export class SubjectManagementEffects {
    private readonly actions$: Actions = inject(Actions);
    private readonly service = inject(SubjectManagementService);

    readonly loadSubjects$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SubjectManagementActions.loadSubjects),
            exhaustMap(() =>
                this.service.getSubjects().pipe(
                    map((subjects) =>
                        SubjectManagementActions.loadSubjectsSuccess({
                            subjects,
                        })
                    ),
                    catchError((error) =>
                        of(
                            SubjectManagementActions.loadSubjectsFailure({
                                error,
                            })
                        )
                    )
                )
            )
        )
    );

    readonly createSubject$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SubjectManagementActions.createSubject),
            exhaustMap(({ draft }) =>
                this.service.createSubject(draft).pipe(
                    map((subject) =>
                        SubjectManagementActions.createSubjectSuccess({
                            subject,
                        })
                    ),
                    catchError((error) =>
                        of(
                            SubjectManagementActions.createSubjectFailure({
                                error,
                            })
                        )
                    )
                )
            )
        )
    );

    readonly updateSubject$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SubjectManagementActions.updateSubject),
            exhaustMap(({ subjectId, draft }) =>
                this.service.updateSubject(subjectId, draft).pipe(
                    map((subject) =>
                        SubjectManagementActions.updateSubjectSuccess({
                            subject,
                        })
                    ),
                    catchError((error) =>
                        of(
                            SubjectManagementActions.updateSubjectFailure({
                                error,
                            })
                        )
                    )
                )
            )
        )
    );

    readonly saveUnit$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SubjectManagementActions.saveUnit),
            exhaustMap(({ subjectId, unitId, draft }) =>
                this.service.saveUnit(subjectId, unitId, draft).pipe(
                    map((subject) =>
                        SubjectManagementActions.saveUnitSuccess({ subject })
                    ),
                    catchError((error) =>
                        of(SubjectManagementActions.saveUnitFailure({ error }))
                    )
                )
            )
        )
    );

    readonly removeUnit$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SubjectManagementActions.removeUnit),
            exhaustMap(({ subjectId, unitId }) =>
                this.service.removeUnit(subjectId, unitId).pipe(
                    map((subject) =>
                        SubjectManagementActions.removeUnitSuccess({
                            subject,
                            unitId,
                        })
                    ),
                    catchError((error) =>
                        of(
                            SubjectManagementActions.removeUnitFailure({
                                error,
                            })
                        )
                    )
                )
            )
        )
    );

    readonly removeSubUnit$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SubjectManagementActions.removeSubUnit),
            exhaustMap(({ subjectId, unitId, subUnitId }) =>
                this.service.removeSubUnit(subjectId, unitId, subUnitId).pipe(
                    map((subject) =>
                        SubjectManagementActions.removeSubUnitSuccess({
                            subject,
                        })
                    ),
                    catchError((error) =>
                        of(
                            SubjectManagementActions.removeSubUnitFailure({
                                error,
                            })
                        )
                    )
                )
            )
        )
    );
}
