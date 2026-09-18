import { BaseModel } from './base'; // updated
import { Currency } from './currency';

export enum RewardProperties {
    type = 'type',
    currencyId = 'currencyId',
    currency = 'currency',
    amount = 'amount',
}

export enum RewardTypes {
    Currency = 'Currency',
}

export interface Reward extends BaseModel { // updated
    [RewardProperties.type]: RewardTypes;
    [RewardProperties.currencyId]: string;
    [RewardProperties.currency]?: Currency;
    [RewardProperties.amount]: number;
}
