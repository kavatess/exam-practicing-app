import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
    AdminSubject,
    DIFFICULTY_LABELS,
    findSubject,
    QUESTION_TYPE_LABELS,
    QuestionScope,
} from '../../../../shared/models/cms.model';

@Component({
    selector: 'adm-scope-banner',
    standalone: true,
    imports: [],
    templateUrl: './scope-banner.component.html',
    styleUrl: './scope-banner.component.scss',
})
export class ScopeBannerComponent {
    @Input({ required: true }) scope!: QuestionScope;
    @Input() subjects: AdminSubject[] = [];
    @Input() matchCount = 0;

    @Output() clear = new EventEmitter<void>();

    get matchCountLabel(): string {
        return this.matchCount.toLocaleString('en-US');
    }

    /** The block's criteria, spelled out the way the rail shows them. */
    get criteria(): string {
        const { filter } = this.scope;
        const subject = filter.subjectId
            ? findSubject(this.subjects, filter.subjectId)
            : null;
        const units = (subject?.units ?? []).filter((unit) =>
            filter.unitIds.includes(unit.id)
        );

        return [
            ...units.map((unit) => unit.title),
            filter.qType !== null ? QUESTION_TYPE_LABELS[filter.qType] : null,
            filter.difficulty !== null
                ? DIFFICULTY_LABELS[filter.difficulty]
                : null,
            filter.level,
        ]
            .filter((part): part is string => !!part)
            .join(' · ')
            .toUpperCase();
    }
}
