import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ShopService } from './shop.service';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { ShopActions } from './shop.actions';
import { ShopStoreState } from './shop.reducer';

@Injectable()
export class ShopEffects {
    private readonly actions$: Actions = inject(Actions);
    private readonly store: Store<ShopStoreState> = inject(
        Store<ShopStoreState>
    );

    constructor(private readonly service: ShopService) {}

    readonly getTest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ShopActions.getShopList),
            exhaustMap(() =>
                this.service.getShopList().pipe(
                    map((data) => ShopActions.getShopListSuccess({ data })),
                    catchError((error) =>
                        of(ShopActions.getShopListFailure({ error }))
                    )
                )
            )
        )
    );
}
