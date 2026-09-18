import { BaseModel } from './base'; // updated

export enum ConditionProperties {
    type = 'type',
    missionId = 'missionId',
    stackNumber = 'stackNumber',
    value = 'value',
}

export interface Condition extends BaseModel { // updated
    [ConditionProperties.type]: string; // updated
    [ConditionProperties.value]: number; // updated
    [ConditionProperties.stackNumber]?: number; // updated
    [ConditionProperties.missionId]?: string; // updated
} // updated
