import { createReducer, on } from '@ngrx/store';
import {
    AdminQuestion,
    EMPTY_QUESTION_FILTER,
    QuestionFilter,
    QuestionMatch,
    QuestionScope,
} from '../../../shared/models/cms.model';
import { QuestionBankActions } from './question-bank.actions';

export interface QuestionBankState {
    questions: AdminQuestion[];
    filter: QuestionFilter;
    /** Set when the page was opened from a mold block's deep-link. */
    scope: QuestionScope | null;
    matchCount: number;
    bankTotal: number;
    /** Blocks each question matches, fetched when its pill is opened. */
    matches: Record<string, QuestionMatch[]>;
    loading: boolean;
    error: unknown;
}

export const initialState: QuestionBankState = {
    questions: [],
    filter: EMPTY_QUESTION_FILTER,
    scope: null,
    matchCount: 0,
    bankTotal: 0,
    matches: {},
    loading: false,
    error: null,
};

export const questionBankReducer = createReducer(
    initialState,

    on(QuestionBankActions.loadQuestions, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(
        QuestionBankActions.loadQuestionsSuccess,
        (state, { questions, matchCount, bankTotal }) => ({
            ...state,
            questions,
            matchCount,
            bankTotal,
            loading: false,
        })
    ),

    // Narrowing by hand means the view is no longer what the block asked for.
    on(QuestionBankActions.selectSubject, (state, { subjectId }) =>
        narrow(state, {
            subjectId,
            unitIds: [],
            subUnitIds: [],
            level: null,
        })
    ),
    on(QuestionBankActions.toggleUnit, (state, { unitId }) =>
        narrow(state, {
            unitIds: toggle(state.filter.unitIds, unitId),
            subUnitIds: [],
        })
    ),
    on(QuestionBankActions.toggleSubUnit, (state, { subUnitId }) =>
        narrow(state, {
            subUnitIds: toggle(state.filter.subUnitIds, subUnitId),
        })
    ),
    on(QuestionBankActions.selectType, (state, { qType }) =>
        narrow(state, { qType })
    ),
    on(QuestionBankActions.selectDifficulty, (state, { difficulty }) =>
        narrow(state, { difficulty })
    ),
    on(QuestionBankActions.toggleLevel, (state, { level }) =>
        narrow(state, {
            level: state.filter.level === level ? null : level,
        })
    ),
    // Typing in the search box refines the block's criteria rather than
    // replacing them, so the scope banner stays put.
    on(QuestionBankActions.search, (state, { search }) => ({
        ...state,
        filter: { ...state.filter, search },
    })),

    on(QuestionBankActions.resetFilters, (state) => ({
        ...state,
        filter: EMPTY_QUESTION_FILTER,
        scope: null,
    })),

    on(QuestionBankActions.applyScope, (state, { scope }) => ({
        ...state,
        scope,
        filter: { ...scope.filter },
    })),
    on(QuestionBankActions.clearScope, (state) => ({
        ...state,
        scope: null,
        filter: EMPTY_QUESTION_FILTER,
    })),

    on(
        QuestionBankActions.loadMatchesSuccess,
        (state, { questionId, matches }) => ({
            ...state,
            matches: { ...state.matches, [questionId]: matches },
        })
    ),

    on(QuestionBankActions.saveQuestionSuccess, (state, { question }) => ({
        ...state,
        questions: state.questions.some((item) => item.id === question.id)
            ? state.questions.map((item) =>
                  item.id === question.id ? question : item
              )
            : [question, ...state.questions],
    })),

    on(QuestionBankActions.removeQuestionSuccess, (state, { questionId }) => ({
        ...state,
        questions: state.questions.filter(
            (question) => question.id !== questionId
        ),
    })),

    on(
        QuestionBankActions.loadQuestionsFailure,
        QuestionBankActions.loadMatchesFailure,
        QuestionBankActions.saveQuestionFailure,
        QuestionBankActions.removeQuestionFailure,
        (state, { error }) => ({ ...state, loading: false, error })
    )
);

/**
 * Applies a filter change. Touching a filter by hand means the view no longer
 * answers the block that sent the user here, so the scope banner clears.
 */
function narrow(
    state: QuestionBankState,
    patch: Partial<QuestionFilter>
): QuestionBankState {
    return {
        ...state,
        scope: null,
        filter: { ...state.filter, ...patch },
    };
}

function toggle(list: string[], value: string): string[] {
    return list.includes(value)
        ? list.filter((item) => item !== value)
        : [...list, value];
}
