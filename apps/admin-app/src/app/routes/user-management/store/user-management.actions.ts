import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
    AdminUser,
    UserRole,
    UserStatus,
} from '../../../shared/models/cms.model';
import { UserProfile } from './user-management.service';

export const UserManagementActions = createActionGroup({
    source: 'User Management',
    events: {
        LoadUsers: emptyProps(),
        LoadUsersSuccess: props<{ users: AdminUser[]; total: number }>(),
        LoadUsersFailure: props<{ error: unknown }>(),

        SelectRole: props<{ role: UserRole | null }>(),
        SelectStatus: props<{ status: UserStatus | null }>(),
        Search: props<{ search: string }>(),

        OpenUser: props<{ userId: string }>(),
        CloseUser: emptyProps(),
        LoadProfileSuccess: props<{ userId: string; profile: UserProfile }>(),
        LoadProfileFailure: props<{ error: unknown }>(),

        SetStatus: props<{ userId: string; status: UserStatus }>(),
        SetRole: props<{ userId: string; role: UserRole }>(),
        UpdateUserSuccess: props<{ user: AdminUser }>(),
        UpdateUserFailure: props<{ error: unknown }>(),
    },
});
