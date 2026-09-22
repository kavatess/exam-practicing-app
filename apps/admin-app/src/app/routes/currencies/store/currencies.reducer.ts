import { createReducer, on } from '@ngrx/store';
import { AdminCurrency } from '../../../shared/models/cms.model';
import { CurrenciesActions } from './currencies.actions';

export interface CurrenciesState {
    currencies: AdminCurrency[];
    loading: boolean;
    error: unknown;
}

export const initialState: CurrenciesState = {
    currencies: [],
    loading: false,
    error: null,
};

export const currenciesReducer = createReducer(
    initialState,

    on(CurrenciesActions.loadCurrencies, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(CurrenciesActions.loadCurrenciesSuccess, (state, { currencies }) => ({
        ...state,
        currencies,
        loading: false,
    })),

    on(CurrenciesActions.saveCurrencySuccess, (state, { currency }) => ({
        ...state,
        currencies: state.currencies.some((item) => item.id === currency.id)
            ? state.currencies.map((item) =>
                  item.id === currency.id ? currency : item
              )
            : [...state.currencies, currency],
    })),

    on(CurrenciesActions.removeCurrencySuccess, (state, { currencyId }) => ({
        ...state,
        currencies: state.currencies.filter(
            (item) => item.id !== currencyId
        ),
    })),

    on(
        CurrenciesActions.loadCurrenciesFailure,
        CurrenciesActions.saveCurrencyFailure,
        CurrenciesActions.removeCurrencyFailure,
        (state, { error }) => ({ ...state, loading: false, error })
    )
);
