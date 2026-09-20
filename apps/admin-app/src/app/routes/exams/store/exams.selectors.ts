import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ExamsState } from './exams.reducer';

export const examsStoreKey = 'exams';

export const examsFeatureSelector =
    createFeatureSelector<ExamsState>(examsStoreKey);

export const ExamsSelectors = {
    Exams: createSelector(
        examsFeatureSelector,
        (state: ExamsState) => state.exams
    ),
    SelectedExamId: createSelector(
        examsFeatureSelector,
        (state: ExamsState) => state.selectedExamId
    ),
    SelectedExam: createSelector(
        examsFeatureSelector,
        (state: ExamsState) =>
            state.exams.find((exam) => exam.id === state.selectedExamId) ?? null
    ),
    Loading: createSelector(
        examsFeatureSelector,
        (state: ExamsState) => state.loading
    ),
    Error: createSelector(
        examsFeatureSelector,
        (state: ExamsState) => state.error
    ),
};
