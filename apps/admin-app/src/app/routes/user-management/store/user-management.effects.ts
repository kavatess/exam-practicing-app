import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
    catchError,
    debounceTime,
    exhaustMap,
    map,
    of,
    switchMap,
    withLatestFrom,
} from 'rxjs';
import { UserManagementActions } from './user-management.actions';
import { UserManagementSelectors } from './user-management.selectors';
import { UserManagementService } from './user-management.service';

@Injectable()
export class UserManagementEffects {
    private readonly actions$: Actions = inject(Actions);
    private readonly store = inject(Store);
    private readonly service = inject(UserManagementService);

    readonly loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserManagementActions.loadUsers),
            withLatestFrom(
                this.store.select(UserManagementSelectors.Role),
                this.store.select(UserManagementSelectors.Status),
                this.store.select(UserManagementSelectors.Search)
            ),
            // A newer filter makes an in-flight read stale, so it is dropped.
            switchMap(([, role, status, search]) =>
                this.service.queryUsers({ role, status, search }).pipe(
                    map(({ rows, total }) =>
                        UserManagementActions.loadUsersSuccess({
                            users: rows,
                            total,
                        })
                    ),
                    catchError((error) =>
                        of(UserManagementActions.loadUsersFailure({ error }))
                    )
                )
            )
        )
    );

    readonly reloadOnFilterChange$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                UserManagementActions.selectRole,
                UserManagementActions.selectStatus,
                UserManagementActions.updateUserSuccess
            ),
            map(() => UserManagementActions.loadUsers())
        )
    );

    readonly reloadOnSearch$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserManagementActions.search),
            debounceTime(250),
            map(() => UserManagementActions.loadUsers())
        )
    );

    readonly loadProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserManagementActions.openUser),
            switchMap(({ userId }) =>
                this.service.getProfile(userId).pipe(
                    map((profile) =>
                        UserManagementActions.loadProfileSuccess({
                            userId,
                            profile,
                        })
                    ),
                    catchError((error) =>
                        of(UserManagementActions.loadProfileFailure({ error }))
                    )
                )
            )
        )
    );

    readonly setStatus$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserManagementActions.setStatus),
            exhaustMap(({ userId, status }) =>
                this.service.setStatus(userId, status).pipe(
                    map((user) =>
                        UserManagementActions.updateUserSuccess({ user })
                    ),
                    catchError((error) =>
                        of(UserManagementActions.updateUserFailure({ error }))
                    )
                )
            )
        )
    );

    readonly setRole$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserManagementActions.setRole),
            exhaustMap(({ userId, role }) =>
                this.service.setRole(userId, role).pipe(
                    map((user) =>
                        UserManagementActions.updateUserSuccess({ user })
                    ),
                    catchError((error) =>
                        of(UserManagementActions.updateUserFailure({ error }))
                    )
                )
            )
        )
    );
}
