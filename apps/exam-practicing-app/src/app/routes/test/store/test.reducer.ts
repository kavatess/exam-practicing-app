import { Test } from '@libs/models';
import { createReducer, on } from '@ngrx/store';
import { TestActions } from './test.actions';

export interface TestStoreState {
    testId: string;
    data: Test;
    submitLoading: boolean;
}

export const initialState: TestStoreState = {
    testId: '',
    data: null,
    submitLoading: false,
};

export const testReducer = createReducer(
    initialState,
    on(TestActions.getTestSuccess, (state, { data }) => ({
        ...state,
        data,
    })),
    on(TestActions.fetchQuestionAnswer, (state, { pIndex, qIndex, answer }) => {
        if (!state.data || !state.data.pages) return state;

        const newPages = [...state.data.pages];
        const page = { ...newPages[pIndex] };
        const questions = [...page.questions];
        const question = { ...questions[qIndex] };

        // Update userAnswer
        question.userAnswer = answer;

        questions[qIndex] = question;
        page.questions = questions;
        newPages[pIndex] = page;

        return {
            ...state,
            data: {
                ...state.data,
                pages: newPages,
            },
        };
    }),
    on(TestActions.submitTest, (state) => ({
        ...state,
        submitLoading: true,
    })),
    on(TestActions.submitTestSuccess, (state) => ({
        ...state,
        submitLoading: false,
    })),
    on(TestActions.submitTestFailure, (state) => ({
        ...state,
        submitLoading: false,
    }))
);
