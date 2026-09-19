import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminSubject } from '../../../models/subject-management.model';
import { ModalShellComponent } from '../../modal-shell/modal-shell.component';

export interface SubjectDraft {
    name: string;
    description: string;
}

@Component({
    selector: 'adm-subject-modal',
    standalone: true,
    imports: [FormsModule, ModalShellComponent],
    templateUrl: './subject-modal.component.html',
    styleUrl: './subject-modal.component.scss',
})
export class SubjectModalComponent implements OnInit {
    @Input() subject: AdminSubject | null = null;

    @Output() dismiss = new EventEmitter<void>();
    @Output() save = new EventEmitter<SubjectDraft>();

    draft: SubjectDraft = { name: '', description: '' };

    ngOnInit(): void {
        this.draft = {
            name: this.subject?.name ?? '',
            description: this.subject?.description ?? '',
        };
    }

    get title(): string {
        return this.subject ? 'Edit subject' : 'New subject';
    }
}
