import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    AdminExam,
    EXAM_TYPE_OPTIONS,
    ExamTypes,
} from '../../../../../shared/models/cms.model';
import { ModalShellComponent } from '../../../../../shared/components/modal-shell/modal-shell.component';

export interface ExamDraft {
    name: string;
    code: string;
    year: number;
    examType: ExamTypes;
    org: string;
    description: string;
}

@Component({
    selector: 'adm-exam-modal',
    standalone: true,
    imports: [FormsModule, ModalShellComponent],
    templateUrl: './exam-modal.component.html',
    styleUrl: './exam-modal.component.scss',
})
export class ExamModalComponent implements OnInit {
    @Input() exam: AdminExam | null = null;

    @Output() dismiss = new EventEmitter<void>();
    @Output() save = new EventEmitter<ExamDraft>();

    readonly examTypes = EXAM_TYPE_OPTIONS;

    draft: ExamDraft = {
        name: '',
        code: '',
        year: new Date().getFullYear(),
        examType: ExamTypes.National,
        org: '',
        description: '',
    };

    ngOnInit(): void {
        this.draft = {
            name: this.exam?.name ?? '',
            code: this.exam?.code ?? '',
            year: this.exam?.year ?? new Date().getFullYear(),
            examType: this.exam?.examType ?? ExamTypes.National,
            org: this.exam?.org ?? '',
            description: this.exam?.description ?? '',
        };
    }

    get title(): string {
        return this.exam ? 'Edit exam' : 'New exam';
    }
}
