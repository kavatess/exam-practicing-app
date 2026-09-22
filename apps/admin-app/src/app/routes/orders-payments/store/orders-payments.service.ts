import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
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
    SEEDED_ORDER_STATS,
    SEEDED_ORDER_TOTAL,
    seedOrderLines,
    seedOrders,
    seedPaymentMethods,
    seedTransactions,
} from './orders-payments.seed';

export interface OrderFilter {
    /** Null means every status. */
    status: OrderStatus | null;
    currency: OrderCurrency | null;
}

export interface OrdersQueryResult {
    stats: OrderStat[];
    orders: AdminOrder[];
    total: number;
}

/**
 * The commerce data boundary — orders, the ledger behind them, and the
 * gateways money arrives through. One page with three tabs, so one service.
 */
@Injectable({ providedIn: 'root' })
export class OrdersPaymentsService {
    private readonly orders = seedOrders();
    private readonly transactions = seedTransactions();
    private methods = seedPaymentMethods();

    queryOrders(filter: OrderFilter): Observable<OrdersQueryResult> {
        const orders = this.orders.filter(
            (order) =>
                (!filter.status || order.status === filter.status) &&
                (!filter.currency || order.currency === filter.currency)
        );
        return of({
            stats: SEEDED_ORDER_STATS.map((stat) => ({ ...stat })),
            orders: structuredClone(orders),
            total:
                filter.status || filter.currency
                    ? orders.length
                    : SEEDED_ORDER_TOTAL,
        });
    }

    getOrder(orderId: string): Observable<AdminOrderDetail> {
        const order = this.orders.find((item) => item.id === orderId);
        if (!order) {
            return throwError(() => new Error(`Order ${orderId} not found`));
        }
        return of({
            ...structuredClone(order),
            email: `${order.userName
                .split(' ')
                .pop()
                ?.toLowerCase()}@example.com`,
            userId: 'u_10482',
            placedAt: `${order.date} 2026 · 09:24`,
            lines: seedOrderLines(order),
        });
    }

    getTransactions(): Observable<AdminTransaction[]> {
        return of(structuredClone(this.transactions));
    }

    getPaymentMethods(): Observable<AdminPaymentMethod[]> {
        return of(structuredClone(this.methods));
    }

    setMethodLive(
        methodId: string,
        live: boolean
    ): Observable<AdminPaymentMethod> {
        const method = this.methods.find((item) => item.id === methodId);
        if (!method) {
            return throwError(
                () => new Error(`Payment method ${methodId} not found`)
            );
        }
        method.live = live;
        return of(structuredClone(method));
    }
}
