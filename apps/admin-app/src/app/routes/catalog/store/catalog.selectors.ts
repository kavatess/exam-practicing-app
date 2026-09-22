import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AdminEntity, EntityKind } from '../../../shared/models/cms.model';
import { CatalogState } from './catalog.reducer';

export const catalogStoreKey = 'catalog';

export const catalogFeatureSelector =
    createFeatureSelector<CatalogState>(catalogStoreKey);

/** Rows matching the kind's search box, by name or description. */
function matching(entities: AdminEntity[], search: string): AdminEntity[] {
    const term = search.trim().toLowerCase();
    if (!term) {
        return entities;
    }
    return entities.filter(
        (entity) =>
            entity.name.toLowerCase().includes(term) ||
            entity.description.toLowerCase().includes(term)
    );
}

export const CatalogSelectors = {
    Entities: (kind: EntityKind) =>
        createSelector(catalogFeatureSelector, (state: CatalogState) =>
            matching(state[kind].entities, state[kind].search)
        ),
    Search: (kind: EntityKind) =>
        createSelector(
            catalogFeatureSelector,
            (state: CatalogState) => state[kind].search
        ),
    Loading: (kind: EntityKind) =>
        createSelector(
            catalogFeatureSelector,
            (state: CatalogState) => state[kind].loading
        ),
    Error: createSelector(
        catalogFeatureSelector,
        (state: CatalogState) => state.error
    ),
};
