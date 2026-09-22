import { createReducer, on } from '@ngrx/store';
import {
    AdminOrder,
    AdminOrderDetail,
    AdminPaymentMethod,
    AdminTransaction,
    OrderCurrency,
    OrderStat,
    OrderStatus,
} from '../../../shared/models/cms.model';
import {
    CommerceTab,
    OrdersPaymentsActions,
} from './orders-payments.actions';

export interface OrdersPaymentsState {
    tab: CommerceTab;
    stats: OrderStat[];
    orders: AdminOrder[];
    total: number;
    status: OrderStatus | null;
    currency: OrderCurrency | null;
    /** The order whose drawer is open, fetched in full. */
    openOrder: AdminOrderDetail | null;
    openOrderId: string | null;
    transactions: AdminTransaction[];
    methods: AdminPaymentMethod[];
    loading: boolean;
    error: unknown;
}

export const initialState: OrdersPaymentsState = {
    tab: 'orders',
    stats: [],
    orders: [],
    total: 0,
    status: null,
    currency: null,
    openOrder: null,
    openOrderId: null,
    transactions: [],
    methods: [],
    loading: false,
    error: null,
};

export const ordersPaymentsReducer = createReducer(
    initialState,

    on(OrdersPaymentsActions.selectTab, (state, { tab }) => ({
        ...state,
        tab,
        // Leaving the tab closes anything opened from it.
        openOrder: null,
        openOrderId: null,
    })),

    on(OrdersPaymentsActions.loadOrders, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(
        OrdersPaymentsActions.loadOrdersSuccess,
        (state, { stats, orders, total }) => ({
            ...state,
            stats,
            orders,
            total,
            loading: false,
        })
    ),

    on(OrdersPaymentsActions.selectStatus, (state, { status }) => ({
        ...state,
        status,
    })),
    on(OrdersPaymentsActions.selectCurrency, (state, { currency }) => ({
        ...state,
        currency,
    })),

    on(OrdersPaymentsActions.openOrder, (state, { orderId }) => ({
        ...state,
        openOrderId: orderId,
        openOrder: null,
    })),
    on(OrdersPaymentsActions.closeOrder, (state) => ({
        ...state,
        openOrderId: null,
        openOrder: null,
    })),
    on(OrdersPaymentsActions.loadOrderSuccess, (state, { order }) =>
        // A slower reply for a drawer already dismissed is stale.
        state.openOrderId === order.id ? { ...state, openOrder: order } : state
    ),

    on(
        OrdersPaymentsActions.loadTransactionsSuccess,
        (state, { transactions }) => ({ ...state, transactions })
    ),
    on(OrdersPaymentsActions.loadMethodsSuccess, (state, { methods }) => ({
        ...state,
        methods,
    })),
    on(OrdersPaymentsActions.setMethodLiveSuccess, (state, { method }) => ({
        ...state,
        methods: state.methods.map((item) =>
            item.id === method.id ? method : item
        ),
    })),

    on(
        OrdersPaymentsActions.loadOrdersFailure,
        OrdersPaymentsActions.loadOrderFailure,
        OrdersPaymentsActions.loadTransactionsFailure,
        OrdersPaymentsActions.loadMethodsFailure,
        OrdersPaymentsActions.setMethodLiveFailure,
        (state, { error }) => ({ ...state, loading: false, error })
    )
);
