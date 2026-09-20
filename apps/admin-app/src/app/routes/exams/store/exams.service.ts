import { Injectable } from '@angular/core';
import {
    MoldStatuses,
    MoldTypes,
    QuestionDifficulties,
    QuestionTypes,
} from '@libs/models';
import { Observable, of, throwError } from 'rxjs';
import {
    AdminExam,
    AdminMold,
    AdminMoldBlock,
    AdminMoldPage,
    ExamTypes,
} from '../../../shared/models/cms.model';
import { seedExams } from './exams.seed';

/** Request payload for creating or editing an exam. */
export interface ExamDraft {
    name: string;
    code: string;
    year: number;
    examType: ExamTypes;
    org: string;
    description: string;
}

/** Request payload for adding a subject section to an exam. */
export interface SectionDraft {
    subjectId: string;
    label: string;
    unitIds: string[];
}

/** Request payload for creating or editing a test mold. */
export interface MoldDraft {
    name: string;
    type: MoldTypes;
    duration: number;
    numOfQuestions: number;
    passingScore: number;
    status: MoldStatuses;
}

/**
 * The exams data boundary.
 *
 * Like its subject counterpart, every method answers with the shape the API
 * will return — a whole exam for a write, the list for a read — so wiring
 * `HttpClient` in later touches only this file.
 */
@Injectable({ providedIn: 'root' })
export class ExamsService {
    private exams: AdminExam[] = seedExams();
    private sequence = 0;

    getExams(): Observable<AdminExam[]> {
        return of(structuredClone(this.exams));
    }

    /** Creates an exam when `examId` is null, otherwise edits that exam. */
    saveExam(examId: string | null, draft: ExamDraft): Observable<AdminExam> {
        if (!examId) {
            const exam: AdminExam = {
                id: this.nextId('exam'),
                name: draft.name.trim() || 'Untitled exam',
                code: draft.code,
                year: Number(draft.year) || new Date().getFullYear(),
                examType: draft.examType,
                org: draft.org,
                description: draft.description,
                iconUrl: '',
                updatedAt: new Date().toISOString(),
                sections: [],
                molds: [],
            };
            this.exams.push(exam);
            return of(structuredClone(exam));
        }

        return this.mutate(examId, (exam) => {
            exam.name = draft.name.trim() || 'Untitled exam';
            exam.code = draft.code;
            exam.year = Number(draft.year) || exam.year;
            exam.examType = draft.examType;
            exam.org = draft.org;
            exam.description = draft.description;
        });
    }

    removeExam(examId: string): Observable<string> {
        const index = this.exams.findIndex((exam) => exam.id === examId);
        if (index < 0) {
            return throwError(() => new Error(`Exam ${examId} not found`));
        }
        this.exams.splice(index, 1);
        return of(examId);
    }

    addSection(examId: string, draft: SectionDraft): Observable<AdminExam> {
        return this.mutate(examId, (exam) => {
            const taken = exam.sections.some(
                (section) => section.subjectId === draft.subjectId
            );
            if (taken) {
                throw new Error('That subject already has a section');
            }
            exam.sections.push({
                id: this.nextId('section'),
                examId: exam.id,
                subjectId: draft.subjectId,
                label: draft.label,
                unitIds: [...draft.unitIds],
            });
        });
    }

    removeSection(examId: string, sectionId: string): Observable<AdminExam> {
        return this.mutate(examId, (exam) => {
            exam.sections = exam.sections.filter(
                (section) => section.id !== sectionId
            );
            forEachPage(exam, (page) => {
                page.blocks = page.blocks.filter(
                    (block) => block.sectionId !== sectionId
                );
            });
        });
    }

    saveSectionScope(
        examId: string,
        sectionId: string,
        unitIds: string[]
    ): Observable<AdminExam> {
        return this.mutate(examId, (exam) => {
            const section = exam.sections.find(
                (item) => item.id === sectionId
            );
            if (!section) {
                throw new Error(`Section ${sectionId} not found`);
            }
            section.unitIds = [...unitIds];
            // A block can only point at a unit the section still draws from.
            forEachPage(exam, (page) => {
                page.blocks = page.blocks.filter(
                    (block) =>
                        block.sectionId !== sectionId ||
                        section.unitIds.includes(block.courseUnitId)
                );
            });
        });
    }

    /** Creates a mold when `moldId` is null, otherwise edits that mold. */
    saveMold(
        examId: string,
        moldId: string | null,
        draft: MoldDraft
    ): Observable<AdminExam> {
        return this.mutate(examId, (exam) => {
            const existing = moldId
                ? exam.molds.find((mold) => mold.id === moldId)
                : undefined;
            if (moldId && !existing) {
                throw new Error(`Mold ${moldId} not found`);
            }

            const mold = existing ?? this.createMold(exam.id);
            mold.name = draft.name.trim() || 'Untitled mold';
            mold.type = draft.type;
            mold.duration = Number(draft.duration) || 0;
            mold.numOfQuestions = Number(draft.numOfQuestions) || 0;
            mold.passingScore = Number(draft.passingScore) || 0;
            mold.status = draft.status;

            if (!existing) {
                exam.molds.push(mold);
            }
        });
    }

    removeMold(examId: string, moldId: string): Observable<AdminExam> {
        return this.mutate(examId, (exam) => {
            exam.molds = exam.molds.filter((mold) => mold.id !== moldId);
        });
    }

    addPage(examId: string, moldId: string): Observable<AdminExam> {
        return this.mutate(examId, (exam) => {
            const mold = findMold(exam, moldId);
            const page: AdminMoldPage = {
                id: this.nextId('page'),
                moldId: mold.id,
                name: `Phần ${mold.pages.length + 1}`,
                description: '',
                blocks: [],
            };
            mold.pages.push(page);
        });
    }

    addBlock(
        examId: string,
        moldId: string,
        pageId: string
    ): Observable<AdminExam> {
        return this.mutate(examId, (exam) => {
            const section = exam.sections[0];
            if (!section) {
                throw new Error('Add a subject section before adding blocks');
            }
            const page = findPage(exam, moldId, pageId);
            const block: AdminMoldBlock = {
                id: this.nextId('block'),
                moldId,
                pageId,
                qIndex: page.blocks.length,
                sectionId: section.id,
                courseUnitId: section.unitIds[0] ?? '',
                subUnitIds: [],
                qType: QuestionTypes.MultipleChoice,
                difficulty: QuestionDifficulties.Easy,
                questionCount: 5,
            };
            page.blocks.push(block);
        });
    }

    removeBlock(
        examId: string,
        moldId: string,
        pageId: string,
        blockId: string
    ): Observable<AdminExam> {
        return this.mutate(examId, (exam) => {
            const page = findPage(exam, moldId, pageId);
            page.blocks = page.blocks.filter((block) => block.id !== blockId);
        });
    }

    patchBlock(
        examId: string,
        moldId: string,
        pageId: string,
        blockId: string,
        changes: Partial<AdminMoldBlock>
    ): Observable<AdminExam> {
        return this.mutate(examId, (exam) => {
            const page = findPage(exam, moldId, pageId);
            const block = page.blocks.find((item) => item.id === blockId);
            if (!block) {
                throw new Error(`Block ${blockId} not found`);
            }
            Object.assign(block, changes);
        });
    }

    /**
     * Drops a deleted subject unit from every section scope and mold block.
     * The server will own this cascade; until then the exams store runs it in
     * reply to the subject feature deleting a unit.
     */
    dropUnit(unitId: string): Observable<AdminExam[]> {
        for (const exam of this.exams) {
            const usedHere =
                exam.sections.some((section) =>
                    section.unitIds.includes(unitId)
                ) ||
                exam.molds.some((mold) =>
                    mold.pages.some((page) =>
                        page.blocks.some(
                            (block) => block.courseUnitId === unitId
                        )
                    )
                );
            if (!usedHere) {
                continue;
            }

            for (const section of exam.sections) {
                section.unitIds = section.unitIds.filter(
                    (id) => id !== unitId
                );
            }
            forEachPage(exam, (page) => {
                page.blocks = page.blocks.filter(
                    (block) => block.courseUnitId !== unitId
                );
            });
            exam.updatedAt = new Date().toISOString();
        }
        return of(structuredClone(this.exams));
    }

    /**
     * Applies `change` to the stored exam and answers with a copy of it, the
     * way a PATCH endpoint answers with the updated resource.
     */
    private mutate(
        examId: string,
        change: (exam: AdminExam) => void
    ): Observable<AdminExam> {
        const exam = this.exams.find((item) => item.id === examId);
        if (!exam) {
            return throwError(() => new Error(`Exam ${examId} not found`));
        }
        try {
            change(exam);
        } catch (error) {
            return throwError(() => error);
        }
        exam.updatedAt = new Date().toISOString();
        return of(structuredClone(exam));
    }

    private createMold(examId: string): AdminMold {
        return {
            id: this.nextId('mold'),
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

    private nextId(prefix: string): string {
        this.sequence += 1;
        return `${prefix}-${this.sequence}`;
    }
}

function findMold(exam: AdminExam, moldId: string): AdminMold {
    const mold = exam.molds.find((item) => item.id === moldId);
    if (!mold) {
        throw new Error(`Mold ${moldId} not found`);
    }
    return mold;
}

function findPage(
    exam: AdminExam,
    moldId: string,
    pageId: string
): AdminMoldPage {
    const page = findMold(exam, moldId).pages.find(
        (item) => item.id === pageId
    );
    if (!page) {
        throw new Error(`Page ${pageId} not found`);
    }
    return page;
}

function forEachPage(
    exam: AdminExam,
    visit: (page: AdminMoldPage) => void
): void {
    for (const mold of exam.molds) {
        for (const page of mold.pages) {
            visit(page);
        }
    }
}
