import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfileStoreState } from './profile.reducer';

// Feature Key
export const profileStoreKey = 'profile';

// Selectors
export const profileFeatureSelector =
    createFeatureSelector<ProfileStoreState>(profileStoreKey);

// Selectors
export const ProfileSelectors = {
    Data: createSelector(
        profileFeatureSelector,
        (state: ProfileStoreState) => state.profile.data || null
    ),
};
