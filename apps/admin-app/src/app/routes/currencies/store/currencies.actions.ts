import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AdminCurrency } from '../../../shared/models/cms.model';
import { CurrencyDraft } from './currencies.service';

export const CurrenciesActions = createActionGroup({
    source: 'Currencies',
    events: {
        LoadCurrencies: emptyProps(),
        LoadCurrenciesSuccess: props<{ currencies: AdminCurrency[] }>(),
        LoadCurrenciesFailure: props<{ error: unknown }>(),

        SaveCurrency: props<{
            currencyId: string | null;
            draft: CurrencyDraft;
        }>(),
        SaveCurrencySuccess: props<{ currency: AdminCurrency }>(),
        SaveCurrencyFailure: props<{ error: unknown }>(),

        RemoveCurrency: props<{ currencyId: string }>(),
        RemoveCurrencySuccess: props<{ currencyId: string }>(),
        RemoveCurrencyFailure: props<{ error: unknown }>(),
    },
});
