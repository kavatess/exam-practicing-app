import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SubjectManagementState } from './subject-management.reducer';

export const subjectManagementStoreKey = 'subjectManagement';

export const subjectManagementFeatureSelector =
    createFeatureSelector<SubjectManagementState>(subjectManagementStoreKey);

export const SubjectManagementSelectors = {
    Subjects: createSelector(
        subjectManagementFeatureSelector,
        (state: SubjectManagementState) => state.subjects
    ),
    SelectedSubjectId: createSelector(
        subjectManagementFeatureSelector,
        (state: SubjectManagementState) => state.selectedSubjectId
    ),
    SelectedSubject: createSelector(
        subjectManagementFeatureSelector,
        (state: SubjectManagementState) =>
            state.subjects.find(
                (subject) => subject.id === state.selectedSubjectId
            ) ?? null
    ),
    Loading: createSelector(
        subjectManagementFeatureSelector,
        (state: SubjectManagementState) => state.loading
    ),
    Error: createSelector(
        subjectManagementFeatureSelector,
        (state: SubjectManagementState) => state.error
    ),
};
