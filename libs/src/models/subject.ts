import { BaseModel } from './base';
import { QuestionTypes } from './question';

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
    difficulties = 'difficulties',
    questionTypes = 'questionTypes',
    evaluations = 'evaluations',
    avgScore = 'avgScore',
}

export interface Statistics {
    [StatProperties.todayTestsCompleted]?: number;
    [StatProperties.currStudierCount]?: number;
    [StatProperties.completedQuestions]?: number;
    [StatProperties.totalQuestions]?: number;
    [StatProperties.correctAnswers]?: number;
    [StatProperties.incorrectAnswers]?: number;
    [StatProperties.difficulties]?: AttributeStats[];
    [StatProperties.questionTypes]?: {
        [key in QuestionTypes]: AttributeStats;
    };
    [StatProperties.avgScore]?: number;
    [StatProperties.evaluations]?: {
        strengths: string;
        weaknesses: string;
        threats: string;
        opportunities: string;
    };
}

export interface SubjectUnit extends BaseModel {
    [SubjectUnitProperties.subjectId]: string;
    [SubjectUnitProperties.subject]?: Subject;
    [SubjectUnitProperties.subUnits]?: SubUnit[];
    [SubjectUnitProperties.title]: string;
    [SubjectUnitProperties.description]: string;
    [SubjectUnitProperties.iconUrl]: string;
    [SubjectUnitProperties.stats]?: Statistics;
}

export enum SubUnitProperties {
    unitId = 'unitId',
    title = 'title',
    description = 'description',
    iconUrl = 'iconUrl',
    stats = 'stats',
}

export interface AttributeStats {
    total?: number;
    correct?: number;
    incorrect?: number;
    difficulties?: AttributeStats[];
    questionTypes?: {
        [key in QuestionTypes]: AttributeStats;
    };
}

export interface SubUnit extends BaseModel {
    [SubUnitProperties.unitId]: string;
    [SubUnitProperties.title]: string;
    [SubUnitProperties.description]: string;
    [SubUnitProperties.iconUrl]: string;
    [SubUnitProperties.stats]?: Statistics;
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
    [CourseProperties.stats]?: Statistics;
}
