import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import {
    AdminEntity,
    EntityField,
    EntityKind,
} from '../../../shared/models/cms.model';
import { seedEntities } from './catalog.seed';

/** Request payload for creating or editing a catalogue entry. */
export interface EntityDraft {
    name: string;
    description: string;
    metaPrimary: string;
    metaSecondary: string;
    fields: EntityField[];
}

/**
 * The catalogue's data boundary — achievements, quests and shop items.
 *
 * They are three endpoints behind one shape, so `kind` picks the collection
 * and the rest of the method is identical. Swapping in `HttpClient` means
 * routing `kind` to its URL here; nothing above this file changes.
 */
@Injectable({ providedIn: 'root' })
export class CatalogService {
    private readonly collections: Record<EntityKind, AdminEntity[]> = {
        achievement: seedEntities('achievement'),
        quest: seedEntities('quest'),
        'shop-item': seedEntities('shop-item'),
    };

    private sequence = 0;

    getEntities(kind: EntityKind): Observable<AdminEntity[]> {
        return of(structuredClone(this.collections[kind]));
    }

    /** Creates an entry when `entityId` is null, otherwise edits that entry. */
    saveEntity(
        kind: EntityKind,
        entityId: string | null,
        draft: EntityDraft
    ): Observable<AdminEntity> {
        const collection = this.collections[kind];

        if (!entityId) {
            const entity: AdminEntity = {
                id: this.nextId(kind),
                kind,
                name: draft.name.trim() || 'Untitled',
                description: draft.description,
                metaPrimary: draft.metaPrimary,
                metaSecondary: draft.metaSecondary || 'Draft',
                tone: 'ok',
                fields: draft.fields.map((f) => ({ ...f })),
            };
            collection.push(entity);
            return of(structuredClone(entity));
        }

        const entity = collection.find((item) => item.id === entityId);
        if (!entity) {
            return throwError(() => new Error(`${kind} ${entityId} not found`));
        }
        entity.name = draft.name.trim() || entity.name;
        entity.description = draft.description;
        entity.metaPrimary = draft.metaPrimary;
        entity.metaSecondary = draft.metaSecondary;
        entity.fields = draft.fields.map((f) => ({ ...f }));
        return of(structuredClone(entity));
    }

    removeEntity(kind: EntityKind, entityId: string): Observable<string> {
        const collection = this.collections[kind];
        const index = collection.findIndex((item) => item.id === entityId);
        if (index < 0) {
            return throwError(() => new Error(`${kind} ${entityId} not found`));
        }
        collection.splice(index, 1);
        return of(entityId);
    }

    private nextId(kind: EntityKind): string {
        this.sequence += 1;
        return `${kind}-new-${this.sequence}`;
    }
}
