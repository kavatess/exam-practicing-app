import { Achievement } from './achievement';
import { Currency } from './currency';

export enum RewardProperties {
    type = 'type',
    missionId = 'missionId',
    achievement = 'achievement',
    quest = 'quest',
    currencyId = 'currencyId',
    currency = 'currency',
    amount = 'amount',
}

export enum RewardTypes {
    Currency = 'Currency',
}

export interface Reward {
    [RewardProperties.type]: RewardTypes;
    [RewardProperties.missionId]: string;
    [RewardProperties.achievement]?: Achievement;
    [RewardProperties.quest]?: string;
    [RewardProperties.currencyId]: string;
    [RewardProperties.currency]?: Currency;
    [RewardProperties.amount]: number;
}
