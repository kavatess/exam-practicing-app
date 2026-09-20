import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AdminExam, AdminMoldBlock } from '../../../shared/models/cms.model';
import { ExamDraft, MoldDraft, SectionDraft } from './exams.service';

export const ExamsActions = createActionGroup({
    source: 'Exams',
    events: {
        LoadExams: emptyProps(),
        LoadExamsSuccess: props<{ exams: AdminExam[] }>(),
        LoadExamsFailure: props<{ error: unknown }>(),

        SelectExam: props<{ examId: string }>(),

        SaveExam: props<{ examId: string | null; draft: ExamDraft }>(),
        SaveExamSuccess: props<{ exam: AdminExam; created: boolean }>(),
        SaveExamFailure: props<{ error: unknown }>(),

        RemoveExam: props<{ examId: string }>(),
        RemoveExamSuccess: props<{ examId: string }>(),
        RemoveExamFailure: props<{ error: unknown }>(),

        AddSection: props<{ examId: string; draft: SectionDraft }>(),
        AddSectionSuccess: props<{ exam: AdminExam }>(),
        AddSectionFailure: props<{ error: unknown }>(),

        RemoveSection: props<{ examId: string; sectionId: string }>(),
        RemoveSectionSuccess: props<{ exam: AdminExam }>(),
        RemoveSectionFailure: props<{ error: unknown }>(),

        SaveSectionScope: props<{
            examId: string;
            sectionId: string;
            unitIds: string[];
        }>(),
        SaveSectionScopeSuccess: props<{ exam: AdminExam }>(),
        SaveSectionScopeFailure: props<{ error: unknown }>(),

        SaveMold: props<{
            examId: string;
            moldId: string | null;
            draft: MoldDraft;
        }>(),
        SaveMoldSuccess: props<{ exam: AdminExam }>(),
        SaveMoldFailure: props<{ error: unknown }>(),

        RemoveMold: props<{ examId: string; moldId: string }>(),
        RemoveMoldSuccess: props<{ exam: AdminExam }>(),
        RemoveMoldFailure: props<{ error: unknown }>(),

        AddPage: props<{ examId: string; moldId: string }>(),
        AddPageSuccess: props<{ exam: AdminExam }>(),
        AddPageFailure: props<{ error: unknown }>(),

        AddBlock: props<{ examId: string; moldId: string; pageId: string }>(),
        AddBlockSuccess: props<{ exam: AdminExam }>(),
        AddBlockFailure: props<{ error: unknown }>(),

        RemoveBlock: props<{
            examId: string;
            moldId: string;
            pageId: string;
            blockId: string;
        }>(),
        RemoveBlockSuccess: props<{ exam: AdminExam }>(),
        RemoveBlockFailure: props<{ error: unknown }>(),

        PatchBlock: props<{
            examId: string;
            moldId: string;
            pageId: string;
            blockId: string;
            changes: Partial<AdminMoldBlock>;
        }>(),
        PatchBlockSuccess: props<{ exam: AdminExam }>(),
        PatchBlockFailure: props<{ error: unknown }>(),

        // Raised in reply to the subject feature deleting a unit, so sections
        // and mold blocks stop pointing at something that no longer exists.
        DropUnit: props<{ unitId: string }>(),
        DropUnitSuccess: props<{ exams: AdminExam[] }>(),
        DropUnitFailure: props<{ error: unknown }>(),
    },
});
