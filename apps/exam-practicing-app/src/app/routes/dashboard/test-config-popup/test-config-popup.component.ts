import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal, NgbTimeAdapter } from '@ng-bootstrap/ng-bootstrap';
import {
    TestDifficulties,
    TestProperties,
    TestStructureProperties,
    TestTypes,
} from '@libs/models';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MultipleSelectComponent, NgbTimepickerAdapter } from '@libs/angular';
import {
    FormBuilder,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { DashboardStoreState } from '../store/dashboard.reducer';
import { CourseSelectors } from '../store/dashboard.selectors';
import { map } from 'rxjs';

@Component({
    selector: 'epa-test-config-popup',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatSlideToggleModule,
        MultipleSelectComponent,
    ],
    templateUrl: './test-config-popup.component.html',
    styleUrl: './test-config-popup.component.scss',
    providers: [{ provide: NgbTimeAdapter, useClass: NgbTimepickerAdapter }],
})
export class TestConfigPopupComponent {
    private readonly store = inject(Store<DashboardStoreState>);
    private readonly fb = inject(FormBuilder);
    public readonly activeModal = inject(NgbActiveModal);

    readonly TestTypes = TestTypes;
    readonly TestDifficulties = TestDifficulties;
    readonly course$ = this.store.select(CourseSelectors.CourseData);
    readonly unitOptions$ = this.store
        .select(CourseSelectors.CourseUnits)
        .pipe(
            map((units) =>
                units.map((unit) => ({ value: unit.id, title: unit.title }))
            )
        );

    readonly form = this.fb.group({
        [TestProperties.duration]: [
            3600000,
            [
                Validators.required,
                Validators.min(1800000),
                Validators.max(10800000),
            ],
        ],
        [TestStructureProperties.difficulty]: [
            TestDifficulties.Normal,
            [Validators.required],
        ],
        [TestStructureProperties.type]: [
            TestTypes.Standard,
            [Validators.required],
        ],
        [TestProperties.numOfQuestions]: [20, [Validators.required]],
        [TestStructureProperties.unitIds]: [[], [Validators.minLength(1)]],
        [TestStructureProperties.questionTypes]: this.fb.array([
            this.fb.control(false),
            this.fb.control(false),
            this.fb.control(false),
        ]),
    });
}
