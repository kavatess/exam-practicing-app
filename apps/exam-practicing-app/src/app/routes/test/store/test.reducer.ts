import { Test } from '@libs/models';
import { createReducer, on } from '@ngrx/store';
import { TestActions } from './test.actions';

export interface TestStoreState {
    testId: string;
    data: Test;
}

export const initialState: TestStoreState = {
    testId: '',
    data: null,
};

export const libraryReducer = createReducer(
    initialState,
    on(TestActions.getTestSuccess, (state, { data }) => ({
        ...state,
        data,
    }))
);
