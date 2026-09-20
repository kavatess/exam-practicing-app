import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, exhaustMap, map, Observable, of } from 'rxjs';
import { AdminExam } from '../../../shared/models/cms.model';
import { SubjectManagementActions } from '../../subject-management/store/subject-management.actions';
import { ExamsActions } from './exams.actions';
import { ExamsService } from './exams.service';

@Injectable()
export class ExamsEffects {
    private readonly actions$: Actions = inject(Actions);
    private readonly service = inject(ExamsService);

    readonly loadExams$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ExamsActions.loadExams),
            exhaustMap(() =>
                this.service.getExams().pipe(
                    map((exams) => ExamsActions.loadExamsSuccess({ exams })),
                    catchError((error) =>
                        of(ExamsActions.loadExamsFailure({ error }))
                    )
                )
            )
        )
    );

    readonly saveExam$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ExamsActions.saveExam),
            exhaustMap(({ examId, draft }) =>
                this.service.saveExam(examId, draft).pipe(
                    map((exam) =>
                        ExamsActions.saveExamSuccess({
                            exam,
                            created: !examId,
                        })
                    ),
                    catchError((error) =>
                        of(ExamsActions.saveExamFailure({ error }))
                    )
                )
            )
        )
    );

    readonly removeExam$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ExamsActions.removeExam),
            exhaustMap(({ examId }) =>
                this.service.removeExam(examId).pipe(
                    map((id) => ExamsActions.removeExamSuccess({ examId: id })),
                    catchError((error) =>
                        of(ExamsActions.removeExamFailure({ error }))
                    )
                )
            )
        )
    );

    readonly addSection$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ExamsActions.addSection),
            exhaustMap(({ examId, draft }) =>
                this.written(
                    this.service.addSection(examId, draft),
                    ExamsActions.addSectionSuccess,
                    ExamsActions.addSectionFailure
                )
            )
        )
    );

    readonly removeSection$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ExamsActions.removeSection),
            exhaustMap(({ examId, sectionId }) =>
                this.written(
                    this.service.removeSection(examId, sectionId),
                    ExamsActions.removeSectionSuccess,
                    ExamsActions.removeSectionFailure
                )
            )
        )
    );

    readonly saveSectionScope$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ExamsActions.saveSectionScope),
            exhaustMap(({ examId, sectionId, unitIds }) =>
                this.written(
                    this.service.saveSectionScope(examId, sectionId, unitIds),
                    ExamsActions.saveSectionScopeSuccess,
                    ExamsActions.saveSectionScopeFailure
                )
            )
        )
    );

    readonly saveMold$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ExamsActions.saveMold),
            exhaustMap(({ examId, moldId, draft }) =>
                this.written(
                    this.service.saveMold(examId, moldId, draft),
                    ExamsActions.saveMoldSuccess,
                    ExamsActions.saveMoldFailure
                )
            )
        )
    );

    readonly removeMold$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ExamsActions.removeMold),
            exhaustMap(({ examId, moldId }) =>
                this.written(
                    this.service.removeMold(examId, moldId),
                    ExamsActions.removeMoldSuccess,
                    ExamsActions.removeMoldFailure
                )
            )
        )
    );

    readonly addPage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ExamsActions.addPage),
            exhaustMap(({ examId, moldId }) =>
                this.written(
                    this.service.addPage(examId, moldId),
                    ExamsActions.addPageSuccess,
                    ExamsActions.addPageFailure
                )
            )
        )
    );

    readonly addBlock$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ExamsActions.addBlock),
            exhaustMap(({ examId, moldId, pageId }) =>
                this.written(
                    this.service.addBlock(examId, moldId, pageId),
                    ExamsActions.addBlockSuccess,
                    ExamsActions.addBlockFailure
                )
            )
        )
    );

    readonly removeBlock$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ExamsActions.removeBlock),
            exhaustMap(({ examId, moldId, pageId, blockId }) =>
                this.written(
                    this.service.removeBlock(examId, moldId, pageId, blockId),
                    ExamsActions.removeBlockSuccess,
                    ExamsActions.removeBlockFailure
                )
            )
        )
    );

    readonly patchBlock$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ExamsActions.patchBlock),
            // Block edits fire on every keystroke and select change, so they
            // queue rather than dropping whatever lands mid-write.
            concatMap(({ examId, moldId, pageId, blockId, changes }) =>
                this.written(
                    this.service.patchBlock(
                        examId,
                        moldId,
                        pageId,
                        blockId,
                        changes
                    ),
                    ExamsActions.patchBlockSuccess,
                    ExamsActions.patchBlockFailure
                )
            )
        )
    );

    /** Deleting a subject unit has to clear it out of every exam that used it. */
    readonly dropUnitOnSubjectUnitRemoved$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SubjectManagementActions.removeUnitSuccess),
            map(({ unitId }) => ExamsActions.dropUnit({ unitId }))
        )
    );

    readonly dropUnit$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ExamsActions.dropUnit),
            exhaustMap(({ unitId }) =>
                this.service.dropUnit(unitId).pipe(
                    map((exams) => ExamsActions.dropUnitSuccess({ exams })),
                    catchError((error) =>
                        of(ExamsActions.dropUnitFailure({ error }))
                    )
                )
            )
        )
    );

    /**
     * Every exam write answers with the updated exam, so they all fold into the
     * same success/failure shape.
     */
    private written<S, F>(
        write$: Observable<AdminExam>,
        success: (props: { exam: AdminExam }) => S,
        failure: (props: { error: unknown }) => F
    ): Observable<S | F> {
        return write$.pipe(
            map((exam) => success({ exam })),
            catchError((error) => of(failure({ error })))
        );
    }
}
