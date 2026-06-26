import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { Subject } from '@libs/models';
import { SubjectActions } from '../store/subject-management.actions';

@Component({
  selector: 'adm-subject-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './subject-edit.component.html',
  styleUrl: './subject-edit.component.scss',
})
export class SubjectEditComponent {
  readonly isEditMode = !!this.data;

  readonly form = this.fb.group({
    name: [this.data?.name || '', [Validators.required, Validators.maxLength(100)]],
    description: [this.data?.description || '', [Validators.maxLength(500)]],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store,
    private readonly dialogRef: MatDialogRef<SubjectEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Subject | null
  ) {}

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.form.invalid) {
      return;
    }
    const value = this.form.getRawValue() as { name: string; description: string };
    if (this.isEditMode && this.data) {
      this.store.dispatch(SubjectActions.updateSubject({ id: String(this.data.id), subject: value }));
    } else {
      this.store.dispatch(SubjectActions.createSubject({ subject: value }));
    }
    this.dialogRef.close();
  }
}
