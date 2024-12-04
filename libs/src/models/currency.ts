import { BaseModel } from './base';

export enum CurrencyProperties {
    name = 'name',
    description = 'description',
    value = 'value',
    iconUrl = 'iconUrl',
}

export interface Currency extends BaseModel {
    [CurrencyProperties.name]: string;
    [CurrencyProperties.description]: string;
    [CurrencyProperties.value]: number;
    [CurrencyProperties.iconUrl]: string;
}
