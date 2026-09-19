import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    AdminCourse,
    AdminUnit,
    COURSE_TYPE_OPTIONS,
    CourseTypes,
} from '../../../models/subject-management.model';
import { ModalShellComponent } from '../../modal-shell/modal-shell.component';
import { UnitTransferComponent } from '../../unit-transfer/unit-transfer.component';

export interface CourseDraft {
    name: string;
    code: string;
    year: number;
    courseType: CourseTypes;
    description: string;
    unitIds: string[];
}

@Component({
    selector: 'adm-course-modal',
    standalone: true,
    imports: [FormsModule, ModalShellComponent, UnitTransferComponent],
    templateUrl: './course-modal.component.html',
    styleUrl: './course-modal.component.scss',
})
export class CourseModalComponent implements OnInit {
    @Input() course: AdminCourse | null = null;
    @Input({ required: true }) subjectName!: string;
    @Input({ required: true }) units: AdminUnit[] = [];

    @Output() dismiss = new EventEmitter<void>();
    @Output() save = new EventEmitter<CourseDraft>();

    readonly courseTypes = COURSE_TYPE_OPTIONS;

    draft: CourseDraft = {
        name: '',
        code: '',
        year: new Date().getFullYear(),
        courseType: CourseTypes.National,
        description: '',
        unitIds: [],
    };

    ngOnInit(): void {
        this.draft = {
            name: this.course?.name ?? '',
            code: this.course?.code ?? '',
            year: this.course?.year ?? new Date().getFullYear(),
            courseType: this.course?.courseType ?? CourseTypes.National,
            description: this.course?.description ?? '',
            unitIds: [...(this.course?.unitIds ?? [])],
        };
    }

    get title(): string {
        return this.course ? 'Edit course' : 'New course';
    }

    get eyebrow(): string {
        return `Course · Subject ${this.subjectName}`;
    }

    onScopeChange(unitIds: string[]): void {
        this.draft = { ...this.draft, unitIds };
    }
}
