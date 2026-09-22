import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrdersPaymentsState } from './orders-payments.reducer';

export const ordersPaymentsStoreKey = 'ordersPayments';

export const ordersPaymentsFeatureSelector =
    createFeatureSelector<OrdersPaymentsState>(ordersPaymentsStoreKey);

const select = <T>(project: (state: OrdersPaymentsState) => T) =>
    createSelector(ordersPaymentsFeatureSelector, project);

export const OrdersPaymentsSelectors = {
    Tab: select((state) => state.tab),
    Stats: select((state) => state.stats),
    Orders: select((state) => state.orders),
    Total: select((state) => state.total),
    Status: select((state) => state.status),
    Currency: select((state) => state.currency),
    OpenOrder: select((state) => state.openOrder),
    OpenOrderId: select((state) => state.openOrderId),
    Transactions: select((state) => state.transactions),
    Methods: select((state) => state.methods),
    Loading: select((state) => state.loading),
};
