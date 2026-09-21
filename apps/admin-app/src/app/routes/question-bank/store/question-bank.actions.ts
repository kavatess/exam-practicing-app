import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
    AdminQuestion,
    QuestionFilter,
    QuestionMatch,
    QuestionScope,
} from '../../../shared/models/cms.model';
import { QuestionDraft } from './question-bank.service';

export const QuestionBankActions = createActionGroup({
    source: 'Question Bank',
    events: {
        // Re-run the current filter against the bank.
        LoadQuestions: emptyProps(),
        LoadQuestionsSuccess: props<{
            questions: AdminQuestion[];
            matchCount: number;
            bankTotal: number;
        }>(),
        LoadQuestionsFailure: props<{ error: unknown }>(),

        // Filter changes are separate actions rather than one patch so the
        // cascades stay explicit: a subject change clears units and level, a
        // unit change clears sub-units.
        SelectSubject: props<{ subjectId: string | null }>(),
        ToggleUnit: props<{ unitId: string }>(),
        ToggleSubUnit: props<{ subUnitId: string }>(),
        SelectType: props<{ qType: QuestionFilter['qType'] }>(),
        SelectDifficulty: props<{
            difficulty: QuestionFilter['difficulty'];
        }>(),
        ToggleLevel: props<{ level: string }>(),
        Search: props<{ search: string }>(),
        ResetFilters: emptyProps(),

        /** Arriving from a mold block: adopt its criteria wholesale. */
        ApplyScope: props<{ scope: QuestionScope }>(),
        ClearScope: emptyProps(),

        LoadMatches: props<{ questionId: string }>(),
        LoadMatchesSuccess: props<{
            questionId: string;
            matches: QuestionMatch[];
        }>(),
        LoadMatchesFailure: props<{ error: unknown }>(),

        SaveQuestion: props<{
            questionId: string | null;
            draft: QuestionDraft;
        }>(),
        SaveQuestionSuccess: props<{ question: AdminQuestion }>(),
        SaveQuestionFailure: props<{ error: unknown }>(),

        RemoveQuestion: props<{ questionId: string }>(),
        RemoveQuestionSuccess: props<{ questionId: string }>(),
        RemoveQuestionFailure: props<{ error: unknown }>(),
    },
});
