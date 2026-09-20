import { createReducer, on } from '@ngrx/store';
import { AdminSubject } from '../../../shared/models/cms.model';
import { SubjectManagementActions } from './subject-management.actions';

export interface SubjectManagementState {
    subjects: AdminSubject[];
    selectedSubjectId: string | null;
    loading: boolean;
    error: unknown;
}

export const initialState: SubjectManagementState = {
    subjects: [],
    selectedSubjectId: null,
    loading: false,
    error: null,
};

export const subjectManagementReducer = createReducer(
    initialState,

    on(SubjectManagementActions.loadSubjects, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(SubjectManagementActions.loadSubjectsSuccess, (state, { subjects }) => ({
        ...state,
        subjects,
        selectedSubjectId: keepOrPickFirst(subjects, state.selectedSubjectId),
        loading: false,
    })),

    on(SubjectManagementActions.selectSubject, (state, { subjectId }) => ({
        ...state,
        selectedSubjectId: subjectId,
    })),

    on(SubjectManagementActions.createSubjectSuccess, (state, { subject }) => ({
        ...state,
        subjects: [...state.subjects, subject],
        selectedSubjectId: subject.id,
    })),

    // Every other write answers with the whole updated subject, so one handler
    // covers renames, unit edits and deletions alike.
    on(
        SubjectManagementActions.updateSubjectSuccess,
        SubjectManagementActions.saveUnitSuccess,
        SubjectManagementActions.removeUnitSuccess,
        SubjectManagementActions.removeSubUnitSuccess,
        (state, { subject }) => ({
            ...state,
            subjects: state.subjects.map((item) =>
                item.id === subject.id ? subject : item
            ),
        })
    ),

    on(
        SubjectManagementActions.loadSubjectsFailure,
        SubjectManagementActions.createSubjectFailure,
        SubjectManagementActions.updateSubjectFailure,
        SubjectManagementActions.saveUnitFailure,
        SubjectManagementActions.removeUnitFailure,
        SubjectManagementActions.removeSubUnitFailure,
        (state, { error }) => ({ ...state, loading: false, error })
    )
);

/** Holds the current selection across a reload, falling back to the first row. */
function keepOrPickFirst(
    subjects: AdminSubject[],
    selectedId: string | null
): string | null {
    const stillThere = subjects.some((subject) => subject.id === selectedId);
    return stillThere ? selectedId : subjects[0]?.id ?? null;
}
