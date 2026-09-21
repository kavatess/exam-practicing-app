import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { QuestionDifficulties, QuestionTypes } from '@libs/models';
import {
    AdminSubject,
    AdminSubUnit,
    AdminUnit,
    DIFFICULTY_LABELS,
    DIFFICULTY_OPTIONS,
    findSubject,
    gradePool,
    PoolHealth,
    QUESTION_TYPE_LABELS,
    QUESTION_TYPE_OPTIONS,
    QuestionFilter,
} from '../../../../shared/models/cms.model';

type OpenMenu = 'subject' | 'type' | 'difficulty' | null;

@Component({
    selector: 'adm-filter-rail',
    standalone: true,
    imports: [],
    templateUrl: './filter-rail.component.html',
    styleUrl: './filter-rail.component.scss',
})
export class FilterRailComponent {
    @Input({ required: true }) filter!: QuestionFilter;
    @Input() subjects: AdminSubject[] = [];
    @Input() matchCount = 0;
    /** Questions the scoped block asks for, or a typical block when unscoped. */
    @Input() blockNeeds = 0;

    @Output() selectSubject = new EventEmitter<string | null>();
    @Output() toggleUnit = new EventEmitter<string>();
    @Output() toggleSubUnit = new EventEmitter<string>();
    @Output() selectType = new EventEmitter<QuestionTypes | null>();
    @Output() selectDifficulty = new EventEmitter<QuestionDifficulties | null>();
    @Output() toggleLevel = new EventEmitter<string>();
    @Output() resetFilters = new EventEmitter<void>();

    readonly menu = signal<OpenMenu>(null);

    readonly typeOptions = QUESTION_TYPE_OPTIONS;
    readonly difficultyOptions = DIFFICULTY_OPTIONS;
    readonly typeLabels = QUESTION_TYPE_LABELS;
    readonly difficultyLabels = DIFFICULTY_LABELS;

    /** No subject picked means the whole bank, across every subject. */
    get allSubjects(): boolean {
        return this.filter.subjectId === null;
    }

    get subject(): AdminSubject | null {
        return this.filter.subjectId
            ? findSubject(this.subjects, this.filter.subjectId) ?? null
            : null;
    }

    get subjectLabel(): string {
        return this.subject?.name ?? 'All subjects';
    }

    get typeLabel(): string {
        return this.filter.qType === null
            ? 'All types'
            : this.typeLabels[this.filter.qType];
    }

    get difficultyLabel(): string {
        return this.filter.difficulty === null
            ? 'All difficulties'
            : this.difficultyLabels[this.filter.difficulty];
    }

    get units(): AdminUnit[] {
        return this.subject?.units ?? [];
    }

    get unitSelectedLabel(): string {
        if (this.allSubjects) {
            return '—';
        }
        const count = this.filter.unitIds.length;
        return count ? `${count} SELECTED` : 'ALL UNITS';
    }

    /** Sub-units of the picked units — nothing to narrow by until one is on. */
    get subUnitPool(): AdminSubUnit[] {
        return this.units
            .filter((unit) => this.filter.unitIds.includes(unit.id))
            .flatMap((unit) => unit.subUnits);
    }

    get subUnitSelectedLabel(): string {
        const count = this.filter.subUnitIds.length;
        return count ? `${count} SELECTED` : 'ALL SUB-UNITS';
    }

    get levels(): string[] {
        return this.subject?.levels ?? [];
    }

    get levelScopeLabel(): string {
        return this.subject
            ? `${this.subject.name.toUpperCase()} · ${this.levels.length} TAGS`
            : 'NO SUBJECT';
    }

    get pool(): PoolHealth {
        return gradePool(this.matchCount, this.blockNeeds);
    }

    get matchCountLabel(): string {
        return this.matchCount.toLocaleString('en-US');
    }

    subjectQuestionCount(subject: AdminSubject): number {
        return subject.units.reduce(
            (total, unit) => total + unit.questionCount,
            0
        );
    }

    get bankQuestionCount(): number {
        return this.subjects.reduce(
            (total, subject) => total + this.subjectQuestionCount(subject),
            0
        );
    }

    isUnitOn(unitId: string): boolean {
        return this.filter.unitIds.includes(unitId);
    }

    isSubUnitOn(subUnitId: string): boolean {
        return this.filter.subUnitIds.includes(subUnitId);
    }

    openMenu(menu: OpenMenu): void {
        this.menu.update((current) => (current === menu ? null : menu));
    }

    pickSubject(subjectId: string | null): void {
        this.menu.set(null);
        this.selectSubject.emit(subjectId);
    }

    pickType(qType: QuestionTypes | null): void {
        this.menu.set(null);
        this.selectType.emit(qType);
    }

    pickDifficulty(difficulty: QuestionDifficulties | null): void {
        this.menu.set(null);
        this.selectDifficulty.emit(difficulty);
    }
}
