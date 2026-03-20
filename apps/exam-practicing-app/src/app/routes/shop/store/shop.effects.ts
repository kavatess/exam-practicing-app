import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ShopService } from './shop.service';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { ShopActions } from './shop.actions';
import { ShopStoreState } from './shop.reducer';
import { AlertService } from '../../../shared/components/alert/alert.service';

@Injectable()
export class ShopEffects {
    private readonly actions$: Actions = inject(Actions);
    private readonly store: Store<ShopStoreState> = inject(
        Store<ShopStoreState>
    );

    constructor(
        private readonly service: ShopService,
        private readonly alertService: AlertService
    ) {}

    readonly getShopList$ = createEffect(() =>
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

    readonly purchaseItem$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ShopActions.purchaseItem),
            exhaustMap((action) =>
                this.service.purchaseItem(action.itemId).pipe(
                    map((data) => ShopActions.purchaseItemSuccess({ data })),
                    catchError((error) =>
                        of(ShopActions.purchaseItemFailure({ error }))
                    )
                )
            )
        )
    );

    readonly purchaseItemSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ShopActions.purchaseItemSuccess),
                tap((action) => {
                    this.alertService.showAlert(
                        'Item thanh toán thành công',
                        'success'
                    );
                })
            ),
        { dispatch: false }
    );
}
