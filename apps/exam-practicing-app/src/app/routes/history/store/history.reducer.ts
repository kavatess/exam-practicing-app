import { Result } from '@libs/models';
import { createReducer, on } from '@ngrx/store';
import { HistoryActions } from './history.actions';

export interface HistoryStoreState {
    history: {
        list: Result[];
        details: Result;
    };
}

export const initialState: HistoryStoreState = {
    history: {
        list: [],
        details: null,
    },
};

export const historyReducer = createReducer(
    initialState,
    on(HistoryActions.initHistory, (state) => ({
        ...state,
        history: {
            ...state.history,
            list: [],
        },
    })),
    on(HistoryActions.initHistorySuccess, (state, { list }) => ({
        ...state,
        history: {
            ...state.history,
            list,
        },
    })),
    on(HistoryActions.getResultSuccess, (state, { data }) => ({
        ...state,
        history: {
            ...state.history,
            details: data,
        },
    }))
);
