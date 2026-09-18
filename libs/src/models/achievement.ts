import { BaseModel } from './base';
import { Reward } from './reward'; // updated
import { Condition } from './condition'; // updated

export enum AchievementProperties {
    name = 'name',
    description = 'description',
    rewards = 'rewards',
    conditions = 'conditions',
    iconUrl = 'iconUrl',
}

export enum UserAchievementProperties {
    userId = 'userId',
    achievementId = 'achievementId',
    currentLevel = 'currentLevel',
    maxLevel = 'maxLevel',
    currentProgress = 'currentProgress',
    targetProgress = 'targetProgress',
    isCompleted = 'isCompleted',
}

export interface Achievement extends BaseModel {
    [AchievementProperties.name]: string;
    [AchievementProperties.description]: string;
    [AchievementProperties.rewards]: Reward[];
    [AchievementProperties.conditions]: Condition[]; // updated
    [AchievementProperties.iconUrl]: string;
}

export interface UserAchievement extends Achievement {
    [UserAchievementProperties.userId]?: string;
    [UserAchievementProperties.achievementId]?: string;
    [UserAchievementProperties.currentLevel]: number;
    [UserAchievementProperties.maxLevel]: number;
    [UserAchievementProperties.currentProgress]: number;
    [UserAchievementProperties.targetProgress]: number;
    [UserAchievementProperties.isCompleted]: boolean;
}
