/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@libs/models';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const TestActions = createActionGroup({
    source: 'Test',
    events: {
        GetTest: props<{ testId: string }>(),
        GetTestSuccess: props<{ data: Test }>(),
        GetTestFailure: props<{ error: any }>(),
        FetchQuestionAnswer: props<{
            pIndex: number;
            qIndex: number;
            answer: any;
        }>(),
        SubmitTest: emptyProps(),
        SubmitTestSuccess: props<{ data: Partial<Test> }>(),
        SubmitTestFailure: props<{ error: any }>(),
    },
});
