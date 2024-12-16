/* eslint-disable @typescript-eslint/no-explicit-any */
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const StreakActions = createActionGroup({
    source: 'Streak',
    events: {
        GetStreakDays: emptyProps(),
        GetStreakDaysSuccess: props<{ streakDays: number }>(),
        GetStreakDaysFailure: props<{ error: any }>(),
    },
});

export const EnergyActions = createActionGroup({
    source: 'Energy',
    events: {
        GetEnergyAmount: emptyProps(),
        GetEnergyAmountSuccess: props<{ value: number }>(),
        GetEnergyAmountFailure: props<{ error: any }>(),
    },
});

export const GemActions = createActionGroup({
    source: 'Gem',
    events: {
        GetGemAmount: emptyProps(),
        GetGemAmountSuccess: props<{ value: number }>(),
        GetGemAmountFailure: props<{ error: any }>(),
    },
});
