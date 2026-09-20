import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import {
    AdminExam,
    AdminMold,
    AdminSubject,
    ExamSection,
    formatUpdatedStamp,
} from '../../../../shared/models/cms.model';
import {
    BlockPatch,
    BlockRef,
    MoldCardComponent,
} from '../mold-card/mold-card.component';
import { SectionCardComponent } from '../section-card/section-card.component';

export interface MoldBlockPatch extends BlockPatch {
    moldId: string;
}

export interface MoldBlockRef extends BlockRef {
    moldId: string;
}

@Component({
    selector: 'adm-exam-detail',
    standalone: true,
    imports: [MoldCardComponent, SectionCardComponent],
    templateUrl: './exam-detail.component.html',
    styleUrl: './exam-detail.component.scss',
})
export class ExamDetailComponent {
    @Input() set exam(value: AdminExam | null) {
        if (value?.id !== this.selectedExam?.id) {
            this.expandedMoldId.set(value?.molds[0]?.id ?? null);
        }
        this.selectedExam = value;
    }

    get exam(): AdminExam | null {
        return this.selectedExam;
    }

    @Input() subjects: AdminSubject[] = [];

    private selectedExam: AdminExam | null = null;

    @Output() editExam = new EventEmitter<void>();
    @Output() removeExam = new EventEmitter<void>();
    @Output() addSection = new EventEmitter<void>();
    @Output() editScope = new EventEmitter<ExamSection>();
    @Output() removeSection = new EventEmitter<ExamSection>();
    @Output() createMold = new EventEmitter<void>();
    @Output() editMold = new EventEmitter<AdminMold>();
    @Output() removeMold = new EventEmitter<AdminMold>();
    @Output() addPage = new EventEmitter<string>();
    @Output() addBlock = new EventEmitter<{ moldId: string; pageId: string }>();
    @Output() removeBlock = new EventEmitter<MoldBlockRef>();
    @Output() patchBlock = new EventEmitter<MoldBlockPatch>();

    readonly expandedMoldId = signal<string | null>(null);

    get typeClass(): string {
        return this.exam ? `type-${this.exam.examType.toLowerCase()}` : '';
    }

    get meta(): string {
        if (!this.exam) {
            return '';
        }
        const sections = this.exam.sections.length;
        const molds = this.exam.molds.length;
        return [
            this.exam.code,
            `${sections} ${sections === 1 ? 'SECTION' : 'SECTIONS'}`,
            `${molds} ${molds === 1 ? 'TEST MOLD' : 'TEST MOLDS'}`,
            `UPDATED ${this.updatedLabel}`,
        ].join(' · ');
    }

    get sectionHint(): string {
        return (this.exam?.sections.length ?? 0) > 1
            ? 'One section per subject this exam covers — each keeps its own unit scope'
            : 'A single-subject paper: one section, one unit scope';
    }

    private get updatedLabel(): string {
        return formatUpdatedStamp(this.exam?.updatedAt);
    }

    toggleMold(mold: AdminMold): void {
        this.expandedMoldId.update((id) => (id === mold.id ? null : mold.id));
    }
}
