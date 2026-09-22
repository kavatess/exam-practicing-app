import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    AdminOrder,
    avatarTone,
    initials,
    OrderCurrency,
    OrderStat,
    OrderStatus,
} from '../../../../shared/models/cms.model';

@Component({
    selector: 'adm-orders-tab',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './orders-tab.component.html',
    styleUrl: './orders-tab.component.scss',
})
export class OrdersTabComponent {
    @Input() stats: OrderStat[] = [];
    @Input() orders: AdminOrder[] = [];
    @Input() total = 0;
    @Input() status: OrderStatus | null = null;
    @Input() currency: OrderCurrency | null = null;

    @Output() statusChange = new EventEmitter<OrderStatus | null>();
    @Output() currencyChange = new EventEmitter<OrderCurrency | null>();
    @Output() openOrder = new EventEmitter<AdminOrder>();
    @Output() exportOrders = new EventEmitter<void>();

    readonly statuses: (OrderStatus | null)[] = [
        null,
        'PAID',
        'PENDING',
        'CANCELLED',
    ];
    readonly currencies: (OrderCurrency | null)[] = [null, 'money', 'gems'];

    get countLabel(): string {
        return `Showing ${this.orders.length} of ${this.total.toLocaleString(
            'en-US'
        )} orders`;
    }

    avatar(order: AdminOrder): { bg: string; fg: string; abbr: string } {
        const [bg, fg] = avatarTone(order.userName);
        return { bg, fg, abbr: initials(order.userName) };
    }

    statusLabel(status: OrderStatus | null): string {
        return status ?? 'All';
    }

    currencyLabel(currency: OrderCurrency | null): string {
        if (!currency) {
            return 'All';
        }
        return currency === 'money' ? 'Real money' : 'In-app gems';
    }

    statusClass(status: OrderStatus): string {
        return `st-${status.toLowerCase()}`;
    }
}
