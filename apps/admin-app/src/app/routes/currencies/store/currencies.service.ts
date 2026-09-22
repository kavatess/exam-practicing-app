import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { AdminCurrency } from '../../../shared/models/cms.model';

/** Request payload for creating or editing a currency. */
export interface CurrencyDraft {
    name: string;
    abbr: string;
    description: string;
    value: string;
    usedBy: string;
}

/** `[name, abbr, description, value, used by]` */
const CURRENCY_SEEDS: [string, string, string, string, string][] = [
    ['Gems', 'G', 'Primary spendable currency, earned and purchased', '1', 'Shop · Quests'],
    ['Energy', 'E', 'Consumed per practice session, refills over time', '1', 'Quests'],
    ['XP', 'XP', 'Progression points, not spendable', '0', 'Achievements'],
    ['Streak Freeze', 'SF', 'Consumable that protects a streak', '200', 'Shop'],
    ['Event Token', 'ET', 'Limited-time event currency', '5', 'Quests'],
];

/**
 * The currencies data boundary. Small enough to be one list, but it is still
 * the file `HttpClient` replaces.
 */
@Injectable({ providedIn: 'root' })
export class CurrenciesService {
    private currencies: AdminCurrency[] = CURRENCY_SEEDS.map(
        ([name, abbr, description, value, usedBy], index) => ({
            id: `cur-${index + 1}`,
            name,
            abbr,
            description,
            value,
            usedBy,
        })
    );

    private sequence = 0;

    getCurrencies(): Observable<AdminCurrency[]> {
        return of(structuredClone(this.currencies));
    }

    /** Creates a currency when `currencyId` is null, otherwise edits it. */
    saveCurrency(
        currencyId: string | null,
        draft: CurrencyDraft
    ): Observable<AdminCurrency> {
        if (!currencyId) {
            this.sequence += 1;
            const currency: AdminCurrency = {
                id: `cur-new-${this.sequence}`,
                name: draft.name.trim() || 'Untitled currency',
                abbr: draft.abbr.trim().toUpperCase() || '?',
                description: draft.description,
                value: draft.value,
                usedBy: draft.usedBy,
            };
            this.currencies.push(currency);
            return of(structuredClone(currency));
        }

        const currency = this.currencies.find(
            (item) => item.id === currencyId
        );
        if (!currency) {
            return throwError(
                () => new Error(`Currency ${currencyId} not found`)
            );
        }
        currency.name = draft.name.trim() || currency.name;
        currency.abbr = draft.abbr.trim().toUpperCase() || currency.abbr;
        currency.description = draft.description;
        currency.value = draft.value;
        currency.usedBy = draft.usedBy;
        return of(structuredClone(currency));
    }

    removeCurrency(currencyId: string): Observable<string> {
        const index = this.currencies.findIndex(
            (item) => item.id === currencyId
        );
        if (index < 0) {
            return throwError(
                () => new Error(`Currency ${currencyId} not found`)
            );
        }
        this.currencies.splice(index, 1);
        return of(currencyId);
    }
}
