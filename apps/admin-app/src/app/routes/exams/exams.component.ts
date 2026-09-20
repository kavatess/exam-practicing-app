import { Component, inject, OnInit } from '@angular/core';
import {
    MoldStatuses,
    MoldTypes,
    QuestionDifficulties,
    QuestionTypes,
} from '@libs/models';
import {
    AdminExam,
    AdminMold,
    AdminMoldPage,
    CmsOverlay,
    ExamSection,
    ExamTypes,
} from '../../shared/models/cms.model';
import { CmsDataService } from '../../shared/services/cms-data.service';
import {
    ExamDetailComponent,
    MoldBlockPatch,
    MoldBlockRef,
} from './components/exam-detail/exam-detail.component';
import { ExamYearListComponent } from './components/exam-year-list/exam-year-list.component';
import { ExamDraft, ExamModalComponent } from './components/modals/exam-modal/exam-modal.component';
import { MoldDraft, MoldModalComponent } from './components/modals/mold-modal/mold-modal.component';
import { ScopeModalComponent } from './components/modals/scope-modal/scope-modal.component';
import { SectionDraft, SectionModalComponent } from './components/modals/section-modal/section-modal.component';

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
    private readonly data = inject(CmsDataService);

    readonly exams = this.data.exams;
    readonly subjects = this.data.subjects;

    selectedExamId: string | null = null;
    overlay: CmsOverlay = null;
    editingExam: AdminExam | null = null;
    editingMold: AdminMold | null = null;
    editingSection: ExamSection | null = null;

    ngOnInit(): void {
        this.selectedExamId = this.exams[0]?.id ?? null;
    }

    get selectedExam(): AdminExam | null {
        return this.exams.find((exam) => exam.id === this.selectedExamId) ?? null;
    }

    selectExam(examId: string): void {
        this.selectedExamId = examId;
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
        const exam = this.editingExam ?? this.createExam();
        exam.name = draft.name || 'Untitled exam';
        exam.code = draft.code;
        exam.year = Number(draft.year) || new Date().getFullYear();
        exam.examType = draft.examType;
        exam.org = draft.org;
        exam.description = draft.description;
        exam.updatedAt = new Date().toISOString();

        if (!this.editingExam) {
            this.exams.push(exam);
            this.selectedExamId = exam.id;
        }
        this.closeOverlay();
    }

    removeExam(): void {
        const exam = this.selectedExam;
        if (!exam) {
            return;
        }
        const index = this.exams.indexOf(exam);
        this.exams.splice(index, 1);
        this.selectedExamId = this.exams[0]?.id ?? null;
    }

    addSection(draft: SectionDraft): void {
        const exam = this.selectedExam;
        if (
            !exam ||
            exam.sections.some((s) => s.subjectId === draft.subjectId)
        ) {
            this.closeOverlay();
            return;
        }
        exam.sections.push({
            id: this.data.nextId('section'),
            examId: exam.id,
            subjectId: draft.subjectId,
            label: draft.label,
            unitIds: [...draft.unitIds],
        });
        exam.updatedAt = new Date().toISOString();
        this.closeOverlay();
    }

    removeSection(section: ExamSection): void {
        const exam = this.selectedExam;
        if (!exam) {
            return;
        }
        exam.sections = exam.sections.filter((item) => item.id !== section.id);
        for (const mold of exam.molds) {
            for (const page of mold.pages) {
                page.blocks = page.blocks.filter(
                    (block) => block.sectionId !== section.id
                );
            }
        }
        exam.updatedAt = new Date().toISOString();
    }

    saveScope(unitIds: string[]): void {
        const exam = this.selectedExam;
        const section = this.editingSection;
        if (!exam || !section) {
            return;
        }
        section.unitIds = [...unitIds];
        exam.updatedAt = new Date().toISOString();
        this.dropBlocksOutsideScope(exam);
        this.closeOverlay();
    }

    saveMold(draft: MoldDraft): void {
        const exam = this.selectedExam;
        if (!exam) {
            return;
        }
        const mold = this.editingMold ?? this.createMold(exam.id);
        mold.name = draft.name || 'Untitled mold';
        mold.type = draft.type;
        mold.duration = Number(draft.duration) || 0;
        mold.numOfQuestions = Number(draft.numOfQuestions) || 0;
        mold.passingScore = Number(draft.passingScore) || 0;
        mold.status = draft.status;

        if (!this.editingMold) {
            exam.molds.push(mold);
        }
        this.closeOverlay();
    }

    removeMold(mold: AdminMold): void {
        const exam = this.selectedExam;
        if (!exam) {
            return;
        }
        exam.molds = exam.molds.filter((item) => item.id !== mold.id);
    }

    addPage(moldId: string): void {
        const mold = this.findMold(moldId);
        if (!mold) {
            return;
        }
        const page: AdminMoldPage = {
            id: this.data.nextId('page'),
            moldId: mold.id,
            name: `Phần ${mold.pages.length + 1}`,
            description: '',
            blocks: [],
        };
        mold.pages.push(page);
    }

    addBlock({ moldId, pageId }: { moldId: string; pageId: string }): void {
        const page = this.findPage(moldId, pageId);
        const exam = this.selectedExam;
        const section = exam?.sections[0];
        if (!page || !section) {
            return;
        }
        page.blocks.push({
            id: this.data.nextId('block'),
            moldId,
            pageId,
            qIndex: page.blocks.length,
            sectionId: section.id,
            courseUnitId: section.unitIds[0] ?? '',
            subUnitIds: [],
            qType: QuestionTypes.MultipleChoice,
            difficulty: QuestionDifficulties.Easy,
            questionCount: 5,
        });
    }

    removeBlock({ moldId, pageId, blockId }: MoldBlockRef): void {
        const page = this.findPage(moldId, pageId);
        if (!page) {
            return;
        }
        page.blocks = page.blocks.filter((block) => block.id !== blockId);
    }

    patchBlock({ moldId, pageId, blockId, changes }: MoldBlockPatch): void {
        const page = this.findPage(moldId, pageId);
        const block = page?.blocks.find((item) => item.id === blockId);
        if (!block) {
            return;
        }
        Object.assign(block, changes);
    }

    private createExam(): AdminExam {
        return {
            id: this.data.nextId('exam'),
            name: '',
            code: '',
            year: new Date().getFullYear(),
            examType: ExamTypes.National,
            org: '',
            description: '',
            iconUrl: '',
            sections: [],
            molds: [],
        };
    }

    private createMold(examId: string): AdminMold {
        return {
            id: this.data.nextId('mold'),
            courseId: examId,
            name: '',
            description: '',
            type: MoldTypes.Test,
            status: MoldStatuses.Active,
            numOfQuestions: 0,
            duration: 0,
            passingScore: 0,
            pages: [],
        };
    }

    private dropBlocksOutsideScope(exam: AdminExam): void {
        const scopedUnitIds = new Map(
            exam.sections.map((section) => [section.id, section.unitIds])
        );
        const scopedSubUnitIds = new Set(
            exam.sections.flatMap((section) =>
                this.data
                    .unitsForSection(section)
                    .flatMap((unit) => unit.subUnits.map((sub) => sub.id))
            )
        );

        for (const mold of exam.molds) {
            for (const page of mold.pages) {
                page.blocks = page.blocks
                    .filter((block) =>
                        scopedUnitIds
                            .get(block.sectionId)
                            ?.includes(block.courseUnitId)
                    )
                    .map((block) => ({
                        ...block,
                        subUnitIds: block.subUnitIds.filter((id) =>
                            scopedSubUnitIds.has(id)
                        ),
                    }));
            }
        }
    }

    private findMold(moldId: string): AdminMold | undefined {
        return this.selectedExam?.molds.find((mold) => mold.id === moldId);
    }

    private findPage(
        moldId: string,
        pageId: string
    ): AdminMoldPage | undefined {
        return this.findMold(moldId)?.pages.find((page) => page.id === pageId);
    }
}
