import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { CourseStoreState } from './store/course.reducer';
import { CourseActions } from './store/course.actions';
import { CourseSelectors } from './store/course.selectors';
import { DropdownItemComponent } from '../dashboard/dropdown-item/dropdown-item.component';
import { QuestListComponent } from '../dashboard/quest-list/quest-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
    NgbModal,
    NgbModalConfig,
    NgbModalModule,
} from '@ng-bootstrap/ng-bootstrap';
import { Course } from '@libs/models';
import { TestConfigPopupComponent } from '../dashboard/test-config-popup/test-config-popup.component';
import { TestHistoryComponent } from './test-history/test-history.component';
import { UnitTableComponent } from './unit-table/unit-table.component';

@Component({
    selector: 'epa-course',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        DropdownItemComponent,
        QuestListComponent,
        MatButtonModule,
        MatIconModule,
        NgbModalModule,
        TestHistoryComponent,
        UnitTableComponent,
    ],
    templateUrl: './course.component.html',
    styleUrl: './course.component.scss',
})
export class CourseComponent implements OnInit {
    constructor(
        private readonly route: ActivatedRoute,
        private readonly store: Store<CourseStoreState>,
        private readonly modalService: NgbModal,
        private readonly config: NgbModalConfig
    ) {
        this.config.backdrop = 'static';
    }

    get courseId() {
        return this.route.snapshot.paramMap.get('courseId') as string;
    }

    get course$() {
        return this.store.select(CourseSelectors.CourseData);
    }

    ngOnInit(): void {
        this.store.dispatch(
            CourseActions.getCourseById({ courseId: this.courseId })
        );
    }

    openTestConfigModal(courseData: Course): void {
        const modalRef = this.modalService.open(TestConfigPopupComponent);
        modalRef.componentInstance.course = courseData;
        modalRef.result.then(
            (result) => {
                console.log(`Closed with: ${result}`);
            },
            (reason) => {
                console.log(`Dismissed ${reason}`);
            }
        );
    }
}
