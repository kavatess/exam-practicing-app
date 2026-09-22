import { createReducer, on } from '@ngrx/store';
import { AdminEntity, EntityKind } from '../../../shared/models/cms.model';
import { CatalogActions } from './catalog.actions';

export interface CatalogCollection {
    entities: AdminEntity[];
    search: string;
    loading: boolean;
}

export type CatalogState = Record<EntityKind, CatalogCollection> & {
    error: unknown;
};

const emptyCollection: CatalogCollection = {
    entities: [],
    search: '',
    loading: false,
};

export const initialState: CatalogState = {
    achievement: { ...emptyCollection },
    quest: { ...emptyCollection },
    'shop-item': { ...emptyCollection },
    error: null,
};

/** Applies a change to one collection, leaving the other two untouched. */
function patch(
    state: CatalogState,
    kind: EntityKind,
    change: Partial<CatalogCollection>
): CatalogState {
    return { ...state, [kind]: { ...state[kind], ...change } };
}

export const catalogReducer = createReducer(
    initialState,

    on(CatalogActions.loadEntities, (state, { kind }) =>
        patch(state, kind, { loading: true })
    ),
    on(CatalogActions.loadEntitiesSuccess, (state, { kind, entities }) =>
        patch(state, kind, { entities, loading: false })
    ),

    on(CatalogActions.search, (state, { kind, search }) =>
        patch(state, kind, { search })
    ),

    on(CatalogActions.saveEntitySuccess, (state, { kind, entity }) => {
        const existing = state[kind].entities;
        return patch(state, kind, {
            entities: existing.some((item) => item.id === entity.id)
                ? existing.map((item) =>
                      item.id === entity.id ? entity : item
                  )
                : [...existing, entity],
        });
    }),

    on(CatalogActions.removeEntitySuccess, (state, { kind, entityId }) =>
        patch(state, kind, {
            entities: state[kind].entities.filter(
                (item) => item.id !== entityId
            ),
        })
    ),

    on(
        CatalogActions.loadEntitiesFailure,
        CatalogActions.saveEntityFailure,
        CatalogActions.removeEntityFailure,
        (state, { kind, error }) => ({
            ...patch(state, kind, { loading: false }),
            error,
        })
    )
);
