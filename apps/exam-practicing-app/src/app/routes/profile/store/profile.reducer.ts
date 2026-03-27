import { Profile } from '@libs/models';
import { createReducer, on } from '@ngrx/store';
import { ProfileActions } from './profile.actions';

export interface ProfileStoreState {
    profile: {
        data: Profile;
    };
}

export const initialState: ProfileStoreState = {
    profile: {
        data: null,
    },
};

export const profileReducer = createReducer(
    initialState,
    on(ProfileActions.initProfile, (state) => ({
        ...state,
        profile: {
            ...state.profile,
            data: null,
        },
    })),
    on(ProfileActions.initProfileSuccess, (state, { data }) => ({
        ...state,
        profile: {
            ...state.profile,
            data,
        },
    }))
);
