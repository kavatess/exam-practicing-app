import { createReducer, on } from '@ngrx/store';
import { AdminExam } from '../../../shared/models/cms.model';
import { ExamsActions } from './exams.actions';

export interface ExamsState {
    exams: AdminExam[];
    selectedExamId: string | null;
    loading: boolean;
    error: unknown;
}

export const initialState: ExamsState = {
    exams: [],
    selectedExamId: null,
    loading: false,
    error: null,
};

export const examsReducer = createReducer(
    initialState,

    on(ExamsActions.loadExams, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(
        ExamsActions.loadExamsSuccess,
        (state, { exams }) => ({
            ...state,
            exams,
            selectedExamId: keepOrPickFirst(exams, state.selectedExamId),
            loading: false,
        })
    ),
    on(ExamsActions.dropUnitSuccess, (state, { exams }) => ({
        ...state,
        exams,
        selectedExamId: keepOrPickFirst(exams, state.selectedExamId),
    })),

    on(ExamsActions.selectExam, (state, { examId }) => ({
        ...state,
        selectedExamId: examId,
    })),

    on(ExamsActions.saveExamSuccess, (state, { exam, created }) => ({
        ...state,
        exams: created
            ? [...state.exams, exam]
            : state.exams.map((item) => (item.id === exam.id ? exam : item)),
        selectedExamId: created ? exam.id : state.selectedExamId,
    })),

    on(ExamsActions.removeExamSuccess, (state, { examId }) => {
        const exams = state.exams.filter((exam) => exam.id !== examId);
        return {
            ...state,
            exams,
            selectedExamId: keepOrPickFirst(exams, state.selectedExamId),
        };
    }),

    // Section, mold, page and block writes all answer with the whole updated
    // exam, so one handler covers every one of them.
    on(
        ExamsActions.addSectionSuccess,
        ExamsActions.removeSectionSuccess,
        ExamsActions.saveSectionScopeSuccess,
        ExamsActions.saveMoldSuccess,
        ExamsActions.removeMoldSuccess,
        ExamsActions.addPageSuccess,
        ExamsActions.addBlockSuccess,
        ExamsActions.removeBlockSuccess,
        ExamsActions.patchBlockSuccess,
        (state, { exam }) => ({
            ...state,
            exams: state.exams.map((item) =>
                item.id === exam.id ? exam : item
            ),
        })
    ),

    on(
        ExamsActions.loadExamsFailure,
        ExamsActions.saveExamFailure,
        ExamsActions.removeExamFailure,
        ExamsActions.addSectionFailure,
        ExamsActions.removeSectionFailure,
        ExamsActions.saveSectionScopeFailure,
        ExamsActions.saveMoldFailure,
        ExamsActions.removeMoldFailure,
        ExamsActions.addPageFailure,
        ExamsActions.addBlockFailure,
        ExamsActions.removeBlockFailure,
        ExamsActions.patchBlockFailure,
        ExamsActions.dropUnitFailure,
        (state, { error }) => ({ ...state, loading: false, error })
    )
);

/** Holds the current selection across a reload, falling back to the first row. */
function keepOrPickFirst(
    exams: AdminExam[],
    selectedId: string | null
): string | null {
    const stillThere = exams.some((exam) => exam.id === selectedId);
    return stillThere ? selectedId : exams[0]?.id ?? null;
}
