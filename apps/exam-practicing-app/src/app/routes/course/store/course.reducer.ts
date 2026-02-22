import { Course, Pagination, Test } from '@libs/models';
import { createReducer, on } from '@ngrx/store';
import { CourseActions } from './course.actions';

export interface CourseStoreState {
    courseDetails: {
        loading: boolean;
        courseId: string;
        data: Course;
    };
    testHistory: {
        loading: boolean;
        list: Test[];
        pagination: Pagination;
    };
}

export const initialState: CourseStoreState = {
    courseDetails: {
        loading: false,
        courseId: '',
        data: null,
    },
    testHistory: {
        loading: false,
        list: [],
        pagination: {
            page: 1,
            pageSize: 5,
            count: 0,
        },
    },
};

export const courseReducer = createReducer(
    initialState,
    on(CourseActions.getCourseById, (state, { courseId }) => ({
        ...state,
        courseDetails: {
            ...state.courseDetails,
            courseId,
        },
    })),
    on(CourseActions.getCourseByIdSuccess, (state, { data }) => ({
        ...state,
        courseDetails: {
            ...state.courseDetails,
            data,
        },
    })),

    // Test History events
    on(CourseActions.getTestHistorySuccess, (state, { list }) => ({
        ...state,
        testHistory: {
            ...state.testHistory,
            list,
        },
    })),
    on(CourseActions.changeHistoryPage, (state, { page }) => ({
        ...state,
        testHistory: {
            ...state.testHistory,
            pagination: {
                ...state.testHistory.pagination,
                page,
            },
        },
    }))
);
