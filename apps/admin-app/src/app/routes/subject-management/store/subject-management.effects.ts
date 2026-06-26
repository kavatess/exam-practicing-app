import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, filter, map, of, withLatestFrom } from 'rxjs';
import { CourseActions, SubjectActions } from './subject-management.actions';
import { SubjectManagementState } from './subject-management.reducer';
import { selectSelectedSubjectId } from './subject-management.selectors';
import { SubjectManagementService } from './subject-management.service';

@Injectable()
export class SubjectManagementEffects {
  private readonly actions$ = inject(Actions);
  private readonly service = inject(SubjectManagementService);
  private readonly store = inject(Store<SubjectManagementState>);

  loadSubjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubjectActions.loadSubjects),
      exhaustMap(() =>
        this.service.getSubjects().pipe(
          map((subjects) => SubjectActions.loadSubjectsSuccess({ subjects })),
          catchError((error) =>
            of(SubjectActions.loadSubjectsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  createSubject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubjectActions.createSubject),
      exhaustMap(({ subject }) =>
        this.service.createSubject(subject).pipe(
          map((created) => SubjectActions.createSubjectSuccess({ subject: created })),
          catchError((error) =>
            of(SubjectActions.createSubjectFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateSubject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubjectActions.updateSubject),
      exhaustMap(({ id, subject }) =>
        this.service.updateSubject(id, subject).pipe(
          map((updated) => SubjectActions.updateSubjectSuccess({ subject: updated })),
          catchError((error) =>
            of(SubjectActions.updateSubjectFailure({ error: error.message }))
          )
        )
      )
    )
  );

  deleteSubject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubjectActions.deleteSubject),
      exhaustMap(({ id }) =>
        this.service.deleteSubject(id).pipe(
          map(() => SubjectActions.deleteSubjectSuccess({ id })),
          catchError((error) =>
            of(SubjectActions.deleteSubjectFailure({ error: error.message }))
          )
        )
      )
    )
  );

  refreshSubjectsAfterMutation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        SubjectActions.createSubjectSuccess,
        SubjectActions.updateSubjectSuccess,
        SubjectActions.deleteSubjectSuccess
      ),
      map(() => SubjectActions.loadSubjects())
    )
  );

  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.loadCourses),
      exhaustMap(({ subjectId }) =>
        this.service.getCourses(subjectId).pipe(
          map((courses) => CourseActions.loadCoursesSuccess({ courses })),
          catchError((error) =>
            of(CourseActions.loadCoursesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.createCourse),
      exhaustMap(({ course }) =>
        this.service.createCourse(course).pipe(
          map((created) => CourseActions.createCourseSuccess({ course: created })),
          catchError((error) =>
            of(CourseActions.createCourseFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.updateCourse),
      exhaustMap(({ id, course }) =>
        this.service.updateCourse(id, course).pipe(
          map((updated) => CourseActions.updateCourseSuccess({ course: updated })),
          catchError((error) =>
            of(CourseActions.updateCourseFailure({ error: error.message }))
          )
        )
      )
    )
  );

  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.deleteCourse),
      exhaustMap(({ id }) =>
        this.service.deleteCourse(id).pipe(
          map(() => CourseActions.deleteCourseSuccess({ id })),
          catchError((error) =>
            of(CourseActions.deleteCourseFailure({ error: error.message }))
          )
        )
      )
    )
  );

  refreshCoursesAfterMutation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        CourseActions.createCourseSuccess,
        CourseActions.updateCourseSuccess,
        CourseActions.deleteCourseSuccess
      ),
      withLatestFrom(this.store.select(selectSelectedSubjectId)),
      filter(([, subjectId]) => !!subjectId),
      map(([, subjectId]) => CourseActions.loadCourses({ subjectId: subjectId as string }))
    )
  );
}
