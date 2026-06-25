    /* eslint-disable @typescript-eslint/no-explicit-any */
import { Course, Quest } from '@libs/models';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

// Course Actions
export const CourseActions = createActionGroup({
    source: 'Course',
    events: {
        GetCourses: emptyProps(),
        GetCoursesSuccess: props<{ list: Course[] }>(),
        GetCoursesFailure: props<{ error: any }>(),
        SelectCourse: emptyProps(),
        SelectCourseSuccess: props<{ data: Course }>(),
        SelectCourseFailure: props<{ error: any }>(),

        // Course Actions
        GetCurrCourse: emptyProps(),
        GetCurrCourseSuccess: props<{ data: Course }>(),
        GetCurrCourseFailure: props<{ error: any }>(),

        // Test History Actions
        GetTestHistory: emptyProps(),
        GetTestHistorySuccess: props<{ list: any[] }>(),
        GetTestHistoryFailure: props<{ error: any }>(),
        ChangeHistoryPage: props<{ page: number }>(),
    },
});

