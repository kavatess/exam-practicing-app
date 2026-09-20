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
    @Input() removable = true;

    @Output() editScope = new EventEmitter<void>();
    @Output() remove = new EventEmitter<void>();

    get subjectName(): string {
        return this.data.subjectById(this.section.subjectId)?.name ?? 'Unknown subject';
    }

    get units(): AdminUnit[] {
        return this.data.unitsForSection(this.section);
    }

    get questionTotal(): number {
        return this.units.reduce((total, unit) => total + unit.questionCount, 0);
    }
}
