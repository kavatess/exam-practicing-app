import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminUnit } from '../../../../../shared/models/cms.model';
import { ModalShellComponent } from '../../../../../shared/components/modal-shell/modal-shell.component';
import { UnitDraft } from '../../../store/subject-management.service';

@Component({
    selector: 'adm-unit-modal',
    standalone: true,
    imports: [FormsModule, ModalShellComponent],
    templateUrl: './unit-modal.component.html',
    styleUrl: './unit-modal.component.scss',
})
export class UnitModalComponent implements OnInit {
    @Input() unit: AdminUnit | null = null;
    @Input() defaultOrder = 1;

    @Output() dismiss = new EventEmitter<void>();
    @Output() save = new EventEmitter<UnitDraft>();

    draft: UnitDraft = {
        title: '',
        description: '',
        order: 1,
        subUnitTitles: [],
    };

    ngOnInit(): void {
        this.draft = {
            title: this.unit?.title ?? '',
            description: this.unit?.description ?? '',
            order: this.defaultOrder,
            subUnitTitles: this.unit?.subUnits.map((sub) => sub.title) ?? [],
        };
    }

    get title(): string {
        return this.unit ? 'Edit unit' : 'New unit';
    }

    addSubUnit(): void {
        this.draft.subUnitTitles = [...this.draft.subUnitTitles, ''];
    }

    updateSubUnit(index: number, value: string): void {
        this.draft.subUnitTitles = this.draft.subUnitTitles.map((title, i) =>
            i === index ? value : title
        );
    }

    removeSubUnit(index: number): void {
        this.draft.subUnitTitles = this.draft.subUnitTitles.filter(
            (_, i) => i !== index
        );
    }
}
