import { Component, Input, signal } from '@angular/core';
import { QuestionMatch } from '../../../../shared/models/cms.model';

/**
 * The blocks a question is eligible for. Questions are never assigned to a
 * block — a block draws at random from everything matching its criteria.
 */
@Component({
    selector: 'adm-question-matches',
    standalone: true,
    imports: [],
    templateUrl: './question-matches.component.html',
    styleUrl: './question-matches.component.scss',
})
export class QuestionMatchesComponent {
    @Input() matches: QuestionMatch[] = [];

    readonly open = signal(false);

    get label(): string {
        const count = this.matches.length;
        if (!count) {
            return 'No matches';
        }
        return count === 1 ? 'Matches 1 block' : `Matches ${count} blocks`;
    }

    toggle(): void {
        this.open.update((value) => !value);
    }
}
