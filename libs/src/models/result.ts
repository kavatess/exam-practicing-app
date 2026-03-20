import { BaseModel } from './base';
import { PracticeExam } from './practice';
import { Test } from './test';

export enum ResultProperties {
    testId = 'testId',
    test = 'test',
    practiceId = 'practiceId',
    practice = 'practice',
    type = 'type',
    maxScore = 'maxScore',
    score = 'score',
    // status = 'status',
    correct = 'correct',
    incorrect = 'incorrect',
    timeUsed = 'timeUsed',
    completedAt = 'completedAt',
}

export enum ResultTypes {
    Test = 'Test',
    Practice = 'Practice',
}

export interface Result extends BaseModel {
    [ResultProperties.testId]?: string;
    [ResultProperties.test]?: Test;
    [ResultProperties.practiceId]?: string;
    [ResultProperties.practice]?: PracticeExam;
    [ResultProperties.type]: ResultTypes;
    [ResultProperties.maxScore]?: number;
    [ResultProperties.score]?: number;
    [ResultProperties.correct]?: number;
    [ResultProperties.incorrect]?: number;
    [ResultProperties.timeUsed]?: number;
    [ResultProperties.completedAt]?: Date;
}
