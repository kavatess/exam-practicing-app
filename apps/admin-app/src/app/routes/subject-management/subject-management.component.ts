import { Component, inject, OnInit } from '@angular/core';
import {
    MoldStatuses,
    MoldTypes,
    QuestionDifficulties,
    QuestionTypes,
} from '@libs/models';
import { CourseDetailComponent, MoldBlockPatch, MoldBlockRef } from './components/course-detail/course-detail.component';
import { CourseModalComponent, CourseDraft } from './components/modals/course-modal/course-modal.component';
import { MoldModalComponent, MoldDraft } from './components/modals/mold-modal/mold-modal.component';
import { ScopeModalComponent } from './components/modals/scope-modal/scope-modal.component';
import { SubjectModalComponent, SubjectDraft } from './components/modals/subject-modal/subject-modal.component';
import { UnitModalComponent, UnitDraft } from './components/modals/unit-modal/unit-modal.component';
import { SubjectDetailComponent } from './components/subject-detail/subject-detail.component';
import { SubjectListComponent } from './components/subject-list/subject-list.component';
import {
    AdminCourse,
    AdminMold,
    AdminMoldPage,
    AdminSubject,
    AdminUnit,
    CourseTypes,
    SubjectOverlay,
} from './models/subject-management.model';
import { SubjectManagementDataService } from './services/subject-management-data.service';

@Component({
    selector: 'adm-subject-management',
    standalone: true,
    imports: [
        SubjectListComponent,
        SubjectDetailComponent,
        CourseDetailComponent,
        SubjectModalComponent,
        UnitModalComponent,
        CourseModalComponent,
        ScopeModalComponent,
        MoldModalComponent,
    ],
    templateUrl: './subject-management.component.html',
    styleUrl: './subject-management.component.scss',
})
export class SubjectManagementComponent implements OnInit {
    private readonly data = inject(SubjectManagementDataService);

    subjects: AdminSubject[] = [];
    selectedSubjectId: string | null = null;
    selectedCourseId: string | null = null;

    overlay: SubjectOverlay = null;
    editingSubject: AdminSubject | null = null;
    editingUnit: AdminUnit | null = null;
    editingCourse: AdminCourse | null = null;
    editingMold: AdminMold | null = null;

    private sequence = 0;

    ngOnInit(): void {
        this.subjects = this.data.getSubjects();
        this.selectSubject(this.subjects[0]?.id ?? null);
    }

    get selectedSubject(): AdminSubject | null {
        return (
            this.subjects.find(
                (subject) => subject.id === this.selectedSubjectId
            ) ?? null
        );
    }

    get selectedCourse(): AdminCourse | null {
        return (
            this.selectedSubject?.courses.find(
                (course) => course.id === this.selectedCourseId
            ) ?? null
        );
    }

    selectSubject(subjectId: string | null): void {
        this.selectedSubjectId = subjectId;
        this.selectedCourseId = this.selectedSubject?.courses[0]?.id ?? null;
        this.closeOverlay();
    }

    selectCourse(courseId: string): void {
        this.selectedCourseId = courseId;
    }

    closeOverlay(): void {
        this.overlay = null;
        this.editingSubject = null;
        this.editingUnit = null;
        this.editingCourse = null;
        this.editingMold = null;
    }

    openSubjectModal(subject: AdminSubject | null): void {
        this.editingSubject = subject;
        this.overlay = 'subject';
    }

    openUnitModal(unit: AdminUnit | null): void {
        this.editingUnit = unit;
        this.overlay = 'unit';
    }

    openCourseModal(course: AdminCourse | null): void {
        this.editingCourse = course;
        this.overlay = 'course';
    }

    openScopeModal(): void {
        this.overlay = 'scope';
    }

    openMoldModal(mold: AdminMold | null): void {
        this.editingMold = mold;
        this.overlay = 'mold';
    }

    saveSubject(draft: SubjectDraft): void {
        if (this.editingSubject) {
            this.editingSubject.name = draft.name;
            this.editingSubject.description = draft.description;
        } else {
            const subject: AdminSubject = {
                id: this.nextId('subject'),
                name: draft.name || 'Untitled subject',
                description: draft.description,
                units: [],
                courses: [],
            };
            this.subjects = [...this.subjects, subject];
            this.selectSubject(subject.id);
        }
        this.closeOverlay();
    }

    saveUnit(draft: UnitDraft): void {
        const subject = this.selectedSubject;
        if (!subject) {
            return;
        }
        const unit = this.editingUnit ?? this.createUnit(subject.id);
        unit.title = draft.title || 'Untitled unit';
        unit.description = draft.description;
        unit.subUnits = draft.subUnitTitles
            .filter((title) => title.trim())
            .map((title, index) => ({
                id: unit.subUnits[index]?.id ?? this.nextId('sub'),
                unitId: unit.id,
                title,
                description: '',
                iconUrl: '',
                questionCount: unit.subUnits[index]?.questionCount ?? 20,
            }));
        unit.questionCount = unit.subUnits.reduce(
            (total, sub) => total + sub.questionCount,
            0
        );

        if (!this.editingUnit) {
            const position = Math.min(
                Math.max(draft.order - 1, 0),
                subject.units.length
            );
            subject.units.splice(position, 0, unit);
        }
        this.closeOverlay();
    }

    removeUnit(unit: AdminUnit): void {
        const subject = this.selectedSubject;
        if (!subject) {
            return;
        }
        subject.units = subject.units.filter((item) => item.id !== unit.id);
        for (const course of subject.courses) {
            course.unitIds = course.unitIds.filter((id) => id !== unit.id);
            this.dropBlocksOutsideScope(course);
        }
    }

    saveCourse(draft: CourseDraft): void {
        const subject = this.selectedSubject;
        if (!subject) {
            return;
        }
        const course = this.editingCourse ?? this.createCourse(subject.id);
        course.name = draft.name || 'Untitled course';
        course.code = draft.code;
        course.year = Number(draft.year) || new Date().getFullYear();
        course.courseType = draft.courseType;
        course.description = draft.description;
        course.unitIds = [...draft.unitIds];
        course.updatedAt = new Date().toISOString();
        this.dropBlocksOutsideScope(course);

        if (!this.editingCourse) {
            subject.courses = [...subject.courses, course];
        }
        this.selectedCourseId = course.id;
        this.closeOverlay();
    }

    removeCourse(): void {
        const subject = this.selectedSubject;
        const course = this.selectedCourse;
        if (!subject || !course) {
            return;
        }
        subject.courses = subject.courses.filter(
            (item) => item.id !== course.id
        );
        this.selectedCourseId = subject.courses[0]?.id ?? null;
    }

    saveScope(unitIds: string[]): void {
        const course = this.selectedCourse;
        if (!course) {
            return;
        }
        course.unitIds = [...unitIds];
        course.updatedAt = new Date().toISOString();
        this.dropBlocksOutsideScope(course);
        this.closeOverlay();
    }

    saveMold(draft: MoldDraft): void {
        const course = this.selectedCourse;
        if (!course) {
            return;
        }
        const mold = this.editingMold ?? this.createMold(course.id);
        mold.name = draft.name || 'Untitled mold';
        mold.type = draft.type;
        mold.duration = Number(draft.duration) || 0;
        mold.numOfQuestions = Number(draft.numOfQuestions) || 0;
        mold.passingScore = Number(draft.passingScore) || 0;
        mold.status = draft.status;

        if (!this.editingMold) {
            course.molds = [...course.molds, mold];
        }
        this.closeOverlay();
    }

    removeMold(mold: AdminMold): void {
        const course = this.selectedCourse;
        if (!course) {
            return;
        }
        course.molds = course.molds.filter((item) => item.id !== mold.id);
    }

    addPage(moldId: string): void {
        const mold = this.findMold(moldId);
        if (!mold) {
            return;
        }
        const page: AdminMoldPage = {
            id: this.nextId('page'),
            moldId: mold.id,
            name: `Phần ${mold.pages.length + 1}`,
            description: '',
            blocks: [],
        };
        mold.pages = [...mold.pages, page];
    }

    addBlock({ moldId, pageId }: { moldId: string; pageId: string }): void {
        const page = this.findPage(moldId, pageId);
        const course = this.selectedCourse;
        if (!page || !course) {
            return;
        }
        page.blocks = [
            ...page.blocks,
            {
                id: this.nextId('block'),
                moldId,
                pageId,
                qIndex: page.blocks.length,
                courseUnitId: course.unitIds[0] ?? '',
                subUnitIds: [],
                qType: QuestionTypes.MultipleChoice,
                difficulty: QuestionDifficulties.Easy,
                questionCount: 5,
            },
        ];
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

    private createUnit(subjectId: string): AdminUnit {
        return {
            id: this.nextId('unit'),
            subjectId,
            title: '',
            description: '',
            iconUrl: '',
            subUnits: [],
            questionCount: 0,
        };
    }

    private createCourse(subjectId: string): AdminCourse {
        return {
            id: this.nextId('course'),
            subjectId,
            code: '',
            name: '',
            year: new Date().getFullYear(),
            courseType: CourseTypes.National,
            unitIds: [],
            description: '',
            iconUrl: '',
            molds: [],
        };
    }

    private createMold(courseId: string): AdminMold {
        return {
            id: this.nextId('mold'),
            courseId,
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

    private dropBlocksOutsideScope(course: AdminCourse): void {
        const scopedSubUnitIds = new Set(
            this.selectedSubject?.units
                .filter((unit) => course.unitIds.includes(unit.id))
                .flatMap((unit) => unit.subUnits.map((sub) => sub.id)) ?? []
        );

        for (const mold of course.molds) {
            for (const page of mold.pages) {
                page.blocks = page.blocks
                    .filter((block) => course.unitIds.includes(block.courseUnitId))
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
        return this.selectedCourse?.molds.find((mold) => mold.id === moldId);
    }

    private findPage(
        moldId: string,
        pageId: string
    ): AdminMoldPage | undefined {
        return this.findMold(moldId)?.pages.find((page) => page.id === pageId);
    }

    private nextId(prefix: string): string {
        this.sequence += 1;
        return `${prefix}-${this.sequence}`;
    }
}
