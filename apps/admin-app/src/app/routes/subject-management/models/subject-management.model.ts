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

export enum CourseTypes {
    National = 'National',
    University = 'University',
    Custom = 'Custom',
}

export type SubjectDetailTab = 'units' | 'courses';

export type SubjectOverlay =
    | 'subject'
    | 'unit'
    | 'course'
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

export interface AdminMoldBlock extends MoldBlock {
    id: string;
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

export interface AdminCourse extends Course {
    id: string;
    year: number;
    courseType: CourseTypes;
    molds: AdminMold[];
}

export interface AdminSubject extends Subject {
    id: string;
    units: AdminUnit[];
    courses: AdminCourse[];
}

export interface CourseYearGroup {
    year: number;
    courses: AdminCourse[];
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

export const COURSE_TYPE_OPTIONS = Object.values(CourseTypes);

export function countCourseQuestions(mold: AdminMold): number {
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
