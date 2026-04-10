import { Profile } from '@libs/models';
import { createReducer, on } from '@ngrx/store';
import { ProfileActions } from './profile.actions';

export interface ProfileStoreState {
    profile: {
        data: Profile | null;
        isUploading: boolean; // Renamed from 'uploading'
        error: any;
    };
}

export const initialState: ProfileStoreState = {
    profile: {
        data: null,
        isUploading: false,
        error: null,
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
    })),
    on(ProfileActions.uploadProfilePicture, (state) => ({
        ...state,
        profile: {
            ...state.profile,
            isUploading: true,
            error: null,
        },
    })),
    on(ProfileActions.uploadProfilePictureSuccess, (state, { profilePictureUrl }) => ({
        ...state,
        profile: {
            ...state.profile,
            isUploading: false,
            data: state.profile.data
                ? { ...state.profile.data, profilePictureUrl }
                : null,
        },
    })),
    on(ProfileActions.uploadProfilePictureFailure, (state, { error }) => ({
        ...state,
        profile: {
            ...state.profile,
            isUploading: false,
            error,
        },
    }))
);
