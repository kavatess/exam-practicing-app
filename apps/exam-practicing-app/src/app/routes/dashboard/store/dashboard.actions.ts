/* eslint-disable @typescript-eslint/no-explicit-any */
import { Course, Quest } from '@libs/models';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

// Dropdown Item Actions
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

// Quest Actions
export const QuestActions = createActionGroup({
    source: 'Quest',
    events: {
        GetQuests: emptyProps(),
        GetQuestsSuccess: props<{ list: Quest[] }>(),
        GetQuestsFailure: props<{ error: any }>(),
    },
});

// Course Actions
export const CourseActions = createActionGroup({
    source: 'Course',
    events: {
        GetCourse: emptyProps(),
        GetCourseSuccess: props<{ data: Course }>(),
        GetCourseFailure: props<{ error: any }>(),
    },
});
