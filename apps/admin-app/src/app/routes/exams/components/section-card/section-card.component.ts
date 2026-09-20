import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
    AdminSubject,
    AdminUnit,
    ExamSection,
    findSubject,
    unitsInScope,
} from '../../../../shared/models/cms.model';

@Component({
    selector: 'adm-section-card',
    standalone: true,
    imports: [],
    templateUrl: './section-card.component.html',
    styleUrl: './section-card.component.scss',
})
export class SectionCardComponent {
    @Input({ required: true }) section!: ExamSection;
    @Input() subjects: AdminSubject[] = [];
    @Input() index = 0;

    @Output() editScope = new EventEmitter<void>();
    @Output() remove = new EventEmitter<void>();

    get order(): string {
        return String(this.index + 1).padStart(2, '0');
    }

    get subjectName(): string {
        return (
            findSubject(this.subjects, this.section.subjectId)?.name ??
            'Unknown subject'
        );
    }

    get units(): AdminUnit[] {
        return unitsInScope(this.subjects, this.section);
    }

    get scopeMeta(): string {
        const count = this.units.length;
        return `${count} ${
            count === 1 ? 'unit' : 'units'
        } in scope · drawn from the ${this.subjectName} taxonomy`;
    }
}
