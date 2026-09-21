import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
    AdminQuestion,
    AdminSubject,
    DIFFICULTY_LABELS,
    findSubject,
    QUESTION_TYPE_SHORT_LABELS,
    QuestionMatch,
} from '../../../../shared/models/cms.model';

@Component({
    selector: 'adm-question-row',
    standalone: true,
    imports: [],
    templateUrl: './question-row.component.html',
    styleUrl: './question-row.component.scss',
})
export class QuestionRowComponent {
    @Input({ required: true }) question!: AdminQuestion;
    @Input() subjects: AdminSubject[] = [];
    @Input() matchCount = 0;
    @Input() matches: QuestionMatch[] = [];
    /** Mixed-subject listings mark each row with its subject's colour. */
    @Input() showSubjectDot = false;
    @Input() popoverOpen = false;

    @Output() toggleMatches = new EventEmitter<void>();
    @Output() edit = new EventEmitter<void>();
    @Output() remove = new EventEmitter<void>();

    get subject(): AdminSubject | null {
        return findSubject(this.subjects, this.question.subjectId) ?? null;
    }

    /** `Unit › Sub-unit` — the tags a mold block filters on. */
    get tagPath(): string {
        const subject = this.subject;
        if (!subject) {
            return '';
        }
        const units = subject.units.filter((unit) =>
            this.question.unitIds.includes(unit.id)
        );
        const unitTitles = units.map((unit) => unit.title).join(', ');
        const subTitles = units
            .flatMap((unit) => unit.subUnits)
            .filter((sub) => this.question.subUnitIds.includes(sub.id))
            .map((sub) => sub.title)
            .join(', ');
        return subTitles ? `${unitTitles} › ${subTitles}` : unitTitles;
    }

    get typeLabel(): string {
        return QUESTION_TYPE_SHORT_LABELS[this.question.qType];
    }

    get difficultyLabel(): string {
        return DIFFICULTY_LABELS[this.question.difficulty];
    }

    get difficultyClass(): string {
        return `diff-${this.difficultyLabel.toLowerCase()}`;
    }

    get matchLabel(): string {
        if (!this.matchCount) {
            return 'No matches';
        }
        return this.matchCount === 1
            ? 'Matches 1 block'
            : `Matches ${this.matchCount} blocks`;
    }

    get dotColor(): string {
        return this.subject?.color ?? '#c7cfc9';
    }
}
