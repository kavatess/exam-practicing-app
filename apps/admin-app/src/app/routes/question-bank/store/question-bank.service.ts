import { Injectable } from '@angular/core';
import { QuestionDifficulties, QuestionTypes } from '@libs/models';
import { Observable, of, throwError } from 'rxjs';
import {
    AdminQuestion,
    AdminSubject,
    QuestionFilter,
    QuestionMatch,
} from '../../../shared/models/cms.model';
import {
    SEEDED_BANK_TOTAL,
    seedMatchCounts,
    seedMatches,
    seedQuestions,
} from './question-bank.seed';

/** Request payload for creating or editing a question. */
export interface QuestionDraft {
    subjectId: string;
    unitIds: string[];
    subUnitIds: string[];
    qType: QuestionTypes;
    difficulty: QuestionDifficulties;
    level: string;
    content: string;
    solution: string;
    choices: AdminQuestion['choices'];
    pairs: AdminQuestion['pairs'];
    trueFalseAnswer: boolean;
    modelAnswer: string;
    maxPoints: number;
}

export interface QuestionQueryResult {
    rows: AdminQuestion[];
    /** How many questions in the whole bank match — not just the rows returned. */
    matchCount: number;
    bankTotal: number;
}

/**
 * The question bank's data boundary.
 *
 * `subjects` is passed into the read because the count below is a stand-in for
 * a server-side COUNT over the taxonomy; once the API lands the server owns
 * that taxonomy and the parameter goes away with the rest of this file's
 * in-memory work.
 */
@Injectable({ providedIn: 'root' })
export class QuestionBankService {
    private questions: AdminQuestion[] = seedQuestions();
    private matchCounts: Record<string, number> = seedMatchCounts();
    private sequence = 0;

    queryQuestions(
        filter: QuestionFilter,
        subjects: AdminSubject[]
    ): Observable<QuestionQueryResult> {
        const rows = this.questions.filter((question) =>
            matchesFilter(question, filter, subjects)
        );
        return of({
            rows: structuredClone(rows),
            matchCount: estimateMatchCount(filter, subjects),
            bankTotal: SEEDED_BANK_TOTAL,
        });
    }

    /** The mold blocks whose criteria a question currently satisfies. */
    getMatches(questionId: string): Observable<QuestionMatch[]> {
        return of(seedMatches(this.matchCounts[questionId] ?? 0));
    }

    matchCountFor(questionId: string): number {
        return this.matchCounts[questionId] ?? 0;
    }

    /** Creates a question when `questionId` is null, otherwise edits it. */
    saveQuestion(
        questionId: string | null,
        draft: QuestionDraft
    ): Observable<AdminQuestion> {
        if (!questionId) {
            const question: AdminQuestion = {
                ...draft,
                id: this.nextId(),
                unitIds: [...draft.unitIds],
                subUnitIds: [...draft.subUnitIds],
                choices: structuredClone(draft.choices),
                pairs: structuredClone(draft.pairs),
                updatedAt: new Date().toISOString(),
            };
            this.questions.push(question);
            this.matchCounts[question.id] = 0;
            return of(structuredClone(question));
        }

        const question = this.questions.find(
            (item) => item.id === questionId
        );
        if (!question) {
            return throwError(
                () => new Error(`Question ${questionId} not found`)
            );
        }
        Object.assign(question, {
            ...draft,
            unitIds: [...draft.unitIds],
            subUnitIds: [...draft.subUnitIds],
            choices: structuredClone(draft.choices),
            pairs: structuredClone(draft.pairs),
            updatedAt: new Date().toISOString(),
        });
        return of(structuredClone(question));
    }

    removeQuestion(questionId: string): Observable<string> {
        const index = this.questions.findIndex(
            (question) => question.id === questionId
        );
        if (index < 0) {
            return throwError(
                () => new Error(`Question ${questionId} not found`)
            );
        }
        this.questions.splice(index, 1);
        delete this.matchCounts[questionId];
        return of(questionId);
    }

    private nextId(): string {
        this.sequence += 1;
        return `q_${String(9000 + this.sequence)}`;
    }
}

function matchesFilter(
    question: AdminQuestion,
    filter: QuestionFilter,
    subjects: AdminSubject[]
): boolean {
    if (filter.subjectId && question.subjectId !== filter.subjectId) {
        return false;
    }
    if (
        filter.unitIds.length &&
        !question.unitIds.some((id) => filter.unitIds.includes(id))
    ) {
        return false;
    }
    if (
        filter.subUnitIds.length &&
        !question.subUnitIds.some((id) => filter.subUnitIds.includes(id))
    ) {
        return false;
    }
    if (filter.qType !== null && question.qType !== filter.qType) {
        return false;
    }
    if (
        filter.difficulty !== null &&
        question.difficulty !== filter.difficulty
    ) {
        return false;
    }
    if (filter.level && question.level !== filter.level) {
        return false;
    }
    return matchesSearch(question, filter.search, subjects);
}

function matchesSearch(
    question: AdminQuestion,
    search: string,
    subjects: AdminSubject[]
): boolean {
    const term = search.trim().toLowerCase();
    if (!term) {
        return true;
    }
    const haystack = [
        question.id,
        question.content,
        question.level,
        ...unitTitles(question, subjects),
    ]
        .join(' ')
        .toLowerCase();
    return haystack.includes(term);
}

function unitTitles(
    question: AdminQuestion,
    subjects: AdminSubject[]
): string[] {
    const subject = subjects.find((item) => item.id === question.subjectId);
    if (!subject) {
        return [];
    }
    return subject.units
        .filter((unit) => question.unitIds.includes(unit.id))
        .flatMap((unit) => [
            unit.title,
            ...unit.subUnits
                .filter((sub) => question.subUnitIds.includes(sub.id))
                .map((sub) => sub.title),
        ]);
}

// Share of the bank each axis keeps — the mock's stand-in for a COUNT query.
const TYPE_SHARE: Record<QuestionTypes, number> = {
    [QuestionTypes.MultipleChoice]: 0.54,
    [QuestionTypes.Matching]: 0.15,
    [QuestionTypes.TrueFalse]: 0.12,
    [QuestionTypes.ShortAnswer]: 0.1,
    [QuestionTypes.EssayAnswer]: 0.09,
};

const DIFFICULTY_SHARE: Record<QuestionDifficulties, number> = {
    [QuestionDifficulties.Easy]: 0.34,
    [QuestionDifficulties.Medium]: 0.41,
    [QuestionDifficulties.Advanced]: 0.13,
    [QuestionDifficulties.Hard]: 0.12,
};

const LEVEL_SHARE = 0.3;

/**
 * How many questions in the bank match these criteria. The rows above are a
 * demo sample, so the counter is derived from the taxonomy's own question
 * totals rather than counted off them.
 */
function estimateMatchCount(
    filter: QuestionFilter,
    subjects: AdminSubject[]
): number {
    const scoped = filter.subjectId
        ? subjects.filter((subject) => subject.id === filter.subjectId)
        : subjects;

    const units = scoped.flatMap((subject) => subject.units);
    const selected = filter.unitIds.length
        ? units.filter((unit) => filter.unitIds.includes(unit.id))
        : units;
    const unitTotal = selected.reduce(
        (total, unit) => total + unit.questionCount,
        0
    );

    const subUnitPool = selected.flatMap((unit) => unit.subUnits);
    const taggedSubUnits = subUnitPool.filter((sub) =>
        filter.subUnitIds.includes(sub.id)
    );
    const subShare =
        taggedSubUnits.length && subUnitPool.length
            ? taggedSubUnits.length / subUnitPool.length
            : 1;

    const typeShare =
        filter.qType === null ? 1 : TYPE_SHARE[filter.qType] ?? 1;
    const difficultyShare =
        filter.difficulty === null
            ? 1
            : DIFFICULTY_SHARE[filter.difficulty] ?? 1;
    const levelShare = filter.level ? LEVEL_SHARE : 1;

    return Math.max(
        0,
        Math.round(
            unitTotal * subShare * typeShare * difficultyShare * levelShare
        )
    );
}
