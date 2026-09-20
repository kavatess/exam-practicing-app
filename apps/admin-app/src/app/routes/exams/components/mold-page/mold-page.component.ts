import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuestionDifficulties, QuestionTypes } from '@libs/models';
import {
    AdminMoldBlock,
    AdminMoldPage,
    AdminSubject,
    AdminUnit,
    DIFFICULTY_LABELS,
    DIFFICULTY_OPTIONS,
    ExamSection,
    findSubject,
    QUESTION_TYPE_LABELS,
    QUESTION_TYPE_OPTIONS,
    unitsInScope,
} from '../../../../shared/models/cms.model';

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
    @Input() sections: ExamSection[] = [];
    @Input() subjects: AdminSubject[] = [];
    @Input() index = 0;
    @Input() moldQuestionCount = 0;

    @Output() addBlock = new EventEmitter<void>();
    @Output() removeBlock = new EventEmitter<string>();
    @Output() patchBlock = new EventEmitter<PageBlockPatch>();

    readonly questionTypes = QUESTION_TYPE_OPTIONS;
    readonly difficulties = DIFFICULTY_OPTIONS;

    get multiSection(): boolean {
        return this.sections.length > 1;
    }

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

    sectionName(sectionId: string): string {
        const section = this.sections.find((item) => item.id === sectionId);
        return section
            ? findSubject(this.subjects, section.subjectId)?.name ?? '—'
            : '—';
    }

    unitsFor(block: AdminMoldBlock): AdminUnit[] {
        const section = this.sections.find(
            (item) => item.id === block.sectionId
        );
        return section ? unitsInScope(this.subjects, section) : [];
    }

    availableSubUnits(block: AdminMoldBlock) {
        const unit = this.unitsFor(block).find(
            (item) => item.id === block.courseUnitId
        );
        return unit
            ? unit.subUnits.filter((sub) => !block.subUnitIds.includes(sub.id))
            : [];
    }

    subUnitTitle(block: AdminMoldBlock, subUnitId: string): string {
        for (const unit of this.unitsFor(block)) {
            const match = unit.subUnits.find((sub) => sub.id === subUnitId);
            if (match) {
                return match.title;
            }
        }
        return '—';
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

    onSectionChange(block: AdminMoldBlock, sectionId: string): void {
        const section = this.sections.find((item) => item.id === sectionId);
        this.patchBlock.emit({
            blockId: block.id,
            changes: {
                sectionId,
                courseUnitId: section?.unitIds[0] ?? '',
                subUnitIds: [],
            },
        });
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
