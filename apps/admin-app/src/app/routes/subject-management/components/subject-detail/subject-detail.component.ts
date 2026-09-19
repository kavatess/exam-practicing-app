import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import {
    AdminSubject,
    AdminUnit,
    SubjectDetailTab,
} from '../../models/subject-management.model';
import { CourseYearListComponent } from '../course-year-list/course-year-list.component';
import { UnitTreeComponent } from '../unit-tree/unit-tree.component';

@Component({
    selector: 'adm-subject-detail',
    standalone: true,
    imports: [UnitTreeComponent, CourseYearListComponent],
    templateUrl: './subject-detail.component.html',
    styleUrl: './subject-detail.component.scss',
})
export class SubjectDetailComponent {
    @Input({ required: true }) subject!: AdminSubject;
    @Input() selectedCourseId: string | null = null;

    @Output() editSubject = new EventEmitter<void>();
    @Output() createUnit = new EventEmitter<void>();
    @Output() editUnit = new EventEmitter<AdminUnit>();
    @Output() removeUnit = new EventEmitter<AdminUnit>();
    @Output() createCourse = new EventEmitter<void>();
    @Output() selectCourse = new EventEmitter<string>();

    readonly tab = signal<SubjectDetailTab>('courses');

    get meta(): string {
        const units = this.subject.units.length;
        const courses = this.subject.courses.length;
        return [
            this.subject.description,
            `${units} ${units === 1 ? 'unit' : 'units'}`,
            `${courses} ${courses === 1 ? 'course' : 'courses'}`,
        ]
            .filter(Boolean)
            .join(' · ');
    }
}
