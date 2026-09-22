import { createReducer, on } from '@ngrx/store';
import {
    AdminUser,
    UserRole,
    UserStatus,
} from '../../../shared/models/cms.model';
import { UserManagementActions } from './user-management.actions';
import { UserProfile } from './user-management.service';

export interface UserManagementState {
    users: AdminUser[];
    total: number;
    role: UserRole | null;
    status: UserStatus | null;
    search: string;
    /** The learner whose drawer is open, or null when it is closed. */
    openUserId: string | null;
    profile: UserProfile | null;
    loading: boolean;
    error: unknown;
}

export const initialState: UserManagementState = {
    users: [],
    total: 0,
    role: null,
    status: null,
    search: '',
    openUserId: null,
    profile: null,
    loading: false,
    error: null,
};

export const userManagementReducer = createReducer(
    initialState,

    on(UserManagementActions.loadUsers, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(UserManagementActions.loadUsersSuccess, (state, { users, total }) => ({
        ...state,
        users,
        total,
        loading: false,
    })),

    on(UserManagementActions.selectRole, (state, { role }) => ({
        ...state,
        role,
    })),
    on(UserManagementActions.selectStatus, (state, { status }) => ({
        ...state,
        status,
    })),
    on(UserManagementActions.search, (state, { search }) => ({
        ...state,
        search,
    })),

    // The profile is fetched per learner, so it clears as the drawer opens.
    on(UserManagementActions.openUser, (state, { userId }) => ({
        ...state,
        openUserId: userId,
        profile: null,
    })),
    on(UserManagementActions.closeUser, (state) => ({
        ...state,
        openUserId: null,
        profile: null,
    })),
    on(UserManagementActions.loadProfileSuccess, (state, { userId, profile }) =>
        // A slower reply for a drawer the user already moved on from is stale.
        state.openUserId === userId ? { ...state, profile } : state
    ),

    on(UserManagementActions.updateUserSuccess, (state, { user }) => ({
        ...state,
        users: state.users.map((item) => (item.id === user.id ? user : item)),
    })),

    on(
        UserManagementActions.loadUsersFailure,
        UserManagementActions.loadProfileFailure,
        UserManagementActions.updateUserFailure,
        (state, { error }) => ({ ...state, loading: false, error })
    )
);
