import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
    catchError,
    exhaustMap,
    map,
    of,
    switchMap,
    withLatestFrom,
} from 'rxjs';
import { OrdersPaymentsActions } from './orders-payments.actions';
import { OrdersPaymentsSelectors } from './orders-payments.selectors';
import { OrdersPaymentsService } from './orders-payments.service';

@Injectable()
export class OrdersPaymentsEffects {
    private readonly actions$: Actions = inject(Actions);
    private readonly store = inject(Store);
    private readonly service = inject(OrdersPaymentsService);

    readonly loadOrders$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OrdersPaymentsActions.loadOrders),
            withLatestFrom(
                this.store.select(OrdersPaymentsSelectors.Status),
                this.store.select(OrdersPaymentsSelectors.Currency)
            ),
            switchMap(([, status, currency]) =>
                this.service.queryOrders({ status, currency }).pipe(
                    map(({ stats, orders, total }) =>
                        OrdersPaymentsActions.loadOrdersSuccess({
                            stats,
                            orders,
                            total,
                        })
                    ),
                    catchError((error) =>
                        of(OrdersPaymentsActions.loadOrdersFailure({ error }))
                    )
                )
            )
        )
    );

    readonly reloadOnFilterChange$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                OrdersPaymentsActions.selectStatus,
                OrdersPaymentsActions.selectCurrency
            ),
            map(() => OrdersPaymentsActions.loadOrders())
        )
    );

    readonly loadOrder$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OrdersPaymentsActions.openOrder),
            switchMap(({ orderId }) =>
                this.service.getOrder(orderId).pipe(
                    map((order) =>
                        OrdersPaymentsActions.loadOrderSuccess({ order })
                    ),
                    catchError((error) =>
                        of(OrdersPaymentsActions.loadOrderFailure({ error }))
                    )
                )
            )
        )
    );

    readonly loadTransactions$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OrdersPaymentsActions.loadTransactions),
            exhaustMap(() =>
                this.service.getTransactions().pipe(
                    map((transactions) =>
                        OrdersPaymentsActions.loadTransactionsSuccess({
                            transactions,
                        })
                    ),
                    catchError((error) =>
                        of(
                            OrdersPaymentsActions.loadTransactionsFailure({
                                error,
                            })
                        )
                    )
                )
            )
        )
    );

    readonly loadMethods$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OrdersPaymentsActions.loadMethods),
            exhaustMap(() =>
                this.service.getPaymentMethods().pipe(
                    map((methods) =>
                        OrdersPaymentsActions.loadMethodsSuccess({ methods })
                    ),
                    catchError((error) =>
                        of(OrdersPaymentsActions.loadMethodsFailure({ error }))
                    )
                )
            )
        )
    );

    readonly setMethodLive$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OrdersPaymentsActions.setMethodLive),
            exhaustMap(({ methodId, live }) =>
                this.service.setMethodLive(methodId, live).pipe(
                    map((method) =>
                        OrdersPaymentsActions.setMethodLiveSuccess({ method })
                    ),
                    catchError((error) =>
                        of(
                            OrdersPaymentsActions.setMethodLiveFailure({
                                error,
                            })
                        )
                    )
                )
            )
        )
    );
}
