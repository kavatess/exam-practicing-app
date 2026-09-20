import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { AdminUnit } from '../../../../shared/models/cms.model';

@Component({
    selector: 'adm-unit-tree',
    standalone: true,
    imports: [],
    templateUrl: './unit-tree.component.html',
    styleUrl: './unit-tree.component.scss',
})
export class UnitTreeComponent {
    @Input({ required: true }) units: AdminUnit[] = [];

    @Output() create = new EventEmitter<void>();
    @Output() edit = new EventEmitter<AdminUnit>();
    @Output() remove = new EventEmitter<AdminUnit>();
    @Output() removeSubUnit = new EventEmitter<{
        unit: AdminUnit;
        subUnitId: string;
    }>();

    readonly openUnitId = signal<string | null>(null);

    toggle(unit: AdminUnit): void {
        this.openUnitId.update((id) => (id === unit.id ? null : unit.id));
    }

    subUnitLabel(unit: AdminUnit): string {
        const count = unit.subUnits.length;
        return `${count} ${count === 1 ? 'sub-unit' : 'sub-units'}`;
    }

    order(index: number): string {
        return String(index + 1).padStart(2, '0');
    }
}
