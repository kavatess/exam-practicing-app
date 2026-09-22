import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
    AdminCurrency,
    avatarTone,
} from '../../shared/models/cms.model';
import { CurrencyModalComponent } from './components/currency-modal/currency-modal.component';
import { CurrenciesActions } from './store/currencies.actions';
import { CurrenciesSelectors } from './store/currencies.selectors';
import { CurrencyDraft } from './store/currencies.service';

@Component({
    selector: 'adm-currencies',
    standalone: true,
    imports: [CurrencyModalComponent],
    templateUrl: './currencies.component.html',
    styleUrl: './currencies.component.scss',
})
export class CurrenciesComponent implements OnInit {
    private readonly store = inject(Store);

    readonly currencies = this.store.selectSignal(
        CurrenciesSelectors.Currencies
    );

    // Overlay bookkeeping is view state, so it stays with the component.
    modalOpen = false;
    editingCurrency: AdminCurrency | null = null;

    ngOnInit(): void {
        this.store.dispatch(CurrenciesActions.loadCurrencies());
    }

    chip(currency: AdminCurrency): { bg: string; fg: string } {
        const [bg, fg] = avatarTone(currency.name);
        return { bg, fg };
    }

    openModal(currency: AdminCurrency | null): void {
        this.editingCurrency = currency;
        this.modalOpen = true;
    }

    closeModal(): void {
        this.modalOpen = false;
        this.editingCurrency = null;
    }

    saveCurrency(draft: CurrencyDraft): void {
        this.store.dispatch(
            CurrenciesActions.saveCurrency({
                currencyId: this.editingCurrency?.id ?? null,
                draft,
            })
        );
        this.closeModal();
    }

    removeCurrency(currency: AdminCurrency): void {
        this.store.dispatch(
            CurrenciesActions.removeCurrency({ currencyId: currency.id })
        );
    }
}
