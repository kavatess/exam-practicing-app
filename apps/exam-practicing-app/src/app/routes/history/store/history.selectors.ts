import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HistoryStoreState } from './history.reducer';

// Feature Key
export const historyStoreKey = 'history';

// Selectors
export const historyFeatureSelector =
    createFeatureSelector<HistoryStoreState>(historyStoreKey);

// Selectors
export const HistorySelectors = {
    ResultList: createSelector(
        historyFeatureSelector,
        (state: HistoryStoreState) => state.history.list || []
    ),
    ResultDetails: createSelector(
        historyFeatureSelector,
        (state: HistoryStoreState) => state.history.details || null
    ),
};
