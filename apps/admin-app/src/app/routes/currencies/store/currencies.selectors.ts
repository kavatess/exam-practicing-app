import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CurrenciesState } from './currencies.reducer';

export const currenciesStoreKey = 'currencies';

export const currenciesFeatureSelector =
    createFeatureSelector<CurrenciesState>(currenciesStoreKey);

export const CurrenciesSelectors = {
    Currencies: createSelector(
        currenciesFeatureSelector,
        (state: CurrenciesState) => state.currencies
    ),
    Loading: createSelector(
        currenciesFeatureSelector,
        (state: CurrenciesState) => state.loading
    ),
    Error: createSelector(
        currenciesFeatureSelector,
        (state: CurrenciesState) => state.error
    ),
};
