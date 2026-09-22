import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
    AdminPaymentMethod,
    avatarTone,
    initials,
} from '../../../../shared/models/cms.model';

@Component({
    selector: 'adm-methods-tab',
    standalone: true,
    imports: [],
    templateUrl: './methods-tab.component.html',
    styleUrl: './methods-tab.component.scss',
})
export class MethodsTabComponent {
    @Input() methods: AdminPaymentMethod[] = [];

    @Output() setLive = new EventEmitter<{ methodId: string; live: boolean }>();
    @Output() addGateway = new EventEmitter<void>();

    logo(method: AdminPaymentMethod): { bg: string; fg: string; abbr: string } {
        const [bg, fg] = avatarTone(method.name);
        return { bg, fg, abbr: initials(method.provider) };
    }

    stateLabel(method: AdminPaymentMethod): string {
        return method.live ? 'Live' : 'Test mode';
    }

    toggle(method: AdminPaymentMethod): void {
        this.setLive.emit({ methodId: method.id, live: !method.live });
    }
}
