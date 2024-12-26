/* eslint-disable @typescript-eslint/no-explicit-any */
import { Course } from '@libs/models';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const LibraryActions = createActionGroup({
    source: 'Library',
    events: {
        GetCourses: emptyProps(),
        GetCoursesSuccess: props<{ list: Course[] }>(),
        GetCoursesFailure: props<{ error: any }>(),
        SelectCourse: props<{ courseId: string }>(),
        SelectCourseSuccess: props<{ data: Course }>(),
        SelectCourseFailure: props<{ error: any }>(),
    },
});
