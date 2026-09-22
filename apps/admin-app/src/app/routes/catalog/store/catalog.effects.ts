import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { CatalogActions } from './catalog.actions';
import { CatalogService } from './catalog.service';

@Injectable()
export class CatalogEffects {
    private readonly actions$: Actions = inject(Actions);
    private readonly service = inject(CatalogService);

    readonly loadEntities$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CatalogActions.loadEntities),
            // Three kinds load independently, so a request for one must not
            // drop a request for another.
            exhaustMap(({ kind }) =>
                this.service.getEntities(kind).pipe(
                    map((entities) =>
                        CatalogActions.loadEntitiesSuccess({ kind, entities })
                    ),
                    catchError((error) =>
                        of(
                            CatalogActions.loadEntitiesFailure({ kind, error })
                        )
                    )
                )
            )
        )
    );

    readonly saveEntity$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CatalogActions.saveEntity),
            exhaustMap(({ kind, entityId, draft }) =>
                this.service.saveEntity(kind, entityId, draft).pipe(
                    map((entity) =>
                        CatalogActions.saveEntitySuccess({ kind, entity })
                    ),
                    catchError((error) =>
                        of(CatalogActions.saveEntityFailure({ kind, error }))
                    )
                )
            )
        )
    );

    readonly removeEntity$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CatalogActions.removeEntity),
            exhaustMap(({ kind, entityId }) =>
                this.service.removeEntity(kind, entityId).pipe(
                    map((id) =>
                        CatalogActions.removeEntitySuccess({
                            kind,
                            entityId: id,
                        })
                    ),
                    catchError((error) =>
                        of(CatalogActions.removeEntityFailure({ kind, error }))
                    )
                )
            )
        )
    );
}
