import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import {
    AdminCourse,
    CourseYearGroup,
} from '../../models/subject-management.model';

@Component({
    selector: 'adm-course-year-list',
    standalone: true,
    imports: [],
    templateUrl: './course-year-list.component.html',
    styleUrl: './course-year-list.component.scss',
})
export class CourseYearListComponent {
    @Input({ required: true }) courses: AdminCourse[] = [];
    @Input() selectedCourseId: string | null = null;

    @Output() create = new EventEmitter<void>();
    @Output() select = new EventEmitter<string>();

    readonly collapsedYears = signal<ReadonlySet<number>>(new Set());

    get yearGroups(): CourseYearGroup[] {
        const groups = new Map<number, AdminCourse[]>();
        for (const course of this.courses) {
            const bucket = groups.get(course.year) ?? [];
            bucket.push(course);
            groups.set(course.year, bucket);
        }
        return [...groups.entries()]
            .sort((a, b) => b[0] - a[0])
            .map(([year, courses]) => ({ year, courses }));
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

    courseLabel(group: CourseYearGroup): string {
        const count = group.courses.length;
        return `${count} ${count === 1 ? 'course' : 'courses'}`;
    }

    typeClass(course: AdminCourse): string {
        return `type-${course.courseType.toLowerCase()}`;
    }
}
