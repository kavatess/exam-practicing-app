import { Course } from '@libs/models';
import { createReducer, on } from '@ngrx/store';
import { LibraryActions } from './library.actions';

export interface LibraryStoreState {
    courses: {
        loading: boolean;
        list: Course[];
    };

    courseDetails: {
        loading: boolean;
        // courseId: string;
        data: Course;
    };
}

export const initialState: LibraryStoreState = {
    courses: {
        loading: false,
        list: [],
    },
    courseDetails: {
        loading: false,
        // courseId: '',
        data: null,
    },
};

export const libraryReducer = createReducer(
    initialState,
    on(LibraryActions.getCoursesSuccess, (state, { list }) => ({
        ...state,
        courses: {
            ...state.courses,
            list,
        },
    })),
    on(LibraryActions.selectCourseSuccess, (state, { data }) => ({
        ...state,
        courseDetails: {
            ...state.courseDetails,
            data,
        },
    }))
);
