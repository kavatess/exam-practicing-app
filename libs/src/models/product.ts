import { BaseModel } from './base';
import { Currency } from './currency';
import { Media } from './media';

export enum ProductPriceProperties {
    type = 'type',
    currencyId = 'currencyId',
    currency = 'currency',
    subscriptionId = 'subscriptionId',
    amount = 'amount',
}

export enum PriceTypes {
    Currency = 'Currency',
    OneTime = 'OneTime',
    Subscription = 'Subscription',
}

export interface ProductPrice {
    [ProductPriceProperties.type]: string;
    [ProductPriceProperties.currencyId]?: string;
    [ProductPriceProperties.currency]?: Currency;
    [ProductPriceProperties.amount]: number;
}

export enum ProductProperties {
    name = 'name',
    description = 'description',
    type = 'type',
    prices = 'prices',
    quantity = 'quantity',
    remainingQuantity = 'remainingQuantity',
    imgUrls = 'imgUrls',
    imgs = 'imgs',
}

export enum ProductTypes {
    VirtualItem = 'VirtualItem',
    Feature = 'Feature',
    PhysicalItem = 'PhysicalItem',
}

export enum ProductStatus {
    Available = 'Available',
    OutOfStock = 'OutOfStock',
    Inavailable = 'Inavailable',
}

export interface Product extends BaseModel {
    [ProductProperties.name]: string;
    [ProductProperties.description]: string;
    [ProductProperties.type]: string;
    [ProductProperties.prices]: ProductPrice[];
    [ProductProperties.quantity]?: number;
    [ProductProperties.remainingQuantity]?: number;
    [ProductProperties.imgUrls]: string[];
    [ProductProperties.imgs]?: Media[];
}
