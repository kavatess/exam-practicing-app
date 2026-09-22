import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
    AdminOrder,
    AdminOrderDetail,
    AdminPaymentMethod,
    AdminTransaction,
    OrderCurrency,
    OrderStat,
    OrderStatus,
} from '../../../shared/models/cms.model';

export type CommerceTab = 'orders' | 'transactions' | 'methods';

export const OrdersPaymentsActions = createActionGroup({
    source: 'Orders & Payments',
    events: {
        SelectTab: props<{ tab: CommerceTab }>(),

        LoadOrders: emptyProps(),
        LoadOrdersSuccess: props<{
            stats: OrderStat[];
            orders: AdminOrder[];
            total: number;
        }>(),
        LoadOrdersFailure: props<{ error: unknown }>(),

        SelectStatus: props<{ status: OrderStatus | null }>(),
        SelectCurrency: props<{ currency: OrderCurrency | null }>(),

        OpenOrder: props<{ orderId: string }>(),
        CloseOrder: emptyProps(),
        LoadOrderSuccess: props<{ order: AdminOrderDetail }>(),
        LoadOrderFailure: props<{ error: unknown }>(),

        LoadTransactions: emptyProps(),
        LoadTransactionsSuccess: props<{
            transactions: AdminTransaction[];
        }>(),
        LoadTransactionsFailure: props<{ error: unknown }>(),

        LoadMethods: emptyProps(),
        LoadMethodsSuccess: props<{ methods: AdminPaymentMethod[] }>(),
        LoadMethodsFailure: props<{ error: unknown }>(),

        SetMethodLive: props<{ methodId: string; live: boolean }>(),
        SetMethodLiveSuccess: props<{ method: AdminPaymentMethod }>(),
        SetMethodLiveFailure: props<{ error: unknown }>(),
    },
});
