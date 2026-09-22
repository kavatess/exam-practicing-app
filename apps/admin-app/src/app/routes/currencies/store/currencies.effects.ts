import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { CurrenciesActions } from './currencies.actions';
import { CurrenciesService } from './currencies.service';

@Injectable()
export class CurrenciesEffects {
    private readonly actions$: Actions = inject(Actions);
    private readonly service = inject(CurrenciesService);

    readonly loadCurrencies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CurrenciesActions.loadCurrencies),
            exhaustMap(() =>
                this.service.getCurrencies().pipe(
                    map((currencies) =>
                        CurrenciesActions.loadCurrenciesSuccess({ currencies })
                    ),
                    catchError((error) =>
                        of(CurrenciesActions.loadCurrenciesFailure({ error }))
                    )
                )
            )
        )
    );

    readonly saveCurrency$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CurrenciesActions.saveCurrency),
            exhaustMap(({ currencyId, draft }) =>
                this.service.saveCurrency(currencyId, draft).pipe(
                    map((currency) =>
                        CurrenciesActions.saveCurrencySuccess({ currency })
                    ),
                    catchError((error) =>
                        of(CurrenciesActions.saveCurrencyFailure({ error }))
                    )
                )
            )
        )
    );

    readonly removeCurrency$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CurrenciesActions.removeCurrency),
            exhaustMap(({ currencyId }) =>
                this.service.removeCurrency(currencyId).pipe(
                    map((id) =>
                        CurrenciesActions.removeCurrencySuccess({
                            currencyId: id,
                        })
                    ),
                    catchError((error) =>
                        of(CurrenciesActions.removeCurrencyFailure({ error }))
                    )
                )
            )
        )
    );
}
