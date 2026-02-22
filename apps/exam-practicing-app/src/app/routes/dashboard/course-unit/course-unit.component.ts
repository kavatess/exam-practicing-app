/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { APP_ROUTES } from '../../../app.routes';
import { SubjectUnit } from '@libs/models';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
    NgbDropdownModule,
    NgbModal,
    NgbModalConfig,
    NgbModalModule,
} from '@ng-bootstrap/ng-bootstrap';
import { CourseUnitService } from './course-unit.service';

@Component({
    selector: 'epa-course-unit',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatIconModule,
        NgbModalModule,
        NgbDropdownModule,
    ],
    templateUrl: './course-unit.component.html',
    styleUrl: './course-unit.component.scss',
})
export class CourseUnitComponent {
    @Input() unit: SubjectUnit = null;

    constructor(
        private readonly router: Router,
        private readonly config: NgbModalConfig,
        private readonly modalService: NgbModal,
        private readonly service: CourseUnitService
    ) {
        this.config.backdrop = 'static';
    }

    openModal(content: TemplateRef<unknown>) {
        const modalRef = this.modalService.open(content);
        this.service
            .createPracticeTest(this.unit.id as string)
            .subscribe((practiceId) => {
                modalRef.close();
                this.goToPracticeTest(practiceId);
            });
    }

    goToPracticeTest(practiceId: string) {
        this.router.navigate([`/${APP_ROUTES.PRACTICE}/${practiceId}`]);
    }
}
