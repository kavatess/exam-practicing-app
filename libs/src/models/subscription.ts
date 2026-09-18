import { BaseModel } from './base'; // updated
export enum SubscriptionProperties { // updated
    userId = 'userId', // updated
    planId = 'planId', // updated
    status = 'status', // updated
    startDate = 'startDate', // updated
    endDate = 'endDate', // updated
} // updated
export enum SubscriptionStatus { // updated
    Active = 'Active', // updated
    Expired = 'Expired', // updated
    Cancelled = 'Cancelled', // updated
} // updated
export interface Subscription extends BaseModel { // updated
    userId: string; // updated
    planId: string; // updated
    status: SubscriptionStatus; // updated
    startDate: Date; // updated
    endDate?: Date; // updated
} // updated
