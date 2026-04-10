import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ProfileStoreState } from './profile.reducer';
import { ProfileService } from './profile.service';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { ProfileActions } from './profile.actions';
import { Router } from '@angular/router';

@Injectable()
export class ProfileEffects {
    private readonly actions$: Actions = inject(Actions);
    private readonly store: Store<ProfileStoreState> = inject(
        Store<ProfileStoreState>
    );

    constructor(
        private readonly service: ProfileService,
        private readonly router: Router
    ) {}

    readonly initProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProfileActions.initProfile),
            exhaustMap(() =>
                this.service.getUserProfile().pipe(
                    map((data) => ProfileActions.initProfileSuccess({ data })),
                    catchError((error) =>
                        of(ProfileActions.initProfileFailure({ error }))
                    )
                )
            )
        )
    );

    readonly uploadProfilePicture$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProfileActions.uploadProfilePicture),
            exhaustMap(({ file }) =>
                this.service.uploadProfilePicture(file).pipe(
                    map((response) => ProfileActions.uploadProfilePictureSuccess({ profilePictureUrl: response.profilePictureUrl })),
                    catchError((error) =>
                        of(ProfileActions.uploadProfilePictureFailure({ error }))
                    )
                )
            )
        )
    );
}
