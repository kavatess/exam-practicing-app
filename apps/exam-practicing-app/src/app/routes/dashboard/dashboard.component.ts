import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownItemComponent } from './dropdown-item/dropdown-item.component';
import { QuestListComponent } from './quest-list/quest-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DashboardStoreState } from './store/dashboard.reducer';
import { Store } from '@ngrx/store';
import { CourseSelectors } from './store/dashboard.selectors';
import {
    NgbDropdownModule,
    NgbModal,
    NgbModalConfig,
    NgbModalModule,
    NgbNavModule,
} from '@ng-bootstrap/ng-bootstrap';
import { TestConfigPopupComponent } from './test-config-popup/test-config-popup.component';
import { Course } from '@libs/models';
import { CourseUnitComponent } from './course-unit/course-unit.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { TestHistoryComponent } from './test-history/test-history.component';
import { UnitTableComponent } from './unit-table/unit-table.component';

@Component({
    selector: 'epa-dashboard',
    standalone: true,
    imports: [
        CommonModule,
        DropdownItemComponent,
        QuestListComponent,
        MatButtonModule,
        MatIconModule,
        NgbModalModule,
        NgbDropdownModule,
        CourseUnitComponent,
        NgbNavModule,
        StatisticsComponent,
        TestHistoryComponent,
        UnitTableComponent,
        StatisticsComponent,
        TestHistoryComponent,
        UnitTableComponent,
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
    constructor(
        private readonly store: Store<DashboardStoreState>,
        private readonly modalService: NgbModal,
        private readonly config: NgbModalConfig
    ) {
        this.config.backdrop = 'static';
    }

    get course$() {
        return this.store.select(CourseSelectors.CourseData);
    }

    get courseId() {
        return this.store.select(CourseSelectors.CourseID);
    }

    get units$() {
        return this.store.select(CourseSelectors.CourseUnits);
    }

    openTestConfigModal(courseData: Course): void {
        const modalRef = this.modalService.open(TestConfigPopupComponent);
        modalRef.componentInstance.courseName = courseData.name;
        modalRef.componentInstance.courseId = courseData.id;
        modalRef.componentInstance.unitOptions = courseData.units.map(
            (unit) => ({
                title: unit.title,
                value: unit.id,
            })
        );
        modalRef.componentInstance.ngOnInit();
        // modalRef.result.then(
        //     (result) => {
        //         console.log(`Closed with: ${result}`);
        //     },
        //     (reason) => {
        //         console.log(`Dismissed ${reason}`);
        //     }
        // );
    }
}
