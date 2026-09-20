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

export interface ExamYearGroup {
    year: number;
    exams: AdminExam[];
}

export const QUESTION_TYPE_LABELS: Record<QuestionTypes, string> = {
    [QuestionTypes.MultipleChoice]: 'Multiple choice',
    [QuestionTypes.TrueFalse]: 'True / false',
    [QuestionTypes.Matching]: 'Matching',
    [QuestionTypes.EssayAnswer]: 'Essay',
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
