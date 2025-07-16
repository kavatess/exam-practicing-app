/* eslint-disable @typescript-eslint/no-explicit-any */
import { PracticeExam, PracticeResult } from '@libs/models';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const PracticeActions = createActionGroup({
    source: 'Practice',
    events: {
        initPractice: emptyProps(),
        GetPracticeExam: props<{ practiceId: string }>(),
        GetPracticeExamSuccess: props<{ data: PracticeExam }>(),
        GetPracticeExamFailure: props<{ error: any }>(),
        continue: emptyProps(),
        nextQuestion: emptyProps(),
        skipQuestion: emptyProps(),
        checkAnswer: props<{ answer: string }>(),
        checkAnswerSuccess: props<{ isCorrect: boolean }>(),
        checkAnswerFailure: props<{ error: any }>(),
        complete: emptyProps(),
        completeSuccess: props<{ result: PracticeResult }>(),
        completeFalure: props<{ error: any }>(),
        getCompletionStats: props<{ practiceId: string }>(),
        getCompletionStatsSuccess: props<{ stats: string }>(),
        getCompletionStatsFailure: props<{ error: any }>(),
        getRewards: props<{ practiceId: string }>(),
        getRewardsSuccess: props<{
            rewards: { gems: number; energies: number };
        }>(),
        getRewardsFailure: props<{ error: any }>(),
    },
});
