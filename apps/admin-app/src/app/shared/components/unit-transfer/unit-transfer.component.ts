import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { AdminUnit } from '../../models/cms.model';

@Component({
    selector: 'adm-unit-transfer',
    standalone: true,
    imports: [],
    templateUrl: './unit-transfer.component.html',
    styleUrl: './unit-transfer.component.scss',
})
export class UnitTransferComponent {
    @Input({ required: true }) units: AdminUnit[] = [];
    @Input({ required: true }) selectedIds: string[] = [];
    @Input() listHeight = 200;
    /** Heading over the right-hand list: units in scope, or tagged on a question. */
    @Input() includedLabel = 'Included units';
    @Input() emptyNote = 'Pick units on the left, then use the arrow to add them.';

    @Output() selectedIdsChange = new EventEmitter<string[]>();

    readonly highlighted = signal<ReadonlySet<string>>(new Set());

    get includedUnits(): AdminUnit[] {
        return this.selectedIds
            .map((id) => this.units.find((unit) => unit.id === id))
            .filter((unit): unit is AdminUnit => !!unit);
    }

    isIncluded(unit: AdminUnit): boolean {
        return this.selectedIds.includes(unit.id);
    }

    isHighlighted(unit: AdminUnit): boolean {
        return this.highlighted().has(unit.id);
    }

    toggleHighlight(unit: AdminUnit): void {
        this.highlighted.update((ids) => {
            const next = new Set(ids);
            if (next.has(unit.id)) {
                next.delete(unit.id);
            } else {
                next.add(unit.id);
            }
            return next;
        });
    }

    include(): void {
        const additions = [...this.highlighted()].filter(
            (id) => !this.selectedIds.includes(id)
        );
        if (additions.length) {
            this.selectedIdsChange.emit([...this.selectedIds, ...additions]);
        }
        this.highlighted.set(new Set());
    }

    exclude(): void {
        const removals = this.highlighted();
        if (removals.size) {
            this.selectedIdsChange.emit(
                this.selectedIds.filter((id) => !removals.has(id))
            );
        }
        this.highlighted.set(new Set());
    }

    removeUnit(unit: AdminUnit): void {
        this.selectedIdsChange.emit(
            this.selectedIds.filter((id) => id !== unit.id)
        );
    }
}
