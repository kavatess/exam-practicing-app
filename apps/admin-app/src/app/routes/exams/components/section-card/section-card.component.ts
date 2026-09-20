import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { AdminUnit, ExamSection } from '../../../../shared/models/cms.model';
import { CmsDataService } from '../../../../shared/services/cms-data.service';

@Component({
    selector: 'adm-section-card',
    standalone: true,
    imports: [],
    templateUrl: './section-card.component.html',
    styleUrl: './section-card.component.scss',
})
export class SectionCardComponent {
    private readonly data = inject(CmsDataService);

    @Input({ required: true }) section!: ExamSection;
    @Input() index = 0;

    @Output() editScope = new EventEmitter<void>();
    @Output() remove = new EventEmitter<void>();

    get order(): string {
        return String(this.index + 1).padStart(2, '0');
    }

    get subjectName(): string {
        return (
            this.data.subjectById(this.section.subjectId)?.name ??
            'Unknown subject'
        );
    }

    get units(): AdminUnit[] {
        return this.data.unitsForSection(this.section);
    }

    get scopeMeta(): string {
        const count = this.units.length;
        return `${count} ${
            count === 1 ? 'unit' : 'units'
        } in scope · drawn from the ${this.subjectName} taxonomy`;
    }
}
