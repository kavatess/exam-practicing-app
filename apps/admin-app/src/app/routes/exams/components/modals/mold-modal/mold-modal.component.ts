import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MoldStatuses, MoldTypes } from '@libs/models';
import { AdminExam, AdminMold } from '../../../../../shared/models/cms.model';
import { ModalShellComponent } from '../../../../../shared/components/modal-shell/modal-shell.component';

export interface MoldDraft {
    name: string;
    type: MoldTypes;
    duration: number;
    numOfQuestions: number;
    passingScore: number;
    status: MoldStatuses;
}

@Component({
    selector: 'adm-mold-modal',
    standalone: true,
    imports: [FormsModule, ModalShellComponent],
    templateUrl: './mold-modal.component.html',
    styleUrl: './mold-modal.component.scss',
})
export class MoldModalComponent implements OnInit {
    @Input() mold: AdminMold | null = null;
    @Input({ required: true }) exam!: AdminExam;

    @Output() dismiss = new EventEmitter<void>();
    @Output() save = new EventEmitter<MoldDraft>();

    readonly moldTypes = MoldTypes;

    draft: MoldDraft = {
        name: '',
        type: MoldTypes.Test,
        duration: 90,
        numOfQuestions: 50,
        passingScore: 30,
        status: MoldStatuses.Active,
    };

    ngOnInit(): void {
        this.draft = {
            name: this.mold?.name ?? '',
            type: this.mold?.type ?? MoldTypes.Test,
            duration: this.mold?.duration ?? 90,
            numOfQuestions: this.mold?.numOfQuestions ?? 50,
            passingScore: this.mold?.passingScore ?? 30,
            status: this.mold?.status ?? MoldStatuses.Active,
        };
    }

    get title(): string {
        return this.mold ? 'Edit test mold' : 'New test mold';
    }

    get eyebrow(): string {
        return `Test mold · ${this.exam.code}`;
    }

    get isActive(): boolean {
        return this.draft.status === MoldStatuses.Active;
    }

    setType(type: MoldTypes): void {
        this.draft = { ...this.draft, type };
    }

    toggleActive(): void {
        this.draft = {
            ...this.draft,
            status: this.isActive ? MoldStatuses.Inactive : MoldStatuses.Active,
        };
    }
}
