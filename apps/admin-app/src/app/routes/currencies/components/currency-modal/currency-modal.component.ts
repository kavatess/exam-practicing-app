import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalShellComponent } from '../../../../shared/components/modal-shell/modal-shell.component';
import { AdminCurrency } from '../../../../shared/models/cms.model';
import { CurrencyDraft } from '../../store/currencies.service';

@Component({
    selector: 'adm-currency-modal',
    standalone: true,
    imports: [FormsModule, ModalShellComponent],
    templateUrl: './currency-modal.component.html',
    styleUrl: './currency-modal.component.scss',
})
export class CurrencyModalComponent implements OnInit {
    @Input() currency: AdminCurrency | null = null;

    @Output() dismiss = new EventEmitter<void>();
    @Output() save = new EventEmitter<CurrencyDraft>();

    draft!: CurrencyDraft;

    ngOnInit(): void {
        this.draft = {
            name: this.currency?.name ?? '',
            abbr: this.currency?.abbr ?? '',
            description: this.currency?.description ?? '',
            value: this.currency?.value ?? '1',
            usedBy: this.currency?.usedBy ?? '',
        };
    }

    get title(): string {
        return this.currency ? 'Edit currency' : 'New currency';
    }
}
