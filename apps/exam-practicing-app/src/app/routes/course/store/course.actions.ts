/* eslint-disable @typescript-eslint/no-explicit-any */
import { Course } from '@libs/models';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const CourseActions = createActionGroup({
    source: 'Library',
    events: {
        // Course Actions
        GetCourseById: props<{ courseId: string }>(),
        GetCourseByIdSuccess: props<{ data: Course }>(),
        GetCourseByIdFailure: props<{ error: any }>(),

        // Test History Actions
        GetTestHistory: emptyProps(),
        GetTestHistorySuccess: props<{ list: any[] }>(),
        GetTestHistoryFailure: props<{ error: any }>(),
        ChangeHistoryPage: props<{ page: number }>(),
    },
});
