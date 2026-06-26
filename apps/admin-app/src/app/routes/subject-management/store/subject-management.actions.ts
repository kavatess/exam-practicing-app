import { Course, Subject } from '@libs/models';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const SubjectActions = createActionGroup({
  source: 'Subject',
  events: {
    LoadSubjects: emptyProps(),
    LoadSubjectsSuccess: props<{ subjects: Subject[] }>(),
    LoadSubjectsFailure: props<{ error: string }>(),

    CreateSubject: props<{ subject: Partial<Subject> }>(),
    CreateSubjectSuccess: props<{ subject: Subject }>(),
    CreateSubjectFailure: props<{ error: string }>(),

    UpdateSubject: props<{ id: string; subject: Partial<Subject> }>(),
    UpdateSubjectSuccess: props<{ subject: Subject }>(),
    UpdateSubjectFailure: props<{ error: string }>(),

    DeleteSubject: props<{ id: string }>(),
    DeleteSubjectSuccess: props<{ id: string }>(),
    DeleteSubjectFailure: props<{ error: string }>(),

    SelectSubject: props<{ id: string | null }>(),
  },
});

export const CourseActions = createActionGroup({
  source: 'Course',
  events: {
    LoadCourses: props<{ subjectId: string }>(),
    LoadCoursesSuccess: props<{ courses: Course[] }>(),
    LoadCoursesFailure: props<{ error: string }>(),

    CreateCourse: props<{ course: Partial<Course> }>(),
    CreateCourseSuccess: props<{ course: Course }>(),
    CreateCourseFailure: props<{ error: string }>(),

    UpdateCourse: props<{ id: string; course: Partial<Course> }>(),
    UpdateCourseSuccess: props<{ course: Course }>(),
    UpdateCourseFailure: props<{ error: string }>(),

    DeleteCourse: props<{ id: string }>(),
    DeleteCourseSuccess: props<{ id: string }>(),
    DeleteCourseFailure: props<{ error: string }>(),

    SelectCourse: props<{ id: string | null }>(),
  },
});
