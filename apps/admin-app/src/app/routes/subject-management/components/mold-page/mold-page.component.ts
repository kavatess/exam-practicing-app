import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuestionDifficulties, QuestionTypes } from '@libs/models';
import {
    AdminMoldBlock,
    AdminMoldPage,
    AdminUnit,
    DIFFICULTY_LABELS,
    DIFFICULTY_OPTIONS,
    QUESTION_TYPE_LABELS,
    QUESTION_TYPE_OPTIONS,
} from '../../models/subject-management.model';

export interface PageBlockPatch {
    blockId: string;
    changes: Partial<AdminMoldBlock>;
}

@Component({
    selector: 'adm-mold-page',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './mold-page.component.html',
    styleUrl: './mold-page.component.scss',
})
export class MoldPageComponent {
    @Input({ required: true }) page!: AdminMoldPage;
    @Input() units: AdminUnit[] = [];
    @Input() index = 0;
    @Input() moldQuestionCount = 0;

    @Output() addBlock = new EventEmitter<void>();
    @Output() removeBlock = new EventEmitter<string>();
    @Output() patchBlock = new EventEmitter<PageBlockPatch>();

    readonly questionTypes = QUESTION_TYPE_OPTIONS;
    readonly difficulties = DIFFICULTY_OPTIONS;

    get order(): string {
        return String(this.index + 1).padStart(2, '0');
    }

    get questionTotal(): number {
        return this.page.blocks.reduce(
            (total, block) => total + block.questionCount,
            0
        );
    }

    get meta(): string {
        const blocks = this.page.blocks.length;
        return `${blocks} ${blocks === 1 ? 'block' : 'blocks'} · ${
            this.questionTotal
        } q`;
    }

    subUnitTitle(subUnitId: string): string {
        for (const unit of this.units) {
            const match = unit.subUnits.find((sub) => sub.id === subUnitId);
            if (match) {
                return match.title;
            }
        }
        return '—';
    }

    availableSubUnits(block: AdminMoldBlock) {
        const unit = this.units.find((item) => item.id === block.courseUnitId);
        return unit
            ? unit.subUnits.filter((sub) => !block.subUnitIds.includes(sub.id))
            : [];
    }

    typeLabel(type: QuestionTypes): string {
        return QUESTION_TYPE_LABELS[type];
    }

    difficultyLabel(difficulty: QuestionDifficulties): string {
        return DIFFICULTY_LABELS[difficulty];
    }

    difficultyClass(difficulty: QuestionDifficulties): string {
        return `diff-${DIFFICULTY_LABELS[difficulty].toLowerCase()}`;
    }

    onUnitChange(block: AdminMoldBlock, unitId: string): void {
        this.patchBlock.emit({
            blockId: block.id,
            changes: { courseUnitId: unitId, subUnitIds: [] },
        });
    }

    onTypeChange(block: AdminMoldBlock, qType: QuestionTypes): void {
        this.patchBlock.emit({ blockId: block.id, changes: { qType } });
    }

    onDifficultyChange(
        block: AdminMoldBlock,
        difficulty: QuestionDifficulties
    ): void {
        this.patchBlock.emit({ blockId: block.id, changes: { difficulty } });
    }

    onCountChange(block: AdminMoldBlock, value: string): void {
        this.patchBlock.emit({
            blockId: block.id,
            changes: { questionCount: Math.max(0, Number(value) || 0) },
        });
    }

    onSubUnitAdd(block: AdminMoldBlock, subUnitId: string): void {
        if (!subUnitId) {
            return;
        }
        this.patchBlock.emit({
            blockId: block.id,
            changes: { subUnitIds: [...block.subUnitIds, subUnitId] },
        });
    }

    onSubUnitRemove(block: AdminMoldBlock, subUnitId: string): void {
        this.patchBlock.emit({
            blockId: block.id,
            changes: {
                subUnitIds: block.subUnitIds.filter((id) => id !== subUnitId),
            },
        });
    }
}
