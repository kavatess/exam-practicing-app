import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Course, Subject } from '@libs/models';
import { Observable, Subscription } from 'rxjs';
import { CourseEditComponent, CourseEditDialogData } from './course-edit/course-edit.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { CourseActions, SubjectActions } from './store/subject-management.actions';
import {
  selectAllCourses,
  selectAllSubjects,
  selectError,
  selectLoading,
  selectSelectedSubject,
  selectSelectedSubjectId,
} from './store/subject-management.selectors';
import { SubjectEditComponent } from './subject-edit/subject-edit.component';

@Component({
  selector: 'adm-subject-management',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './subject-management.component.html',
  styleUrl: './subject-management.component.scss',
})
export class SubjectManagementComponent implements OnInit {
  readonly subjects$: Observable<Subject[]>;
  readonly selectedSubjectId$: Observable<string | null>;
  readonly selectedSubject$: Observable<Subject | null>;
  readonly courses$: Observable<Course[]>;
  readonly loading$: Observable<boolean>;

  readonly courseColumns = ['code', 'name', 'description', 'actions'];

  private errorSub?: Subscription;
  private selectedSubjectSub?: Subscription;

  constructor(
    private readonly store: Store,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar
  ) {
    this.subjects$ = this.store.select(selectAllSubjects);
    this.selectedSubjectId$ = this.store.select(selectSelectedSubjectId);
    this.selectedSubject$ = this.store.select(selectSelectedSubject);
    this.courses$ = this.store.select(selectAllCourses);
    this.loading$ = this.store.select(selectLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(SubjectActions.loadSubjects());

    this.errorSub = this.store.select(selectError).subscribe((error) => {
      if (error) {
        this.snackBar.open(error, 'Dismiss', { duration: 4000 });
      }
    });

    this.selectedSubjectSub = this.selectedSubjectId$.subscribe((subjectId) => {
      if (subjectId) {
        this.store.dispatch(CourseActions.loadCourses({ subjectId }));
      }
    });
  }

  ngOnDestroy(): void {
    this.errorSub?.unsubscribe();
    this.selectedSubjectSub?.unsubscribe();
  }

  idOf(value: string | number | undefined): string {
    return String(value ?? '');
  }

  selectSubject(subject: Subject): void {
    this.store.dispatch(SubjectActions.selectSubject({ id: String(subject.id) }));
  }

  truncate(text: string, length = 60): string {
    if (!text) return '';
    return text.length > length ? `${text.slice(0, length)}...` : text;
  }

  openNewSubjectDialog(): void {
    const dialogRef = this.dialog.open(SubjectEditComponent, { data: null, width: '480px' });
    dialogRef.afterClosed().subscribe(() => {
      this.snackBar.open('Subject saved', 'Dismiss', { duration: 3000 });
    });
  }

  openNewCourseDialog(subjectId: string): void {
    const data: CourseEditDialogData = { subjectId, course: null };
    const dialogRef = this.dialog.open(CourseEditComponent, { data, width: '480px' });
    dialogRef.afterClosed().subscribe(() => {
      this.snackBar.open('Course saved', 'Dismiss', { duration: 3000 });
    });
  }

  openEditCourseDialog(subjectId: string, course: Course): void {
    const data: CourseEditDialogData = { subjectId, course };
    const dialogRef = this.dialog.open(CourseEditComponent, { data, width: '480px' });
    dialogRef.afterClosed().subscribe(() => {
      this.snackBar.open('Course saved', 'Dismiss', { duration: 3000 });
    });
  }

  deleteCourse(course: Course): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Course',
        message: `Are you sure you want to delete "${course.name}"?`,
      },
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.store.dispatch(CourseActions.deleteCourse({ id: String(course.id) }));
      }
    });
  }
}
