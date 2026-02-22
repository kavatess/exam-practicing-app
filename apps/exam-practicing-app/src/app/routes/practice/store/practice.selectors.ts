import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PracticeStoreState } from './practice.reducer';

// Feature Key
export const practiceStoreKey = 'practice';

// Selectors
export const practiceFeatureSelector =
    createFeatureSelector<PracticeStoreState>(practiceStoreKey);

// Selectors
export const PracticeSelectors = {
    PracticeId: createSelector(
        practiceFeatureSelector,
        (state: PracticeStoreState) => state.practiceExam.data?.id
    ),
    PracticeExam: createSelector(
        practiceFeatureSelector,
        (state: PracticeStoreState) => state.practiceExam.data || null
    ),
    Questions: createSelector(
        practiceFeatureSelector,
        (state: PracticeStoreState) => state.practiceExam.data?.questions || []
    ),
    CurrIndex: createSelector(
        practiceFeatureSelector,
        (state: PracticeStoreState) => state.practiceExam.currIndex || 0
    ),
    CurrQuestion: createSelector(
        practiceFeatureSelector,
        (state: PracticeStoreState) =>
            state.practiceExam.data?.questions[state.practiceExam.currIndex] ||
            null
    ),
    UserAnswer: createSelector(
        practiceFeatureSelector,
        (state: PracticeStoreState) => state.practiceExam.userAnswer
    ),
    IsCorrect: createSelector(
        practiceFeatureSelector,
        (state: PracticeStoreState) => state.practiceExam.isCorrect
    ),
    IsLastQuestion: createSelector(
        practiceFeatureSelector,
        (state: PracticeStoreState) =>
            state.practiceExam.currIndex ===
            state.practiceExam.data?.questions.length - 1
    ),
    EvaluationTxt: createSelector(
        practiceFeatureSelector,
        (state: PracticeStoreState) => state.result.evalTxt
    ),
    Rewards: createSelector(
        practiceFeatureSelector,
        (state: PracticeStoreState) => state.result.rewards || null
    ),
};
