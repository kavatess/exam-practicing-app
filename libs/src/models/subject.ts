import { BaseModel } from './base';

export enum SubjectProperties {
    name = 'name',
    description = 'description',
}

export interface Subject extends BaseModel {
    [SubjectProperties.name]: string;
    [SubjectProperties.description]: string;
}

export enum SubjectUnitProperties {
    subjectId = 'subjectId',
    subject = 'subject',
    subUnits = 'subUnits',
    title = 'title',
    description = 'description',
    iconUrl = 'iconUrl',
    stats = 'stats',
}

export enum StatProperties {
    todayTestsCompleted = 'todayTestsCompleted',
    currStudierCount = 'currStudierCount',
    completedQuestions = 'completedQuestions',
    totalQuestions = 'totalQuestions',
    correctAnswers = 'correctAnswers',
    incorrectAnswers = 'incorrectAnswers',
    diffStats = 'diffStats',
    avgScore = 'avgScore',
}

export interface SubjectUnit extends BaseModel {
    [SubjectUnitProperties.subjectId]: string;
    [SubjectUnitProperties.subject]?: Subject;
    [SubjectUnitProperties.subUnits]?: SubUnit[];
    [SubjectUnitProperties.title]: string;
    [SubjectUnitProperties.description]: string;
    [SubjectUnitProperties.iconUrl]: string;
    [SubjectUnitProperties.stats]?: {
        [StatProperties.avgScore]: number;
    };
}

export enum SubUnitProperties {
    unitId = 'unitId',
    title = 'title',
    description = 'description',
    iconUrl = 'iconUrl',
    stats = 'stats',
}

export interface SubUnit extends BaseModel {
    [SubUnitProperties.unitId]: string;
    [SubUnitProperties.title]: string;
    [SubUnitProperties.description]: string;
    [SubUnitProperties.iconUrl]: string;
    [SubUnitProperties.stats]?: {
        [StatProperties.completedQuestions]: number;
        [StatProperties.totalQuestions]: number;
        [StatProperties.correctAnswers]: number;
        [StatProperties.incorrectAnswers]: number;
        [StatProperties.diffStats]: number;
        [StatProperties.avgScore]: number;
    };
}

export enum CourseProperties {
    subjectId = 'subjectId',
    subject = 'subject',
    name = 'name',
    unitIds = 'unitIds',
    units = 'units',
    description = 'description',
    iconUrl = 'iconUrl',
    stats = 'stats',
}

export interface Course extends BaseModel {
    [CourseProperties.subjectId]: string;
    [CourseProperties.subject]?: Subject;
    [CourseProperties.name]: string;
    [CourseProperties.unitIds]: string[];
    [CourseProperties.units]?: SubjectUnit[];
    [CourseProperties.description]: string;
    [CourseProperties.iconUrl]: string;
    [CourseProperties.stats]?: {
        [StatProperties.todayTestsCompleted]: number;
        [StatProperties.currStudierCount]: number;
        [StatProperties.totalQuestions]: number;
        [StatProperties.completedQuestions]: number;
        [StatProperties.avgScore]: number;
    };
}
