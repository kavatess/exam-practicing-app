import { BaseModel } from './base'; // updated
import { Reward } from './reward'; // updated

export enum QuestProperties {
    id = 'id', // updated
    type = 'type',
    name = 'name',
    description = 'description',
    totalProgress = 'totalProgress',
    progress = 'progress',
    iconUrl = 'iconUrl',
    rewards = 'rewards', // updated
}

export enum QuestTypes {
    TestsCompleted = 'TestsCompleted',
    QuestionsCompleted = 'QuestionsCompleted',
    EnergiesEarned = 'EnergiesEarned',
}

export interface Quest extends BaseModel { // updated
    [QuestProperties.type]: QuestTypes;
    [QuestProperties.name]: string;
    [QuestProperties.description]?: string;
    [QuestProperties.iconUrl]: string;
    [QuestProperties.totalProgress]: number;
    [QuestProperties.progress]: number;
    [QuestProperties.rewards]?: Reward[]; // updated
}

export enum UserQuestProperties { // updated
    userId = 'userId', // updated
    questId = 'questId', // updated
    progress = 'progress', // updated
    isCompleted = 'isCompleted', // updated
    completedAt = 'completedAt', // updated
} // updated

export interface UserQuest extends BaseModel { // updated
    userId: string; // updated
    questId: string; // updated
    quest?: Quest; // updated
    progress: number; // updated
    isCompleted: boolean; // updated
    completedAt?: Date; // updated
} // updated
