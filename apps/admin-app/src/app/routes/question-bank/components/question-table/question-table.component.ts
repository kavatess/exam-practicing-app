import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    AdminQuestion,
    AdminSubject,
    QuestionMatch,
} from '../../../../shared/models/cms.model';
import { QuestionRowComponent } from '../question-row/question-row.component';

const PAGE_SIZE = 8;

@Component({
    selector: 'adm-question-table',
    standalone: true,
    imports: [FormsModule, QuestionRowComponent],
    templateUrl: './question-table.component.html',
    styleUrl: './question-table.component.scss',
})
export class QuestionTableComponent {
    @Input() questions: AdminQuestion[] = [];
    @Input() subjects: AdminSubject[] = [];
    @Input() matchCount = 0;
    @Input() bankTotal = 0;
    @Input() matchCounts: Record<string, number> = {};
    @Input() matches: Record<string, QuestionMatch[]> = {};
    @Input() showSubjectDot = false;
    @Input() search = '';

    @Output() searchChange = new EventEmitter<string>();
    @Output() create = new EventEmitter<void>();
    @Output() importCsv = new EventEmitter<void>();
    @Output() openMatches = new EventEmitter<string>();
    @Output() edit = new EventEmitter<AdminQuestion>();
    @Output() remove = new EventEmitter<AdminQuestion>();

    readonly openPopoverId = signal<string | null>(null);

    get pagerLabel(): string {
        if (!this.questions.length) {
            return `No rows · ${this.bankTotal.toLocaleString(
                'en-US'
            )} questions in the bank`;
        }
        return `Showing 1–${this.questions.length} of ${this.matchCount.toLocaleString(
            'en-US'
        )} matching questions · ${this.bankTotal.toLocaleString(
            'en-US'
        )} in the bank`;
    }

    /** Pages the whole matching pool would fill, not just the rows loaded. */
    get lastPage(): number {
        return Math.max(1, Math.ceil(this.matchCount / PAGE_SIZE));
    }

    /** `1 2 3 … n` — the artifact's pager, with an ellipsis when it skips. */
    get pages(): (number | null)[] {
        const last = this.lastPage;
        if (last <= 4) {
            return Array.from({ length: last }, (_, index) => index + 1);
        }
        return [1, 2, 3, null, last];
    }

    matchCountFor(question: AdminQuestion): number {
        return this.matchCounts[question.id] ?? 0;
    }

    matchesFor(question: AdminQuestion): QuestionMatch[] {
        return this.matches[question.id] ?? [];
    }

    togglePopover(question: AdminQuestion): void {
        const next =
            this.openPopoverId() === question.id ? null : question.id;
        this.openPopoverId.set(next);
        if (next) {
            this.openMatches.emit(question.id);
        }
    }

    onSearch(value: string): void {
        this.searchChange.emit(value);
    }
}
