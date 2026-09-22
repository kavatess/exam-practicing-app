import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import {
    AdminUser,
    UserActivity,
    UserRole,
    UserStat,
    UserStatus,
} from '../../../shared/models/cms.model';
import {
    SEEDED_USER_ACTIVITY,
    SEEDED_USER_STATS,
    SEEDED_USER_TOTAL,
    seedUsers,
} from './user-management.seed';

export interface UserFilter {
    /** Null means every role. */
    role: UserRole | null;
    status: UserStatus | null;
    search: string;
}

export interface UserQueryResult {
    rows: AdminUser[];
    /** Learners matching the filter across the whole base, not just the page. */
    total: number;
}

export interface UserProfile {
    stats: UserStat[];
    activity: UserActivity[];
}

/**
 * The learner directory's data boundary. The query below is what the users
 * endpoint will do; swapping in `HttpClient` is confined to this file.
 */
@Injectable({ providedIn: 'root' })
export class UserManagementService {
    private users: AdminUser[] = seedUsers();

    queryUsers(filter: UserFilter): Observable<UserQueryResult> {
        const rows = this.users.filter((user) => matches(user, filter));
        return of({
            rows: structuredClone(rows),
            // The demo holds one page; the base is larger.
            total: isUnfiltered(filter) ? SEEDED_USER_TOTAL : rows.length,
        });
    }

    getProfile(userId: string): Observable<UserProfile> {
        const user = this.users.find((item) => item.id === userId);
        if (!user) {
            return throwError(() => new Error(`User ${userId} not found`));
        }
        return of({
            stats: SEEDED_USER_STATS.map((stat) => ({ ...stat })),
            activity: SEEDED_USER_ACTIVITY.map((entry) => ({ ...entry })),
        });
    }

    setStatus(userId: string, status: UserStatus): Observable<AdminUser> {
        const user = this.users.find((item) => item.id === userId);
        if (!user) {
            return throwError(() => new Error(`User ${userId} not found`));
        }
        user.status = status;
        return of(structuredClone(user));
    }

    setRole(userId: string, role: UserRole): Observable<AdminUser> {
        const user = this.users.find((item) => item.id === userId);
        if (!user) {
            return throwError(() => new Error(`User ${userId} not found`));
        }
        user.role = role;
        return of(structuredClone(user));
    }
}

function isUnfiltered(filter: UserFilter): boolean {
    return !filter.role && !filter.status && !filter.search.trim();
}

function matches(user: AdminUser, filter: UserFilter): boolean {
    if (filter.role && user.role !== filter.role) {
        return false;
    }
    if (filter.status && user.status !== filter.status) {
        return false;
    }
    const term = filter.search.trim().toLowerCase();
    if (!term) {
        return true;
    }
    return (
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
    );
}
