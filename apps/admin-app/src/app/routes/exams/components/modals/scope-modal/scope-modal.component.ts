import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    AdminSubject,
    AdminUnit,
    ExamSection,
    findSubject,
} from '../../../../../shared/models/cms.model';
import { ModalShellComponent } from '../../../../../shared/components/modal-shell/modal-shell.component';
import { UnitTransferComponent } from '../../../../../shared/components/unit-transfer/unit-transfer.component';

@Component({
    selector: 'adm-scope-modal',
    standalone: true,
    imports: [ModalShellComponent, UnitTransferComponent],
    templateUrl: './scope-modal.component.html',
    styleUrl: './scope-modal.component.scss',
})
export class ScopeModalComponent implements OnInit {
    @Input({ required: true }) section!: ExamSection;
    @Input() subjects: AdminSubject[] = [];
    @Input({ required: true }) examCode!: string;

    @Output() dismiss = new EventEmitter<void>();
    @Output() save = new EventEmitter<string[]>();

    unitIds: string[] = [];

    ngOnInit(): void {
        this.unitIds = [...this.section.unitIds];
    }

    get subjectName(): string {
        return (
            findSubject(this.subjects, this.section.subjectId)?.name ??
            'Subject'
        );
    }

    get units(): AdminUnit[] {
        return findSubject(this.subjects, this.section.subjectId)?.units ?? [];
    }

    get eyebrow(): string {
        return `Unit scope · ${this.examCode} · ${this.subjectName}`;
    }
}
