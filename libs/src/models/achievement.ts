import { BaseModel } from './base';
import { Currency } from './currency';

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

export enum RewardProperties {
    type = 'type',
    currencyId = 'currencyId',
    currency = 'currency',
    amount = 'amount',
}

export enum RewardTypes {
    Currency = 'Currency',
}

export interface Reward {
    [RewardProperties.type]: string;
    [RewardProperties.currencyId]: string;
    [RewardProperties.currency]?: Currency;
    [RewardProperties.amount]: number;
}

export interface Achievement extends BaseModel {
    [AchievementProperties.name]: string;
    [AchievementProperties.description]: string;
    [AchievementProperties.rewards]: Reward[];
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
