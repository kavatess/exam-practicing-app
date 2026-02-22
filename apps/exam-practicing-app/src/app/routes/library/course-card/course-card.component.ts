import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '@libs/models';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { APP_ROUTES } from '../../../app.routes';

@Component({
    selector: 'epa-course-card',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatIconModule, RouterModule],
    templateUrl: './course-card.component.html',
    styleUrl: './course-card.component.scss',
})
export class CourseCardComponent {
    @Input()
    data: Course = null;

    constructor(private readonly router: Router) {}

    navigateToCourseDetails(courseId: string | number) {
        this.router.navigate([APP_ROUTES.LIBRARY, courseId]);
    }
}
