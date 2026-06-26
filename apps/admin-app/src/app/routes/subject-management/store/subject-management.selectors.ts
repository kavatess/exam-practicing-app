import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SubjectManagementState } from './subject-management.reducer';

export const subjectManagementFeatureKey = 'subjectManagement';

export const subjectManagementFeatureSelector =
  createFeatureSelector<SubjectManagementState>(subjectManagementFeatureKey);

export const selectAllSubjects = createSelector(
  subjectManagementFeatureSelector,
  (state) => state.subjects
);

export const selectSelectedSubjectId = createSelector(
  subjectManagementFeatureSelector,
  (state) => state.selectedSubjectId
);

export const selectSelectedSubject = createSelector(
  selectAllSubjects,
  selectSelectedSubjectId,
  (subjects, selectedSubjectId) =>
    subjects.find((subject) => subject.id === selectedSubjectId) || null
);

export const selectAllCourses = createSelector(
  subjectManagementFeatureSelector,
  (state) => state.courses
);

export const selectSelectedCourseId = createSelector(
  subjectManagementFeatureSelector,
  (state) => state.selectedCourseId
);

export const selectLoading = createSelector(
  subjectManagementFeatureSelector,
  (state) => state.loading
);

export const selectError = createSelector(
  subjectManagementFeatureSelector,
  (state) => state.error
);
