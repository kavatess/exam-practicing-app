import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TestStoreState } from './test.reducer';

// Feature Key
export const testStoreKey = 'Test';

// Selectors
export const testFeatureSelector =
    createFeatureSelector<TestStoreState>(testStoreKey);

// Selectors
export const TestSelectors = {
    TestData: createSelector(
        testFeatureSelector,
        (state: TestStoreState) => state.data
    ),
    QuestionList: createSelector(
        testFeatureSelector,
        (state: TestStoreState) =>
            state.data?.questions.map((q) => q.question) || []
    ),
};
