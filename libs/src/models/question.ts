/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseModel } from './base';
import { Media } from './media';
import { MoldPage } from './mold';

export enum QuestionProperties {
    // subjectId = 'subjectId',
    // subject = 'subject',
    courseId = 'courseId',
    course = 'course',
    unitIds = 'unitIds',
    units = 'units',
    difficulty = 'difficulty',
    type = 'type',
    level = 'level',
    choices = 'choices',
    content = 'content',
    answer = 'answer',
    solution = 'solution',
    mediaIds = 'mediaIds',
    media = 'media',
    description = 'description',
    pageId = 'pageId',
    page = 'page',
}

export enum QuestionDifficulties {
    VeryEasy,
    Easy,
    Medium,
    Advanced,
    Hard,
}

export enum QuestionTypes {
    MultipleChoice = 'MultipleChoice',
    Matching = 'Matching',
    TrueFalse = 'TrueFalse',
    EssayAnswer = 'EssayAnswer',
}

export enum QuestionLevels {
    Theoretical = 'Theoretical',
    BasicApplication = 'BasicApplication',
    Interpretation = 'Interpretation',
    Analysis = 'Analysis',
    AdvancedSynthesis = 'AdvancedSynthesis',
    PracticalApplication = 'PracticalApplication',
}

export enum QuestionChoiceProperties {
    content = 'content',
    mediaId = 'mediaId',
    media = 'media',
    isCorrect = 'isCorrect',
}

export interface QuestionChoice extends BaseModel {
    [QuestionChoiceProperties.content]: string;
    [QuestionChoiceProperties.mediaId]?: string;
    [QuestionChoiceProperties.media]?: Media;
    [QuestionChoiceProperties.isCorrect]?: boolean;
}

export interface Question extends BaseModel {
    // [QuestionProperties.subjectId]: string;
    [QuestionProperties.courseId]: string;
    [QuestionProperties.unitIds]: string[];
    [QuestionProperties.difficulty]: QuestionDifficulties;
    [QuestionProperties.type]: QuestionTypes;
    [QuestionProperties.level]: QuestionLevels;
    [QuestionProperties.content]: string;
    [QuestionProperties.choices]?: QuestionChoice[];
    [QuestionProperties.answer]: any;
    [QuestionProperties.solution]: string;
    [QuestionProperties.mediaIds]: string[];
    [QuestionProperties.media]?: Media[];
    [QuestionProperties.description]: string;
    [QuestionProperties.pageId]?: string;
    [QuestionProperties.page]?: MoldPage;
}

export enum QuestionDataProperties {
    courseId = 'courseId',
    userId = 'userId',
    unitId = 'unitId',
    questionId = 'questionId',
    data = 'data',
    state = 'state',
    userAnswer = 'userAnswer',
    points = 'points',
}

export interface QuestionData extends BaseModel {
    [QuestionDataProperties.courseId]?: string;
    [QuestionDataProperties.unitId]?: string;
    [QuestionDataProperties.userId]?: string;
    [QuestionDataProperties.questionId]: string;
    [QuestionDataProperties.data]?: Partial<Question>;
    [QuestionDataProperties.state]: QuestionStates;
    [QuestionDataProperties.userAnswer]?: any;
    [QuestionDataProperties.points]?: number;
}

export enum QuestionStates {
    Correct = 'Correct',
    Incorrect = 'Incorrect',
    NotAnswered = 'NotAnswered',
    Answered = 'Answered',
    GradeAwating = 'GradeAwating',
}
