import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { Course } from '@libs/models';
import { CourseActions } from '../store/subject-management.actions';

export interface CourseEditDialogData {
  subjectId: string;
  course: Course | null;
}

@Component({
  selector: 'adm-course-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './course-edit.component.html',
  styleUrl: './course-edit.component.scss',
})
export class CourseEditComponent {
  readonly isEditMode: boolean;
  readonly form: ReturnType<FormBuilder['group']>;

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store,
    private readonly dialogRef: MatDialogRef<CourseEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CourseEditDialogData
  ) {
    this.isEditMode = !!this.data.course;
    this.form = this.fb.group({
      code: [this.data.course?.code || '', [Validators.required, Validators.maxLength(20)]],
      name: [this.data.course?.name || '', [Validators.required, Validators.maxLength(100)]],
      description: [this.data.course?.description || '', [Validators.maxLength(500)]],
      iconUrl: [this.data.course?.iconUrl || ''],
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.form.invalid) {
      return;
    }
    const value = this.form.getRawValue() as {
      code: string;
      name: string;
      description: string;
      iconUrl: string;
    };
    if (this.isEditMode && this.data.course) {
      this.store.dispatch(
        CourseActions.updateCourse({ id: String(this.data.course.id), course: value })
      );
    } else {
      this.store.dispatch(
        CourseActions.createCourse({ course: { ...value, subjectId: this.data.subjectId } })
      );
    }
    this.dialogRef.close();
  }
}
