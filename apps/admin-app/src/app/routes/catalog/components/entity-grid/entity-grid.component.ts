import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    AdminEntity,
    avatarTone,
    EntityCopy,
    ENTITY_TONE_CLASS,
    initials,
} from '../../../../shared/models/cms.model';

/**
 * The card grid behind Achievements, Quests and Shop. `copy` supplies the
 * per-page wording so one grid serves all three.
 */
@Component({
    selector: 'adm-entity-grid',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './entity-grid.component.html',
    styleUrl: './entity-grid.component.scss',
})
export class EntityGridComponent {
    @Input({ required: true }) copy!: EntityCopy;
    @Input() entities: AdminEntity[] = [];
    @Input() search = '';

    @Output() searchChange = new EventEmitter<string>();
    @Output() create = new EventEmitter<void>();
    @Output() edit = new EventEmitter<AdminEntity>();

    /** Grid or list is a view preference, so it stays with the component. */
    readonly listView = signal(false);

    get searchPlaceholder(): string {
        return `Search ${this.copy.noun}`;
    }

    get addLabel(): string {
        return `Add ${this.copy.singular}`;
    }

    art(entity: AdminEntity): { bg: string; fg: string; abbr: string } {
        const [bg, fg] = avatarTone(entity.name);
        return { bg, fg, abbr: initials(entity.name) };
    }

    toneClass(entity: AdminEntity): string {
        return ENTITY_TONE_CLASS[entity.tone];
    }
}
