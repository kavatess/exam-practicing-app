import { BaseModel } from './base';
import { Currency } from './currency';

export enum AchievementProperties {
    name = 'name',
    description = 'description',
    rewards = 'rewards',
    conditions = 'conditions',
    imgUrl = 'imgUrl',
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
    [AchievementProperties.imgUrl]: string;
}
