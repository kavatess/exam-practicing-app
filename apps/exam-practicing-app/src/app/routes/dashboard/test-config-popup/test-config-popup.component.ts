/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TestDifficulties, TestProperties, TestTypes } from '@libs/models';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MultipleSelectComponent, Option } from '@libs/angular';
import {
    FormBuilder,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { APP_ROUTES } from '../../../app.routes';
import { TestConfigService } from './test-config.service';

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
        RouterModule,
    ],
    templateUrl: './test-config-popup.component.html',
    styleUrl: './test-config-popup.component.scss',
})
export class TestConfigPopupComponent {
    public readonly activeModal = inject(NgbActiveModal);
    private readonly fb = inject(FormBuilder);

    readonly TestTypes = TestTypes;
    readonly TestDifficulties = TestDifficulties;

    @Input()
    courseName = '';

    @Input()
    courseId = '';

    @Input()
    unitOptions: Option[] = [];

    readonly form = this.fb.group({
        [TestProperties.duration]: [
            3600000,
            [
                Validators.required,
                Validators.min(1800000),
                Validators.max(10800000),
            ],
        ],
        [TestProperties.difficulty]: [
            TestDifficulties.Normal,
            [Validators.required],
        ],
        [TestProperties.type]: [TestTypes.Standard, [Validators.required]],
        [TestProperties.numOfQuestions]: [20, [Validators.required]],
        [TestProperties.unitIds]: [[], [Validators.minLength(1)]],
        [TestProperties.questionTypes]: this.fb.array([
            this.fb.control(false),
            this.fb.control(false),
            this.fb.control(false),
        ]),
    });

    constructor(
        private readonly service: TestConfigService,
        private readonly router: Router
    ) {}

    createTest() {
        this.service.createTest(this.form.value as any).subscribe((test) => {
            this.router.navigate([APP_ROUTES.TEST, test.id]);
        });
        this.activeModal.close();
    }
}
