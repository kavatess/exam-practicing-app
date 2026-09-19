import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import {
    AdminCourse,
    AdminMold,
    AdminSubject,
    AdminUnit,
} from '../../models/subject-management.model';
import {
    BlockPatch,
    BlockRef,
    MoldCardComponent,
} from '../mold-card/mold-card.component';
import { ScopeCardComponent } from '../scope-card/scope-card.component';

export interface MoldBlockPatch extends BlockPatch {
    moldId: string;
}

export interface MoldBlockRef extends BlockRef {
    moldId: string;
}

@Component({
    selector: 'adm-course-detail',
    standalone: true,
    imports: [MoldCardComponent, ScopeCardComponent],
    templateUrl: './course-detail.component.html',
    styleUrl: './course-detail.component.scss',
})
export class CourseDetailComponent {
    @Input({ required: true }) subject!: AdminSubject;

    @Input() set course(value: AdminCourse | null) {
        if (value?.id !== this.selectedCourse?.id) {
            this.expandedMoldId.set(value?.molds[0]?.id ?? null);
        }
        this.selectedCourse = value;
    }

    get course(): AdminCourse | null {
        return this.selectedCourse;
    }

    private selectedCourse: AdminCourse | null = null;

    @Output() editCourse = new EventEmitter<void>();
    @Output() removeCourse = new EventEmitter<void>();
    @Output() editScope = new EventEmitter<void>();
    @Output() createMold = new EventEmitter<void>();
    @Output() editMold = new EventEmitter<AdminMold>();
    @Output() removeMold = new EventEmitter<AdminMold>();
    @Output() addPage = new EventEmitter<string>();
    @Output() addBlock = new EventEmitter<{ moldId: string; pageId: string }>();
    @Output() removeBlock = new EventEmitter<MoldBlockRef>();
    @Output() patchBlock = new EventEmitter<MoldBlockPatch>();

    readonly expandedMoldId = signal<string | null>(null);

    get scopedUnits(): AdminUnit[] {
        if (!this.course) {
            return [];
        }
        return this.subject.units.filter((unit) =>
            this.course?.unitIds.includes(unit.id)
        );
    }

    get typeClass(): string {
        return this.course ? `type-${this.course.courseType.toLowerCase()}` : '';
    }

    get updatedLabel(): string {
        const updated = this.course?.updatedAt;
        const date = updated ? new Date(updated) : new Date();
        return date
            .toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
            })
            .toUpperCase();
    }

    toggleMold(mold: AdminMold): void {
        this.expandedMoldId.update((id) => (id === mold.id ? null : mold.id));
    }
}
