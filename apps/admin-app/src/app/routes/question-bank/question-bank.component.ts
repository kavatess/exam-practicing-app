import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionDifficulties, QuestionTypes } from '@libs/models';
import { Store } from '@ngrx/store';
import { ADMIN_APP_ROUTES } from '../../app.routes';
import {
    AdminQuestion,
    TYPICAL_BLOCK_SIZE,
} from '../../shared/models/cms.model';
import { SubjectManagementActions } from '../subject-management/store/subject-management.actions';
import { SubjectManagementSelectors } from '../subject-management/store/subject-management.selectors';
import { FilterRailComponent } from './components/filter-rail/filter-rail.component';
import { QuestionModalComponent } from './components/modals/question-modal/question-modal.component';
import { QuestionTableComponent } from './components/question-table/question-table.component';
import { ScopeBannerComponent } from './components/scope-banner/scope-banner.component';
import { QuestionBankActions } from './store/question-bank.actions';
import { QuestionBankSelectors } from './store/question-bank.selectors';
import {
    QuestionBankService,
    QuestionDraft,
} from './store/question-bank.service';

@Component({
    selector: 'adm-question-bank',
    standalone: true,
    imports: [
        FilterRailComponent,
        ScopeBannerComponent,
        QuestionTableComponent,
        QuestionModalComponent,
    ],
    templateUrl: './question-bank.component.html',
    styleUrl: './question-bank.component.scss',
})
export class QuestionBankComponent implements OnInit {
    private readonly store = inject(Store);
    private readonly router = inject(Router);
    // Match counts come straight off the service: they describe the bank, not
    // the filtered view, so they don't belong in the filter's state slice.
    private readonly bank = inject(QuestionBankService);

    readonly questions = this.store.selectSignal(
        QuestionBankSelectors.Questions
    );
    readonly filter = this.store.selectSignal(QuestionBankSelectors.Filter);
    readonly scope = this.store.selectSignal(QuestionBankSelectors.Scope);
    readonly matchCount = this.store.selectSignal(
        QuestionBankSelectors.MatchCount
    );
    readonly bankTotal = this.store.selectSignal(
        QuestionBankSelectors.BankTotal
    );
    readonly matches = this.store.selectSignal(QuestionBankSelectors.Matches);
    readonly subjects = this.store.selectSignal(
        SubjectManagementSelectors.Subjects
    );

    // Overlay bookkeeping is view state, so it stays with the component.
    modalOpen = false;
    editingQuestion: AdminQuestion | null = null;

    ngOnInit(): void {
        if (!this.subjects().length) {
            this.store.dispatch(SubjectManagementActions.loadSubjects());
        }
        this.store.dispatch(QuestionBankActions.loadQuestions());
    }

    /** Mixed-subject listings mark each row with its subject's colour. */
    get showSubjectDot(): boolean {
        return this.filter().subjectId === null;
    }

    /** Questions the scoped block asks for, or a typical block when unscoped. */
    get blockNeeds(): number {
        return this.scope() ? 12 : TYPICAL_BLOCK_SIZE;
    }

    get matchCounts(): Record<string, number> {
        return Object.fromEntries(
            this.questions().map((question) => [
                question.id,
                this.bank.matchCountFor(question.id),
            ])
        );
    }

    get editingMatches() {
        const id = this.editingQuestion?.id;
        return id ? this.matches()[id] ?? [] : [];
    }

    selectSubject(subjectId: string | null): void {
        this.store.dispatch(QuestionBankActions.selectSubject({ subjectId }));
    }

    toggleUnit(unitId: string): void {
        this.store.dispatch(QuestionBankActions.toggleUnit({ unitId }));
    }

    toggleSubUnit(subUnitId: string): void {
        this.store.dispatch(QuestionBankActions.toggleSubUnit({ subUnitId }));
    }

    selectType(qType: QuestionTypes | null): void {
        this.store.dispatch(QuestionBankActions.selectType({ qType }));
    }

    selectDifficulty(difficulty: QuestionDifficulties | null): void {
        this.store.dispatch(
            QuestionBankActions.selectDifficulty({ difficulty })
        );
    }

    toggleLevel(level: string): void {
        this.store.dispatch(QuestionBankActions.toggleLevel({ level }));
    }

    resetFilters(): void {
        this.store.dispatch(QuestionBankActions.resetFilters());
    }

    clearScope(): void {
        this.store.dispatch(QuestionBankActions.clearScope());
    }

    search(value: string): void {
        this.store.dispatch(QuestionBankActions.search({ search: value }));
    }

    loadMatches(questionId: string): void {
        this.store.dispatch(QuestionBankActions.loadMatches({ questionId }));
    }

    openModal(question: AdminQuestion | null): void {
        this.editingQuestion = question;
        this.modalOpen = true;
        if (question) {
            this.loadMatches(question.id);
        }
    }

    closeModal(): void {
        this.modalOpen = false;
        this.editingQuestion = null;
    }

    saveQuestion(draft: QuestionDraft): void {
        this.store.dispatch(
            QuestionBankActions.saveQuestion({
                questionId: this.editingQuestion?.id ?? null,
                draft,
            })
        );
        this.closeModal();
    }

    removeQuestion(question: AdminQuestion): void {
        this.store.dispatch(
            QuestionBankActions.removeQuestion({ questionId: question.id })
        );
    }

    removeEditingQuestion(): void {
        const question = this.editingQuestion;
        if (question) {
            this.removeQuestion(question);
        }
        this.closeModal();
    }

    /** Level tags are authored in Subject Management, so send the user there. */
    manageLevels(subjectId: string): void {
        this.store.dispatch(
            SubjectManagementActions.selectSubject({ subjectId })
        );
        this.closeModal();
        this.router.navigate(['/', ADMIN_APP_ROUTES.SUBJECT_MANAGEMENT]);
    }

    importCsv(): void {
        // Bulk import lands with the questions API; the button is a placeholder.
    }
}
