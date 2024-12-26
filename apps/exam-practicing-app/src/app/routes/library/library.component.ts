import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { LibraryStoreState } from './store/library.reducer';
import { LibraryActions } from './store/library.actions';
import { LibrarySelectors } from './store/library.selectors';
import { CourseCardComponent } from './course-card/course-card.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'epa-library',
    standalone: true,
    imports: [
        CommonModule,
        CourseCardComponent,
        CourseDetailsComponent,
        RouterModule,
    ],
    templateUrl: './library.component.html',
    styleUrl: './library.component.scss',
})
export class LibraryComponent implements OnInit {
    constructor(private readonly store: Store<LibraryStoreState>) {}

    get courses$() {
        return this.store.select(LibrarySelectors.CourseList);
    }

    ngOnInit(): void {
        this.store.dispatch(LibraryActions.getCourses());
    }
}
