import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { LibraryStoreState } from './library.reducer';
import { LibraryService } from './library.service';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { LibraryActions } from './library.actions';

@Injectable()
export class LibraryEffects {
    private readonly actions$: Actions = inject(Actions);
    private readonly store: Store<LibraryStoreState> = inject(
        Store<LibraryStoreState>
    );

    constructor(private readonly service: LibraryService) {}

    readonly getCourses$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LibraryActions.getCourses),
            exhaustMap(() =>
                this.service.getAvailableCourses().pipe(
                    map((list) => LibraryActions.getCoursesSuccess({ list })),
                    catchError((error) =>
                        of(LibraryActions.getCoursesFailure({ error }))
                    )
                )
            )
        )
    );
}
