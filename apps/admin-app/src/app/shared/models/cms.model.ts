import {
    Course,
    MoldBlock,
    MoldPage,
    QuestionDifficulties,
    QuestionTypes,
    Subject,
    SubjectUnit,
    SubUnit,
    TestMold,
} from '@libs/models';

export enum ExamTypes {
    National = 'National',
    University = 'University',
    Custom = 'Custom',
}

export type CmsOverlay =
    | 'subject'
    | 'unit'
    | 'exam'
    | 'section'
    | 'scope'
    | 'mold'
    | null;

export interface AdminSubUnit extends SubUnit {
    id: string;
    questionCount: number;
}

export interface AdminUnit extends SubjectUnit {
    id: string;
    subUnits: AdminSubUnit[];
    questionCount: number;
}

export interface AdminSubject extends Subject {
    id: string;
    units: AdminUnit[];
    /**
     * Question level tags, defined per subject and never merged across them:
     * Toán grades "Theoretical → Practical application" while Ngữ văn grades
     * "Nhận biết → Vận dụng cao". Managed from Subject Management.
     */
    levels: string[];
    /** Chip colour marking which subject a level belongs to in mixed lists. */
    color: string;
}

export interface AdminMoldBlock extends MoldBlock {
    id: string;
    sectionId: string;
    courseUnitId: string;
    subUnitIds: string[];
    difficulty: QuestionDifficulties;
    questionCount: number;
}

export interface AdminMoldPage extends MoldPage {
    id: string;
    blocks: AdminMoldBlock[];
}

export interface AdminMold extends TestMold {
    id: string;
    pages: AdminMoldPage[];
}

export interface ExamSection {
    id: string;
    examId: string;
    subjectId: string;
    label: string;
    unitIds: string[];
}

export interface AdminExam extends Omit<Course, 'subjectId' | 'unitIds'> {
    id: string;
    year: number;
    examType: ExamTypes;
    org: string;
    sections: ExamSection[];
    molds: AdminMold[];
}

export interface AdminQuestionChoice {
    id: string;
    key: string;
    text: string;
    correct: boolean;
}

export interface AdminQuestionPair {
    id: string;
    left: string;
    right: string;
}

export interface AdminQuestion {
    id: string;
    subjectId: string;
    /** Units this question is tagged with — the axis a mold block filters on. */
    unitIds: string[];
    subUnitIds: string[];
    qType: QuestionTypes;
    difficulty: QuestionDifficulties;
    /** One of the owning subject's `levels`. */
    level: string;
    content: string;
    solution: string;
    choices: AdminQuestionChoice[];
    pairs: AdminQuestionPair[];
    trueFalseAnswer: boolean;
    modelAnswer: string;
    maxPoints: number;
    updatedAt?: string;
}

/** A mold block whose criteria a question currently satisfies. */
export interface QuestionMatch {
    examId: string;
    examName: string;
    moldName: string;
    blockLabel: string;
}

/** Criteria a question bank view filters on — the same axes a mold block uses. */
export interface QuestionFilter {
    subjectId: string | null;
    unitIds: string[];
    subUnitIds: string[];
    qType: QuestionTypes | null;
    difficulty: QuestionDifficulties | null;
    level: string | null;
    search: string;
}

/** Where a block deep-link lands: the criteria plus what asked for them. */
export interface QuestionScope {
    blockLabel: string;
    pageName: string;
    moldName: string;
    filter: QuestionFilter;
}

export interface ExamYearGroup {
    year: number;
    exams: AdminExam[];
}

export const QUESTION_TYPE_LABELS: Record<QuestionTypes, string> = {
    [QuestionTypes.MultipleChoice]: 'Multiple choice',
    [QuestionTypes.TrueFalse]: 'True / false',
    [QuestionTypes.Matching]: 'Matching',
    [QuestionTypes.EssayAnswer]: 'Essay',
    [QuestionTypes.ShortAnswer]: 'Short answer',
};

/** Compact form used in the question bank's type column. */
export const QUESTION_TYPE_SHORT_LABELS: Record<QuestionTypes, string> = {
    [QuestionTypes.MultipleChoice]: 'MC',
    [QuestionTypes.TrueFalse]: 'T/F',
    [QuestionTypes.Matching]: 'Match',
    [QuestionTypes.EssayAnswer]: 'Essay',
    [QuestionTypes.ShortAnswer]: 'Short',
};

export const DIFFICULTY_LABELS: Record<QuestionDifficulties, string> = {
    [QuestionDifficulties.Easy]: 'Easy',
    [QuestionDifficulties.Medium]: 'Medium',
    [QuestionDifficulties.Advanced]: 'Advanced',
    [QuestionDifficulties.Hard]: 'Hard',
};

export const QUESTION_TYPE_OPTIONS = Object.values(QuestionTypes);

export const DIFFICULTY_OPTIONS = [
    QuestionDifficulties.Easy,
    QuestionDifficulties.Medium,
    QuestionDifficulties.Advanced,
    QuestionDifficulties.Hard,
];

export const EXAM_TYPE_OPTIONS = Object.values(ExamTypes);

export function countMoldQuestions(mold: AdminMold): number {
    return mold.pages.reduce(
        (total, page) =>
            total +
            page.blocks.reduce((sum, block) => sum + block.questionCount, 0),
        0
    );
}

export function countMoldBlocks(mold: AdminMold): number {
    return mold.pages.reduce((total, page) => total + page.blocks.length, 0);
}

export function findSubject(
    subjects: AdminSubject[],
    subjectId: string
): AdminSubject | undefined {
    return subjects.find((subject) => subject.id === subjectId);
}

/** The units a section draws from, in the subject's own order. */
export function unitsInScope(
    subjects: AdminSubject[],
    section: ExamSection
): AdminUnit[] {
    const subject = findSubject(subjects, section.subjectId);
    return (
        subject?.units.filter((unit) => section.unitIds.includes(unit.id)) ?? []
    );
}

export function countSubUnits(subject: AdminSubject): number {
    return subject.units.reduce(
        (total, unit) => total + unit.subUnits.length,
        0
    );
}

const MONTH_LABELS = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
];

/** Mono meta stamp used across the CMS, e.g. `12 SEP 2026`. */
export function formatUpdatedStamp(iso?: string): string {
    const date = iso ? new Date(iso) : new Date();
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${day} ${MONTH_LABELS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

export type PoolTier = 'ok' | 'thin' | 'low';

export interface PoolHealth {
    tier: PoolTier;
    note: string;
}

/** Block size assumed when no block deep-link says what is being filled. */
export const TYPICAL_BLOCK_SIZE = 15;

/**
 * Whether a matching pool is big enough to generate from. A block draws its
 * questions at random from everything matching, so a pool barely larger than
 * the block repeats questions from one sitting to the next.
 */
export function gradePool(matchCount: number, blockNeeds: number): PoolHealth {
    if (matchCount >= blockNeeds * 3) {
        return {
            tier: 'ok',
            note: `Healthy pool — about ${Math.floor(
                matchCount / blockNeeds
            )}× a block of ${blockNeeds} questions.`,
        };
    }
    if (matchCount >= blockNeeds) {
        return {
            tier: 'thin',
            note: `Covers a block of ${blockNeeds} with little margin — each generation draws from nearly the whole pool, so questions repeat.`,
        };
    }
    return {
        tier: 'low',
        note: `Only ${matchCount} questions match — blocks requesting more than ${matchCount} may repeat questions or fail to generate.`,
    };
}

export const EMPTY_QUESTION_FILTER: QuestionFilter = {
    subjectId: null,
    unitIds: [],
    subUnitIds: [],
    qType: null,
    difficulty: null,
    level: null,
    search: '',
};
