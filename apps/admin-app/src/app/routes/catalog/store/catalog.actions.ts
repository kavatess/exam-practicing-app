import { createActionGroup, props } from '@ngrx/store';
import { AdminEntity, EntityKind } from '../../../shared/models/cms.model';
import { EntityDraft } from './catalog.service';

/**
 * Every action carries the `kind` it acts on, so achievements, quests and shop
 * items share one action group without their state bleeding together.
 */
export const CatalogActions = createActionGroup({
    source: 'Catalog',
    events: {
        LoadEntities: props<{ kind: EntityKind }>(),
        LoadEntitiesSuccess: props<{
            kind: EntityKind;
            entities: AdminEntity[];
        }>(),
        LoadEntitiesFailure: props<{ kind: EntityKind; error: unknown }>(),

        Search: props<{ kind: EntityKind; search: string }>(),

        SaveEntity: props<{
            kind: EntityKind;
            entityId: string | null;
            draft: EntityDraft;
        }>(),
        SaveEntitySuccess: props<{ kind: EntityKind; entity: AdminEntity }>(),
        SaveEntityFailure: props<{ kind: EntityKind; error: unknown }>(),

        RemoveEntity: props<{ kind: EntityKind; entityId: string }>(),
        RemoveEntitySuccess: props<{ kind: EntityKind; entityId: string }>(),
        RemoveEntityFailure: props<{ kind: EntityKind; error: unknown }>(),
    },
});
