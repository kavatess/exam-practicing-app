import { createReducer, on } from '@ngrx/store';
import { Course, Pagination, Quest, Test } from '@libs/models';
import {
    CourseActions,

} from './subject-management.actions';

export interface DashboardStoreState {
    courses: {
        list: Course[];
        selectedCourseId: string;
        data: Course;
        loading: boolean;
    };

}

export const initialState: DashboardStoreState = {
    courses: {
        list: [],
        selectedCourseId: 'abc',
        data: null,
        loading: false,
    },

};

export const subjectManagementReducer = createReducer(
    initialState,
    // Course Events
    on(CourseActions.getCoursesSuccess, (state, { list }) => ({
        ...state,
        courses: {
            ...state.courses,
            list,
            data: {
                ...state.courses?.data,
                ...list[0],
            },
        },
    })),
    on(CourseActions.selectCourseSuccess, (state, { data }) => ({
        ...state,
        courses: {
            ...state.courses,
            data,
        },
    })),

    on(CourseActions.getCurrCourseSuccess, (state, { data }) => ({
        ...state,
        courses: {
            ...state.courses,
            data: {
                ...state.courses?.data,
                ...data,
            },
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
