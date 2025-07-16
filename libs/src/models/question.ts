/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseModel } from './base';
import { Media } from './media';

export enum QuestionProperties {
    subjectId = 'subjectId',
    subject = 'subject',
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
}

export enum QuestionDifficulties {
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
}

export interface QuestionChoice extends BaseModel {
    [QuestionChoiceProperties.content]: string;
    [QuestionChoiceProperties.mediaId]?: string;
    [QuestionChoiceProperties.media]?: Media;
}

export interface Question extends BaseModel {
    [QuestionProperties.subjectId]: string;
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
}

export enum QuestionStates {
    Correct = 'Correct',
    Incorrect = 'Incorrect',
    NotAnswered = 'NotAnswered',
    GradeAwating = 'GradeAwating',
}
