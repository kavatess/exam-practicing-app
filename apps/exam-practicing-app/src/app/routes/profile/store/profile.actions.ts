/* eslint-disable @typescript-eslint/no-explicit-any */
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Profile } from '@libs/models';

export const ProfileActions = createActionGroup({
    source: 'Profile',
    events: {
        // Initialize Profile data
        initProfile: emptyProps(),
        initProfileSuccess: props<{ data: Profile }>(),
        initProfileFailure: props<{ error: any }>(),
    },
});
