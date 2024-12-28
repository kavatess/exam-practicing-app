import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
    Course,
    TestDifficulties,
    TestProperties,
    TestStructureProperties,
    TestTypes,
} from '@libs/models';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MultipleSelectComponent } from '@libs/angular';
import {
    FormBuilder,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';

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
})
export class TestConfigPopupComponent {
    private readonly fb = inject(FormBuilder);
    public readonly activeModal = inject(NgbActiveModal);

    readonly TestTypes = TestTypes;
    readonly TestDifficulties = TestDifficulties;

    @Input()
    course: Course = null;

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

    get unitOptions() {
        return (
            this.course?.units.map((unit) => ({
                value: unit.id,
                title: unit.title,
            })) || []
        );
    }
}
