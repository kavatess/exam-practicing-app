import { createReducer, on } from '@ngrx/store';
import { Course, Subject } from '@libs/models';
import { CourseActions, SubjectActions } from './subject-management.actions';

export interface SubjectManagementState {
  subjects: Subject[];
  selectedSubjectId: string | null;
  courses: Course[];
  selectedCourseId: string | null;
  loading: boolean;
  error: string | null;
}

export const initialState: SubjectManagementState = {
  subjects: [],
  selectedSubjectId: null,
  courses: [],
  selectedCourseId: null,
  loading: false,
  error: null,
};

export const subjectManagementReducer = createReducer(
  initialState,

  on(SubjectActions.loadSubjects, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SubjectActions.loadSubjectsSuccess, (state, { subjects }) => ({
    ...state,
    subjects,
    loading: false,
  })),
  on(SubjectActions.loadSubjectsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(SubjectActions.createSubject, (state) => ({ ...state, loading: true, error: null })),
  on(SubjectActions.createSubjectFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(SubjectActions.updateSubject, (state) => ({ ...state, loading: true, error: null })),
  on(SubjectActions.updateSubjectFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(SubjectActions.deleteSubject, (state) => ({ ...state, loading: true, error: null })),
  on(SubjectActions.deleteSubjectFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(SubjectActions.selectSubject, (state, { id }) => ({
    ...state,
    selectedSubjectId: id,
    courses: [],
    selectedCourseId: null,
  })),

  on(CourseActions.loadCourses, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CourseActions.loadCoursesSuccess, (state, { courses }) => ({
    ...state,
    courses,
    loading: false,
  })),
  on(CourseActions.loadCoursesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(CourseActions.createCourse, (state) => ({ ...state, loading: true, error: null })),
  on(CourseActions.createCourseFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(CourseActions.updateCourse, (state) => ({ ...state, loading: true, error: null })),
  on(CourseActions.updateCourseFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(CourseActions.deleteCourse, (state) => ({ ...state, loading: true, error: null })),
  on(CourseActions.deleteCourseFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(CourseActions.selectCourse, (state, { id }) => ({
    ...state,
    selectedCourseId: id,
  }))
);
