import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MoldStatuses, MoldTypes, QuestionDifficulties } from '@libs/models';
import {
    AdminMold,
    AdminMoldBlock,
    AdminSubject,
    countMoldBlocks,
    countMoldQuestions,
    DIFFICULTY_LABELS,
    ExamSection,
    findSubject,
} from '../../../../shared/models/cms.model';
import {
    MoldPageComponent,
    PageBlockPatch,
} from '../mold-page/mold-page.component';

export interface BlockPatch {
    pageId: string;
    blockId: string;
    changes: Partial<AdminMoldBlock>;
}

export interface BlockRef {
    pageId: string;
    blockId: string;
}

@Component({
    selector: 'adm-mold-card',
    standalone: true,
    imports: [MoldPageComponent],
    templateUrl: './mold-card.component.html',
    styleUrl: './mold-card.component.scss',
})
export class MoldCardComponent {
    @Input({ required: true }) mold!: AdminMold;
    @Input() sections: ExamSection[] = [];
    @Input() subjects: AdminSubject[] = [];
    @Input() expanded = false;

    @Output() toggleExpand = new EventEmitter<void>();
    @Output() edit = new EventEmitter<void>();
    @Output() remove = new EventEmitter<void>();
    @Output() addPage = new EventEmitter<void>();
    @Output() addBlock = new EventEmitter<string>();
    @Output() removeBlock = new EventEmitter<BlockRef>();
    @Output() patchBlock = new EventEmitter<BlockPatch>();

    get kindLabel(): string {
        return this.mold.type === MoldTypes.Test ? 'Test' : 'Practice';
    }

    get isTest(): boolean {
        return this.mold.type === MoldTypes.Test;
    }

    get isActive(): boolean {
        return this.mold.status === MoldStatuses.Active;
    }

    get durationLabel(): string {
        return this.mold.duration ? `${this.mold.duration} min` : '—';
    }

    get passingLabel(): string {
        return this.mold.passingScore
            ? `${this.mold.passingScore} / ${this.mold.numOfQuestions}`
            : '—';
    }

    get plannedQuestions(): number {
        return countMoldQuestions(this.mold);
    }

    get structureMeta(): string {
        const pages = this.mold.pages.length;
        const blocks = countMoldBlocks(this.mold);
        const parts = [
            `${pages} ${pages === 1 ? 'PAGE' : 'PAGES'}`,
            `${blocks} ${blocks === 1 ? 'BLOCK' : 'BLOCKS'}`,
            `${this.plannedQuestions} QUESTIONS`,
        ];
        // Multi-subject exams call out how many of their sections the mold draws on.
        if (this.sections.length > 1) {
            const used = this.usedSections.length;
            parts.push(used === 1 ? '1 SECTION USED' : `${used} SECTIONS`);
        }
        return parts.join(' · ');
    }

    /** Sections this mold actually pulls blocks from, in exam order. */
    private get usedSections(): ExamSection[] {
        const used = new Set(
            this.mold.pages.flatMap((page) =>
                page.blocks.map((block) => block.sectionId)
            )
        );
        return this.sections.filter((section) => used.has(section.id));
    }

    get balance(): string {
        const total = this.plannedQuestions;
        if (!total) {
            return 'No questions planned yet';
        }
        const used = this.usedSections;
        return used.length > 1
            ? `One timer, one combined score · ${this.sectionSplit(used)}`
            : `Difficulty mix: ${this.difficultyMix(total)}`;
    }

    private sectionSplit(sections: ExamSection[]): string {
        return sections
            .map((section) => {
                const count = this.mold.pages.reduce(
                    (sum, page) =>
                        sum +
                        page.blocks
                            .filter((block) => block.sectionId === section.id)
                            .reduce((n, block) => n + block.questionCount, 0),
                    0
                );
                return `${this.sectionLabel(section)} ${count}`;
            })
            .join(' · ');
    }

    private sectionLabel(section: ExamSection): string {
        const label = section.label?.replace(/^Tư duy /, '').trim();
        return label || this.sectionSubject(section);
    }

    private sectionSubject(section: ExamSection): string {
        return findSubject(this.subjects, section.subjectId)?.name ?? 'Section';
    }

    private difficultyMix(total: number): string {
        const buckets = new Map<QuestionDifficulties, number>();
        for (const page of this.mold.pages) {
            for (const block of page.blocks) {
                buckets.set(
                    block.difficulty,
                    (buckets.get(block.difficulty) ?? 0) + block.questionCount
                );
            }
        }
        return [...buckets.entries()]
            .sort((a, b) => a[0] - b[0])
            .map(
                ([difficulty, count]) =>
                    `${Math.round(
                        (count / total) * 100
                    )}% ${DIFFICULTY_LABELS[difficulty].toLowerCase()}`
            )
            .join(' · ');
    }

    onPatchBlock(pageId: string, patch: PageBlockPatch): void {
        this.patchBlock.emit({
            pageId,
            blockId: patch.blockId,
            changes: patch.changes,
        });
    }
}
