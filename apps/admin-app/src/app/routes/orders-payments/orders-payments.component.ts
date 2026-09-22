import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
    AdminOrder,
    OrderCurrency,
    OrderStatus,
} from '../../shared/models/cms.model';
import { MethodsTabComponent } from './components/methods-tab/methods-tab.component';
import { OrderDrawerComponent } from './components/order-drawer/order-drawer.component';
import { OrdersTabComponent } from './components/orders-tab/orders-tab.component';
import { TransactionsTabComponent } from './components/transactions-tab/transactions-tab.component';
import {
    CommerceTab,
    OrdersPaymentsActions,
} from './store/orders-payments.actions';
import { OrdersPaymentsSelectors } from './store/orders-payments.selectors';

@Component({
    selector: 'adm-orders-payments',
    standalone: true,
    imports: [
        OrdersTabComponent,
        TransactionsTabComponent,
        MethodsTabComponent,
        OrderDrawerComponent,
    ],
    templateUrl: './orders-payments.component.html',
    styleUrl: './orders-payments.component.scss',
})
export class OrdersPaymentsComponent implements OnInit {
    private readonly store = inject(Store);

    readonly tab = this.store.selectSignal(OrdersPaymentsSelectors.Tab);
    readonly stats = this.store.selectSignal(OrdersPaymentsSelectors.Stats);
    readonly orders = this.store.selectSignal(OrdersPaymentsSelectors.Orders);
    readonly total = this.store.selectSignal(OrdersPaymentsSelectors.Total);
    readonly status = this.store.selectSignal(OrdersPaymentsSelectors.Status);
    readonly currency = this.store.selectSignal(
        OrdersPaymentsSelectors.Currency
    );
    readonly openOrder = this.store.selectSignal(
        OrdersPaymentsSelectors.OpenOrder
    );
    readonly transactions = this.store.selectSignal(
        OrdersPaymentsSelectors.Transactions
    );
    readonly methods = this.store.selectSignal(
        OrdersPaymentsSelectors.Methods
    );

    readonly tabs: { id: CommerceTab; label: string }[] = [
        { id: 'orders', label: 'Orders' },
        { id: 'transactions', label: 'Transactions' },
        { id: 'methods', label: 'Payment methods' },
    ];

    ngOnInit(): void {
        this.store.dispatch(OrdersPaymentsActions.loadOrders());
    }

    selectTab(tab: CommerceTab): void {
        this.store.dispatch(OrdersPaymentsActions.selectTab({ tab }));
        // Each tab reads its own collection, fetched the first time it opens.
        if (tab === 'transactions') {
            this.store.dispatch(OrdersPaymentsActions.loadTransactions());
        } else if (tab === 'methods') {
            this.store.dispatch(OrdersPaymentsActions.loadMethods());
        } else {
            this.store.dispatch(OrdersPaymentsActions.loadOrders());
        }
    }

    selectStatus(status: OrderStatus | null): void {
        this.store.dispatch(OrdersPaymentsActions.selectStatus({ status }));
    }

    selectCurrency(currency: OrderCurrency | null): void {
        this.store.dispatch(
            OrdersPaymentsActions.selectCurrency({ currency })
        );
    }

    open(order: AdminOrder): void {
        this.store.dispatch(
            OrdersPaymentsActions.openOrder({ orderId: order.id })
        );
    }

    close(): void {
        this.store.dispatch(OrdersPaymentsActions.closeOrder());
    }

    setMethodLive(change: { methodId: string; live: boolean }): void {
        this.store.dispatch(OrdersPaymentsActions.setMethodLive(change));
    }

    exportOrders(): void {
        // Export lands with the orders API; the button is a placeholder.
    }

    addGateway(): void {
        // Gateway onboarding is a provider flow, out of scope for the CMS demo.
    }
}
