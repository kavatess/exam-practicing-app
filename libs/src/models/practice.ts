import { BaseModel } from './base';
import { QuestionData } from './question';
import { Course, SubjectUnit, SubUnit } from './subject';

export enum PracticeQuestionProperties {
    userId = 'userId',
    practiceId = 'practiceId',
    courseId = 'courseId',
    unitId = 'unitId',
    questionId = 'questionId',
    question = 'question',
    userAnswer = 'userAnswer',
    state = 'state',
    points = 'points',
}

export interface PracticeQuestion extends QuestionData {
    [PracticeQuestionProperties.practiceId]: string;
}

export enum PracticeExamProperties {
    courseId = 'courseId',
    course = 'course',
    unitId = 'unitId',
    unit = 'unit',
    userId = 'userId',
    user = 'user',
    subUnitId = 'subUnitId',
    subUnit = 'subUnit',
    title = 'title',
    description = 'description',
    // questionIds = 'questionIds',
    questions = 'questions',
    status = 'status',
    maxPoints = 'maxPoints',
    score = 'score',
}

export interface PracticeExam extends BaseModel {
    [PracticeExamProperties.courseId]: string;
    [PracticeExamProperties.course]?: Course;
    [PracticeExamProperties.unitId]: string;
    [PracticeExamProperties.unit]?: SubjectUnit;
    [PracticeExamProperties.subUnitId]: string;
    [PracticeExamProperties.subUnit]?: SubUnit;
    [PracticeExamProperties.userId]: string;
    [PracticeExamProperties.title]: string;
    // [PracticeExamProperties.description]: string;
    // [PracticeExamProperties.questionIds]: string[];
    [PracticeExamProperties.questions]: PracticeQuestion[];
    [PracticeExamProperties.status]: PracticeExamStatuses;
}

export enum PracticeExamStatuses {
    Created = 'Created',
    InProgress = 'InProgress',
    Completed = 'Completed',
}

export enum PracticeMoldProperties {
    courseId = 'courseId',
    course = 'course',
    unitId = 'unitId',
    unit = 'unit',
    title = 'title',
    structure = 'structure',
}

export interface PracticeMold extends BaseModel {
    [PracticeMoldProperties.courseId]: string;
    [PracticeMoldProperties.course]?: Course;
    [PracticeMoldProperties.unitId]: string;
    [PracticeMoldProperties.unit]?: string;
    [PracticeMoldProperties.title]: string;
    [PracticeMoldProperties.structure]: string;
}

export interface PracticeResult {
    evalTxt: string;
    rewards: { gems?: number; energies?: number };
}
