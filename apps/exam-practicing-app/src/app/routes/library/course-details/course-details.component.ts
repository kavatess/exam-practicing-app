import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { LibraryStoreState } from '../store/library.reducer';
import { LibraryActions } from '../store/library.actions';
import { LibrarySelectors } from '../store/library.selectors';
import { DropdownItemComponent } from '../../dashboard/dropdown-item/dropdown-item.component';
import { QuestListComponent } from '../../dashboard/quest-list/quest-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
    NgbModal,
    NgbModalConfig,
    NgbModalModule,
} from '@ng-bootstrap/ng-bootstrap';
import { Course } from '@libs/models';
import { TestConfigPopupComponent } from '../../dashboard/test-config-popup/test-config-popup.component';

@Component({
    selector: 'epa-course-details',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        DropdownItemComponent,
        QuestListComponent,
        MatButtonModule,
        MatIconModule,
        NgbModalModule,
    ],
    templateUrl: './course-details.component.html',
    styleUrl: './course-details.component.scss',
})
export class CourseDetailsComponent implements OnInit {
    constructor(
        private readonly route: ActivatedRoute,
        private readonly store: Store<LibraryStoreState>,
        private readonly modalService: NgbModal,
        private readonly config: NgbModalConfig
    ) {
        this.config.backdrop = 'static';
    }

    get courseId() {
        return this.route.snapshot.paramMap.get('courseId') as string;
    }

    get course$() {
        return this.store.select(LibrarySelectors.CourseData);
    }

    ngOnInit(): void {
        this.store.dispatch(
            LibraryActions.selectCourse({ courseId: this.courseId })
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
