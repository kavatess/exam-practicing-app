import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DrawerShellComponent } from '../../../../shared/components/drawer-shell/drawer-shell.component';
import {
    AdminOrderDetail,
    avatarTone,
    initials,
} from '../../../../shared/models/cms.model';

@Component({
    selector: 'adm-order-drawer',
    standalone: true,
    imports: [DrawerShellComponent],
    templateUrl: './order-drawer.component.html',
    styleUrl: './order-drawer.component.scss',
})
export class OrderDrawerComponent {
    @Input({ required: true }) order!: AdminOrderDetail;

    @Output() dismiss = new EventEmitter<void>();

    get avatar(): { bg: string; fg: string; abbr: string } {
        const [bg, fg] = avatarTone(this.order.userName);
        return { bg, fg, abbr: initials(this.order.userName) };
    }

    get statusClass(): string {
        return `st-${this.order.status.toLowerCase()}`;
    }

    get currencyLabel(): string {
        return this.order.currency === 'money' ? 'Real money' : 'In-app gems';
    }
}
