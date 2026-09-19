import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    AdminCourse,
    AdminUnit,
} from '../../../models/subject-management.model';
import { ModalShellComponent } from '../../modal-shell/modal-shell.component';
import { UnitTransferComponent } from '../../unit-transfer/unit-transfer.component';

@Component({
    selector: 'adm-scope-modal',
    standalone: true,
    imports: [ModalShellComponent, UnitTransferComponent],
    templateUrl: './scope-modal.component.html',
    styleUrl: './scope-modal.component.scss',
})
export class ScopeModalComponent implements OnInit {
    @Input({ required: true }) course!: AdminCourse;
    @Input({ required: true }) units: AdminUnit[] = [];

    @Output() dismiss = new EventEmitter<void>();
    @Output() save = new EventEmitter<string[]>();

    unitIds: string[] = [];

    ngOnInit(): void {
        this.unitIds = [...this.course.unitIds];
    }

    get eyebrow(): string {
        return `Unit scope · ${this.course.code}`;
    }
}
