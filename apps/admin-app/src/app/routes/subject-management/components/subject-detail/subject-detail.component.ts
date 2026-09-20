import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
    AdminSubject,
    AdminUnit,
    countSubUnits,
} from '../../../../shared/models/cms.model';
import { UnitTreeComponent } from '../unit-tree/unit-tree.component';

@Component({
    selector: 'adm-subject-detail',
    standalone: true,
    imports: [UnitTreeComponent],
    templateUrl: './subject-detail.component.html',
    styleUrl: './subject-detail.component.scss',
})
export class SubjectDetailComponent {
    @Input({ required: true }) subject!: AdminSubject;

    @Output() editSubject = new EventEmitter<void>();
    @Output() createUnit = new EventEmitter<void>();
    @Output() editUnit = new EventEmitter<AdminUnit>();
    @Output() removeUnit = new EventEmitter<AdminUnit>();
    @Output() removeSubUnit = new EventEmitter<{
        unit: AdminUnit;
        subUnitId: string;
    }>();

    get meta(): string {
        const units = this.subject.units.length;
        const subUnits = countSubUnits(this.subject);
        return `${units} ${units === 1 ? 'UNIT' : 'UNITS'} · ${subUnits} ${
            subUnits === 1 ? 'SUB-UNIT' : 'SUB-UNITS'
        }`;
    }
}
