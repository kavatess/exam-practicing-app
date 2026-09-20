import { Component, inject, OnInit } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import {
    AdminExam,
    AdminMold,
    CmsOverlay,
    ExamSection,
} from '../../shared/models/cms.model';
import { SubjectManagementActions } from '../subject-management/store/subject-management.actions';
import { SubjectManagementSelectors } from '../subject-management/store/subject-management.selectors';
import {
    ExamDetailComponent,
    MoldBlockPatch,
    MoldBlockRef,
} from './components/exam-detail/exam-detail.component';
import { ExamYearListComponent } from './components/exam-year-list/exam-year-list.component';
import { ExamModalComponent } from './components/modals/exam-modal/exam-modal.component';
import { MoldModalComponent } from './components/modals/mold-modal/mold-modal.component';
import { ScopeModalComponent } from './components/modals/scope-modal/scope-modal.component';
import { SectionModalComponent } from './components/modals/section-modal/section-modal.component';
import { ExamsActions } from './store/exams.actions';
import { ExamsSelectors } from './store/exams.selectors';
import { ExamDraft, MoldDraft, SectionDraft } from './store/exams.service';

@Component({
    selector: 'adm-exams',
    standalone: true,
    imports: [
        ExamYearListComponent,
        ExamDetailComponent,
        ExamModalComponent,
        SectionModalComponent,
        ScopeModalComponent,
        MoldModalComponent,
    ],
    templateUrl: './exams.component.html',
    styleUrl: './exams.component.scss',
})
export class ExamsComponent implements OnInit {
    private readonly store = inject(Store);

    readonly exams = this.store.selectSignal(ExamsSelectors.Exams);
    readonly selectedExam = this.store.selectSignal(
        ExamsSelectors.SelectedExam
    );
    readonly selectedExamId = this.store.selectSignal(
        ExamsSelectors.SelectedExamId
    );
    // Sections are scoped to subject units, so this page reads the taxonomy
    // the subject feature owns and hands it down to the presentational parts.
    readonly subjects = this.store.selectSignal(
        SubjectManagementSelectors.Subjects
    );

    // Overlay bookkeeping is view state, so it stays with the component.
    overlay: CmsOverlay = null;
    editingExam: AdminExam | null = null;
    editingMold: AdminMold | null = null;
    editingSection: ExamSection | null = null;

    ngOnInit(): void {
        this.store.dispatch(ExamsActions.loadExams());
        if (!this.subjects().length) {
            this.store.dispatch(SubjectManagementActions.loadSubjects());
        }
    }

    selectExam(examId: string): void {
        this.store.dispatch(ExamsActions.selectExam({ examId }));
        this.closeOverlay();
    }

    closeOverlay(): void {
        this.overlay = null;
        this.editingExam = null;
        this.editingMold = null;
        this.editingSection = null;
    }

    openExamModal(exam: AdminExam | null): void {
        this.editingExam = exam;
        this.overlay = 'exam';
    }

    openSectionModal(): void {
        this.overlay = 'section';
    }

    openScopeModal(section: ExamSection): void {
        this.editingSection = section;
        this.overlay = 'scope';
    }

    openMoldModal(mold: AdminMold | null): void {
        this.editingMold = mold;
        this.overlay = 'mold';
    }

    saveExam(draft: ExamDraft): void {
        this.store.dispatch(
            ExamsActions.saveExam({
                examId: this.editingExam?.id ?? null,
                draft,
            })
        );
        this.closeOverlay();
    }

    removeExam(): void {
        const examId = this.selectedExamId();
        if (examId) {
            this.store.dispatch(ExamsActions.removeExam({ examId }));
        }
    }

    addSection(draft: SectionDraft): void {
        this.dispatchForExam((examId) =>
            ExamsActions.addSection({ examId, draft })
        );
        this.closeOverlay();
    }

    removeSection(section: ExamSection): void {
        this.dispatchForExam((examId) =>
            ExamsActions.removeSection({ examId, sectionId: section.id })
        );
    }

    saveScope(unitIds: string[]): void {
        const section = this.editingSection;
        if (section) {
            this.dispatchForExam((examId) =>
                ExamsActions.saveSectionScope({
                    examId,
                    sectionId: section.id,
                    unitIds,
                })
            );
        }
        this.closeOverlay();
    }

    saveMold(draft: MoldDraft): void {
        this.dispatchForExam((examId) =>
            ExamsActions.saveMold({
                examId,
                moldId: this.editingMold?.id ?? null,
                draft,
            })
        );
        this.closeOverlay();
    }

    removeMold(mold: AdminMold): void {
        this.dispatchForExam((examId) =>
            ExamsActions.removeMold({ examId, moldId: mold.id })
        );
    }

    addPage(moldId: string): void {
        this.dispatchForExam((examId) =>
            ExamsActions.addPage({ examId, moldId })
        );
    }

    addBlock({ moldId, pageId }: { moldId: string; pageId: string }): void {
        this.dispatchForExam((examId) =>
            ExamsActions.addBlock({ examId, moldId, pageId })
        );
    }

    removeBlock({ moldId, pageId, blockId }: MoldBlockRef): void {
        this.dispatchForExam((examId) =>
            ExamsActions.removeBlock({ examId, moldId, pageId, blockId })
        );
    }

    patchBlock({ moldId, pageId, blockId, changes }: MoldBlockPatch): void {
        this.dispatchForExam((examId) =>
            ExamsActions.patchBlock({
                examId,
                moldId,
                pageId,
                blockId,
                changes,
            })
        );
    }

    /** Every write below targets the exam on screen. */
    private dispatchForExam(build: (examId: string) => Action): void {
        const examId = this.selectedExamId();
        if (examId) {
            this.store.dispatch(build(examId));
        }
    }
}
