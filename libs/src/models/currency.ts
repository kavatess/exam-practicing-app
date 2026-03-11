import { BaseModel } from './base';

export enum CurrencyProperties {
    title = 'title',
    description = 'description',
    value = 'value',
    iconUrl = 'iconUrl',
}

export interface Currency extends BaseModel {
    [CurrencyProperties.title]: string;
    [CurrencyProperties.description]: string;
    [CurrencyProperties.value]: number;
    [CurrencyProperties.iconUrl]: string;
}
