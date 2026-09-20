import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { AdminExam, AdminSubject } from '../../../../../shared/models/cms.model';
import { CmsDataService } from '../../../../../shared/services/cms-data.service';
import { ModalShellComponent } from '../../../../../shared/components/modal-shell/modal-shell.component';

@Component({
    selector: 'adm-section-modal',
    standalone: true,
    imports: [ModalShellComponent],
    templateUrl: './section-modal.component.html',
    styleUrl: './section-modal.component.scss',
})
export class SectionModalComponent {
    private readonly data = inject(CmsDataService);

    @Input({ required: true }) exam!: AdminExam;

    @Output() dismiss = new EventEmitter<void>();
    @Output() save = new EventEmitter<string>();

    selectedSubjectId: string | null = null;

    get subjects(): AdminSubject[] {
        const used = this.exam.sections.map((section) => section.subjectId);
        return this.data.subjects.filter(
            (subject) => !used.includes(subject.id)
        );
    }

    unitLabel(subject: AdminSubject): string {
        const count = subject.units.length;
        return `${count} ${count === 1 ? 'unit' : 'units'}`;
    }

    confirm(): void {
        if (this.selectedSubjectId) {
            this.save.emit(this.selectedSubjectId);
        }
    }
}
