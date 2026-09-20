import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { AdminExam, ExamYearGroup } from '../../../../shared/models/cms.model';

@Component({
    selector: 'adm-exam-year-list',
    standalone: true,
    imports: [],
    templateUrl: './exam-year-list.component.html',
    styleUrl: './exam-year-list.component.scss',
})
export class ExamYearListComponent {
    @Input({ required: true }) exams: AdminExam[] = [];
    @Input() selectedExamId: string | null = null;

    @Output() create = new EventEmitter<void>();
    @Output() select = new EventEmitter<string>();

    readonly collapsedYears = signal<ReadonlySet<number>>(new Set());

    get yearGroups(): ExamYearGroup[] {
        const groups = new Map<number, AdminExam[]>();
        for (const exam of this.exams) {
            const bucket = groups.get(exam.year) ?? [];
            bucket.push(exam);
            groups.set(exam.year, bucket);
        }
        return [...groups.entries()]
            .sort((a, b) => b[0] - a[0])
            .map(([year, exams]) => ({ year, exams }));
    }

    get currentYear(): number {
        return this.yearGroups.length ? this.yearGroups[0].year : 0;
    }

    isOpen(year: number): boolean {
        return !this.collapsedYears().has(year);
    }

    toggleYear(year: number): void {
        this.collapsedYears.update((years) => {
            const next = new Set(years);
            if (next.has(year)) {
                next.delete(year);
            } else {
                next.add(year);
            }
            return next;
        });
    }

    examLabel(group: ExamYearGroup): string {
        const count = group.exams.length;
        return `${count} ${count === 1 ? 'exam' : 'exams'}`;
    }

    typeClass(exam: AdminExam): string {
        return `type-${exam.examType.toLowerCase()}`;
    }

    subjectBadge(exam: AdminExam): string | null {
        const count = exam.sections.length;
        return count > 1 ? `${count} subjects` : null;
    }
}
