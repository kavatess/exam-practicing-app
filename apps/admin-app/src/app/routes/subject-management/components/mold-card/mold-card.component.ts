import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MoldStatuses, MoldTypes, QuestionDifficulties } from '@libs/models';
import {
    AdminMold,
    AdminMoldBlock,
    AdminUnit,
    countCourseQuestions,
    countMoldBlocks,
    DIFFICULTY_LABELS,
} from '../../models/subject-management.model';
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
    @Input() units: AdminUnit[] = [];
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
        return countCourseQuestions(this.mold);
    }

    get structureMeta(): string {
        const pages = this.mold.pages.length;
        const blocks = countMoldBlocks(this.mold);
        return `${pages} ${pages === 1 ? 'PAGE' : 'PAGES'} · ${blocks} ${
            blocks === 1 ? 'BLOCK' : 'BLOCKS'
        } · ${this.plannedQuestions} QUESTIONS`;
    }

    get balance(): string {
        const total = this.plannedQuestions;
        if (!total) {
            return 'No questions planned yet';
        }
        const buckets = new Map<QuestionDifficulties, number>();
        for (const page of this.mold.pages) {
            for (const block of page.blocks) {
                buckets.set(
                    block.difficulty,
                    (buckets.get(block.difficulty) ?? 0) + block.questionCount
                );
            }
        }
        const parts = [...buckets.entries()]
            .sort((a, b) => a[0] - b[0])
            .map(
                ([difficulty, count]) =>
                    `${Math.round(
                        (count / total) * 100
                    )}% ${DIFFICULTY_LABELS[difficulty].toLowerCase()}`
            );
        return `Difficulty mix: ${parts.join(' · ')}`;
    }

    onPatchBlock(pageId: string, patch: PageBlockPatch): void {
        this.patchBlock.emit({
            pageId,
            blockId: patch.blockId,
            changes: patch.changes,
        });
    }
}
