import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CourseStoreState } from './course.reducer';
import { LibraryService } from './course.service';
import { catchError, exhaustMap, map, of, withLatestFrom } from 'rxjs';
import { CourseActions } from './course.actions';
import { CourseSelectors } from './course.selectors';

@Injectable()
export class CourseEffects {
    private readonly actions$: Actions = inject(Actions);
    private readonly store: Store<CourseStoreState> = inject(
        Store<CourseStoreState>
    );

    constructor(private readonly service: LibraryService) {}

    readonly getCourseById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CourseActions.getCourseById),
            exhaustMap((action) =>
                this.service.getCourseById(action.courseId).pipe(
                    map((data) => CourseActions.getCourseByIdSuccess({ data })),
                    catchError((error) =>
                        of(CourseActions.getCourseByIdFailure({ error }))
                    )
                )
            )
        )
    );

    readonly getTestHistory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CourseActions.getTestHistory),
            withLatestFrom(
                this.store.select(CourseSelectors.CourseID),
                this.store.select(CourseSelectors.TestHistoryPagination)
            ),
            exhaustMap(([, courseId, pagination]) =>
                this.service.getTestHistory(courseId, pagination).pipe(
                    map((list) =>
                        CourseActions.getTestHistorySuccess({ list })
                    ),
                    catchError((error) =>
                        of(CourseActions.getTestHistoryFailure({ error }))
                    )
                )
            )
        )
    );

    readonly changeHistoryPage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CourseActions.changeHistoryPage),
            withLatestFrom(
                this.store.select(CourseSelectors.CourseID),
                this.store.select(CourseSelectors.TestHistoryPagination)
            ),
            exhaustMap(([action, courseId, pagination]) =>
                this.service
                    .getTestHistory(courseId, {
                        ...pagination,
                        page: action.page,
                    })
                    .pipe(
                        map((list) =>
                            CourseActions.getTestHistorySuccess({ list })
                        ),
                        catchError((error) =>
                            of(CourseActions.getTestHistoryFailure({ error }))
                        )
                    )
            )
        )
    );
}
