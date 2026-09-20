import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import {
    AdminUnit,
    ExamSection,
} from '../../../../../shared/models/cms.model';
import { CmsDataService } from '../../../../../shared/services/cms-data.service';
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
    private readonly data = inject(CmsDataService);

    @Input({ required: true }) section!: ExamSection;
    @Input({ required: true }) examCode!: string;

    @Output() dismiss = new EventEmitter<void>();
    @Output() save = new EventEmitter<string[]>();

    unitIds: string[] = [];

    ngOnInit(): void {
        this.unitIds = [...this.section.unitIds];
    }

    get subjectName(): string {
        return (
            this.data.subjectById(this.section.subjectId)?.name ?? 'Subject'
        );
    }

    get units(): AdminUnit[] {
        return this.data.subjectById(this.section.subjectId)?.units ?? [];
    }

    get eyebrow(): string {
        return `Unit scope · ${this.examCode} · ${this.subjectName}`;
    }
}
