import { Component, Input } from '@angular/core';
import {
    AdminTransaction,
    avatarTone,
    initials,
} from '../../../../shared/models/cms.model';

@Component({
    selector: 'adm-transactions-tab',
    standalone: true,
    imports: [],
    templateUrl: './transactions-tab.component.html',
    styleUrl: './transactions-tab.component.scss',
})
export class TransactionsTabComponent {
    @Input() transactions: AdminTransaction[] = [];

    avatar(tx: AdminTransaction): { bg: string; fg: string; abbr: string } {
        const [bg, fg] = avatarTone(tx.userName);
        return { bg, fg, abbr: initials(tx.userName) };
    }
}
