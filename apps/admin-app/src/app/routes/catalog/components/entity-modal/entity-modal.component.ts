import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalShellComponent } from '../../../../shared/components/modal-shell/modal-shell.component';
import {
    AdminEntity,
    avatarTone,
    EntityCopy,
    EntityField,
    initials,
} from '../../../../shared/models/cms.model';
import { EntityDraft } from '../../store/catalog.service';

/** The editor behind Achievements, Quests and Shop. */
@Component({
    selector: 'adm-entity-modal',
    standalone: true,
    imports: [FormsModule, ModalShellComponent],
    templateUrl: './entity-modal.component.html',
    styleUrl: './entity-modal.component.scss',
})
export class EntityModalComponent implements OnInit {
    @Input({ required: true }) copy!: EntityCopy;
    @Input() entity: AdminEntity | null = null;

    @Output() dismiss = new EventEmitter<void>();
    @Output() save = new EventEmitter<EntityDraft>();
    @Output() remove = new EventEmitter<void>();

    /** The wireframe's toggle — visible to learners, active, in stock. */
    readonly enabled = signal(true);

    draft!: EntityDraft;

    ngOnInit(): void {
        this.draft = this.entity
            ? {
                  name: this.entity.name,
                  description: this.entity.description,
                  metaPrimary: this.entity.metaPrimary,
                  metaSecondary: this.entity.metaSecondary,
                  fields: this.entity.fields.map((f) => ({ ...f })),
              }
            : {
                  name: '',
                  description: '',
                  metaPrimary: '',
                  metaSecondary: 'Draft',
                  fields: this.blankFields(),
              };
    }

    get title(): string {
        return this.entity
            ? `Edit ${this.copy.singular}`
            : `New ${this.copy.singular}`;
    }

    get art(): { bg: string; fg: string; abbr: string } {
        const name = this.draft?.name || this.copy.singular;
        const [bg, fg] = avatarTone(name);
        return { bg, fg, abbr: initials(name) };
    }

    updateField(index: number, value: string): void {
        this.draft.fields = this.draft.fields.map((field, i) =>
            i === index ? { ...field, value } : field
        );
    }

    confirm(): void {
        this.save.emit(this.draft);
    }

    /** A new entry starts with the same four slots its siblings use. */
    private blankFields(): EntityField[] {
        const labels: Record<string, [string, string][]> = {
            achievement: [
                ['Condition type', '▾'],
                ['Condition value', ''],
                ['Reward', '▾'],
                ['Reward amount', ''],
            ],
            quest: [
                ['Reward', '▾'],
                ['Reward amount', ''],
                ['Condition type', '▾'],
                ['Target value', ''],
            ],
            'shop-item': [
                ['Price', 'GEMS'],
                ['Currency', '▾'],
                ['Item type', '▾'],
                ['Quantity', ''],
            ],
        };
        const kind = this.entity?.kind ?? this.kindFromCopy();
        return (labels[kind] ?? labels['achievement']).map(
            ([label, hint]) => ({ label, value: '', hint })
        );
    }

    private kindFromCopy(): string {
        if (this.copy.singular === 'quest') {
            return 'quest';
        }
        return this.copy.singular === 'item' ? 'shop-item' : 'achievement';
    }
}
