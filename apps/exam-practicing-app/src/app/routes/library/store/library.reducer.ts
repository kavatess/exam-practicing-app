import { Course } from '@libs/models';
import { createReducer, on } from '@ngrx/store';
import { LibraryActions } from './library.actions';

export interface LibraryStoreState {
    courses: {
        loading: boolean;
        list: Course[];
    };
}

export const initialState: LibraryStoreState = {
    courses: {
        loading: false,
        list: [],
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
    }))
);
