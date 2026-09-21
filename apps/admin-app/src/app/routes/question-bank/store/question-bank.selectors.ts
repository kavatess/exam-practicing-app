import { createFeatureSelector, createSelector } from '@ngrx/store';
import { QuestionBankState } from './question-bank.reducer';

export const questionBankStoreKey = 'questionBank';

export const questionBankFeatureSelector =
    createFeatureSelector<QuestionBankState>(questionBankStoreKey);

export const QuestionBankSelectors = {
    Questions: createSelector(
        questionBankFeatureSelector,
        (state: QuestionBankState) => state.questions
    ),
    Filter: createSelector(
        questionBankFeatureSelector,
        (state: QuestionBankState) => state.filter
    ),
    Scope: createSelector(
        questionBankFeatureSelector,
        (state: QuestionBankState) => state.scope
    ),
    MatchCount: createSelector(
        questionBankFeatureSelector,
        (state: QuestionBankState) => state.matchCount
    ),
    BankTotal: createSelector(
        questionBankFeatureSelector,
        (state: QuestionBankState) => state.bankTotal
    ),
    Matches: createSelector(
        questionBankFeatureSelector,
        (state: QuestionBankState) => state.matches
    ),
    Loading: createSelector(
        questionBankFeatureSelector,
        (state: QuestionBankState) => state.loading
    ),
    Error: createSelector(
        questionBankFeatureSelector,
        (state: QuestionBankState) => state.error
    ),
};
