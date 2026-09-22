import { Component, inject, Input, OnInit, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import {
    AdminEntity,
    ENTITY_COPY,
    EntityCopy,
    EntityKind,
} from '../../../../shared/models/cms.model';
import { CatalogActions } from '../../store/catalog.actions';
import { CatalogSelectors } from '../../store/catalog.selectors';
import { EntityDraft } from '../../store/catalog.service';
import { EntityGridComponent } from '../entity-grid/entity-grid.component';
import { EntityModalComponent } from '../entity-modal/entity-modal.component';

/**
 * The whole of Achievements, Quests and Shop. Each route renders this with its
 * own `kind`; everything else — copy, data, editor — follows from that.
 */
@Component({
    selector: 'adm-catalog-page',
    standalone: true,
    imports: [EntityGridComponent, EntityModalComponent],
    templateUrl: './catalog-page.component.html',
    styleUrl: './catalog-page.component.scss',
})
export class CatalogPageComponent implements OnInit {
    @Input({ required: true }) kind!: EntityKind;

    private readonly store = inject(Store);

    // Both selectors are parameterised by `kind`, so they are bound once the
    // input has arrived rather than at construction.
    entities!: Signal<AdminEntity[]>;
    search!: Signal<string>;

    // Overlay bookkeeping is view state, so it stays with the component.
    modalOpen = false;
    editingEntity: AdminEntity | null = null;

    ngOnInit(): void {
        this.entities = this.store.selectSignal(
            CatalogSelectors.Entities(this.kind)
        );
        this.search = this.store.selectSignal(
            CatalogSelectors.Search(this.kind)
        );
        this.store.dispatch(CatalogActions.loadEntities({ kind: this.kind }));
    }

    get copy(): EntityCopy {
        return ENTITY_COPY[this.kind];
    }

    get countLabel(): string {
        const count = this.entities().length;
        return `${count} ${count === 1 ? this.copy.singular : this.copy.noun}`;
    }

    onSearch(search: string): void {
        this.store.dispatch(CatalogActions.search({ kind: this.kind, search }));
    }

    openModal(entity: AdminEntity | null): void {
        this.editingEntity = entity;
        this.modalOpen = true;
    }

    closeModal(): void {
        this.modalOpen = false;
        this.editingEntity = null;
    }

    saveEntity(draft: EntityDraft): void {
        this.store.dispatch(
            CatalogActions.saveEntity({
                kind: this.kind,
                entityId: this.editingEntity?.id ?? null,
                draft,
            })
        );
        this.closeModal();
    }

    removeEntity(): void {
        const entity = this.editingEntity;
        if (entity) {
            this.store.dispatch(
                CatalogActions.removeEntity({
                    kind: this.kind,
                    entityId: entity.id,
                })
            );
        }
        this.closeModal();
    }
}
