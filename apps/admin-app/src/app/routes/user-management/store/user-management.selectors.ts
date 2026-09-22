import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserManagementState } from './user-management.reducer';

export const userManagementStoreKey = 'userManagement';

export const userManagementFeatureSelector =
    createFeatureSelector<UserManagementState>(userManagementStoreKey);

export const UserManagementSelectors = {
    Users: createSelector(
        userManagementFeatureSelector,
        (state: UserManagementState) => state.users
    ),
    Total: createSelector(
        userManagementFeatureSelector,
        (state: UserManagementState) => state.total
    ),
    Role: createSelector(
        userManagementFeatureSelector,
        (state: UserManagementState) => state.role
    ),
    Status: createSelector(
        userManagementFeatureSelector,
        (state: UserManagementState) => state.status
    ),
    Search: createSelector(
        userManagementFeatureSelector,
        (state: UserManagementState) => state.search
    ),
    OpenUser: createSelector(
        userManagementFeatureSelector,
        (state: UserManagementState) =>
            state.users.find((user) => user.id === state.openUserId) ?? null
    ),
    Profile: createSelector(
        userManagementFeatureSelector,
        (state: UserManagementState) => state.profile
    ),
    Loading: createSelector(
        userManagementFeatureSelector,
        (state: UserManagementState) => state.loading
    ),
};
