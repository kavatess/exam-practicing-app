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
    choices = 'choices',
    content = 'content',
    answer = 'answer',
    solution = 'solution',
    mediaIds = 'mediaIds',
    description = 'description',
}

export enum QuestionDifficulties {
    Easy = 'Easy',
    Medium = 'Medium',
    Hard = 'Hard',
    Advanced = 'Advanced',
}

export enum QuestionTypes {
    MultipleChoice = 'MultipleChoice',
    Matching = 'Matching',
    TrueFalse = 'TrueFalse',
    EssayAnswer = 'EssayAnswer',
}

export enum QuestionChoiceProperties {
    content = 'content',
    mediaId = 'mediaId',
    media = 'media',
}

export interface QuestionChoice {
    [QuestionChoiceProperties.content]: string;
    [QuestionChoiceProperties.mediaId]: string;
    [QuestionChoiceProperties.media]?: Media;
}

export interface Question extends BaseModel {
    [QuestionProperties.subjectId]: string;
    [QuestionProperties.courseId]: string;
    [QuestionProperties.unitIds]: string[];
    [QuestionProperties.difficulty]: string;
    [QuestionProperties.type]: QuestionTypes;
    [QuestionProperties.content]: string;
    [QuestionProperties.choices]?: QuestionChoice[];
    [QuestionProperties.answer]: any;
    [QuestionProperties.solution]: string;
    [QuestionProperties.mediaIds]: string[];
    [QuestionProperties.description]: string;
}
