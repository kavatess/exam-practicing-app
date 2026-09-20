import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    AdminExam,
    AdminSubject,
    AdminUnit,
} from '../../../../../shared/models/cms.model';
import { CmsDataService } from '../../../../../shared/services/cms-data.service';
import { ModalShellComponent } from '../../../../../shared/components/modal-shell/modal-shell.component';
import { UnitTransferComponent } from '../../../../../shared/components/unit-transfer/unit-transfer.component';

export interface SectionDraft {
    subjectId: string;
    label: string;
    unitIds: string[];
}

@Component({
    selector: 'adm-section-modal',
    standalone: true,
    imports: [FormsModule, ModalShellComponent, UnitTransferComponent],
    templateUrl: './section-modal.component.html',
    styleUrl: './section-modal.component.scss',
})
export class SectionModalComponent {
    private readonly data = inject(CmsDataService);

    @Input({ required: true }) exam!: AdminExam;

    @Output() dismiss = new EventEmitter<void>();
    @Output() save = new EventEmitter<SectionDraft>();

    subjectId: string | null = null;
    label = '';
    unitIds: string[] = [];

    get subjects(): AdminSubject[] {
        const used = this.exam.sections.map((section) => section.subjectId);
        return this.data.subjects.filter(
            (subject) => !used.includes(subject.id)
        );
    }

    get pickedSubject(): AdminSubject | null {
        return this.subjectId
            ? this.data.subjectById(this.subjectId) ?? null
            : null;
    }

    get units(): AdminUnit[] {
        return this.pickedSubject?.units ?? [];
    }

    get eyebrow(): string {
        return `Section · ${this.exam.code}`;
    }

    get scopeHint(): string {
        return this.pickedSubject
            ? `Pick which units of ${this.pickedSubject.name} this section draws from`
            : 'Pick a subject first';
    }

    pickSubject(subject: AdminSubject): void {
        this.subjectId = subject.id;
        this.unitIds = [];
    }

    confirm(): void {
        if (!this.subjectId) {
            return;
        }
        this.save.emit({
            subjectId: this.subjectId,
            label: this.label.trim(),
            unitIds: this.unitIds,
        });
    }
}
