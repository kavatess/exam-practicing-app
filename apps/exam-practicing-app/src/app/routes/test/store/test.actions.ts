/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@libs/models';
import { createActionGroup, props } from '@ngrx/store';

export const TestActions = createActionGroup({
    source: 'Test',
    events: {
        GetTest: props<{ testId: string }>(),
        GetTestSuccess: props<{ data: Test }>(),
        GetTestFailure: props<{ error: any }>(),
    },
});
