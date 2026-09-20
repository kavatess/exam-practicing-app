import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminSubject } from '../../../../shared/models/cms.model';

@Component({
    selector: 'adm-subject-list',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './subject-list.component.html',
    styleUrl: './subject-list.component.scss',
})
export class SubjectListComponent {
    @Input({ required: true }) subjects: AdminSubject[] = [];
    @Input() selectedId: string | null = null;

    @Output() select = new EventEmitter<string>();
    @Output() create = new EventEmitter<void>();
    @Output() edit = new EventEmitter<AdminSubject>();

    readonly search = signal('');

    get visibleSubjects(): AdminSubject[] {
        const term = this.search().trim().toLowerCase();
        if (!term) {
            return this.subjects;
        }
        return this.subjects.filter((subject) =>
            subject.name.toLowerCase().includes(term)
        );
    }

    unitLabel(subject: AdminSubject): string {
        const count = subject.units.length;
        return `${count} ${count === 1 ? 'unit' : 'units'}`;
    }
}
