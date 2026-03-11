import { Currency } from './currency';
import { BaseModel } from './base';

export enum ShopSectionProperties {
    title = 'title',
    description = 'description',
    items = 'items',
}

export enum ShopItemProperties {
    title = 'title',
    description = 'description',
    iconUrl = 'iconUrl',
    price = 'price',
    currencyId = 'currencyId',
    currency = 'currency',
    offer = 'offer',
}

export interface ShopItem extends BaseModel {
    [ShopItemProperties.title]: string;
    [ShopItemProperties.description]: string;
    [ShopItemProperties.iconUrl]: string;
    [ShopItemProperties.price]: number;
    [ShopItemProperties.currencyId]: string;
    [ShopItemProperties.currency]?: Partial<Currency>;
    [ShopItemProperties.offer]?: string;
}

export interface ShopSection extends BaseModel {
    [ShopSectionProperties.title]: string;
    [ShopSectionProperties.description]?: string;
    [ShopSectionProperties.items]?: ShopItem[];
}
