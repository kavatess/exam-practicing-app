import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AdminSubject } from '../../../shared/models/cms.model';
import { SubjectDraft, UnitDraft } from './subject-management.service';

export const SubjectManagementActions = createActionGroup({
    source: 'Subject Management',
    events: {
        LoadSubjects: emptyProps(),
        LoadSubjectsSuccess: props<{ subjects: AdminSubject[] }>(),
        LoadSubjectsFailure: props<{ error: unknown }>(),

        SelectSubject: props<{ subjectId: string }>(),

        CreateSubject: props<{ draft: SubjectDraft }>(),
        CreateSubjectSuccess: props<{ subject: AdminSubject }>(),
        CreateSubjectFailure: props<{ error: unknown }>(),

        UpdateSubject: props<{ subjectId: string; draft: SubjectDraft }>(),
        UpdateSubjectSuccess: props<{ subject: AdminSubject }>(),
        UpdateSubjectFailure: props<{ error: unknown }>(),

        SaveUnit: props<{
            subjectId: string;
            unitId: string | null;
            draft: UnitDraft;
        }>(),
        SaveUnitSuccess: props<{ subject: AdminSubject }>(),
        SaveUnitFailure: props<{ error: unknown }>(),

        RemoveUnit: props<{ subjectId: string; unitId: string }>(),
        // `unitId` rides along so the exams feature can drop the unit from any
        // section that referenced it.
        RemoveUnitSuccess: props<{ subject: AdminSubject; unitId: string }>(),
        RemoveUnitFailure: props<{ error: unknown }>(),

        RemoveSubUnit: props<{
            subjectId: string;
            unitId: string;
            subUnitId: string;
        }>(),
        RemoveSubUnitSuccess: props<{ subject: AdminSubject }>(),
        RemoveSubUnitFailure: props<{ error: unknown }>(),
    },
});
