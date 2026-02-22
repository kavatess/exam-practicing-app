/* eslint-disable @typescript-eslint/no-explicit-any */
import { Result, ResultTypes } from '@libs/models';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const HistoryActions = createActionGroup({
    source: 'History',
    events: {
        // Initialize History component
        initHistory: emptyProps(),
        initHistorySuccess: props<{ list: Result[] }>(),
        initHistoryFailure: props<{ error: any }>(),
        // Get Test Result
        GetResult: props<{
            testId: string;
            resultType: ResultTypes;
        }>(),
        GetResultSuccess: props<{ data: Result }>(),
        GetResultFailure: props<{ error: any }>(),
    },
});
