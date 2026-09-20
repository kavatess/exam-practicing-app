import { Component, inject, OnInit } from '@angular/core';
import { SubjectModalComponent, SubjectDraft } from './components/modals/subject-modal/subject-modal.component';
import { UnitModalComponent, UnitDraft } from './components/modals/unit-modal/unit-modal.component';
import { SubjectDetailComponent } from './components/subject-detail/subject-detail.component';
import { SubjectListComponent } from './components/subject-list/subject-list.component';
import { AdminSubject, AdminUnit } from '../../shared/models/cms.model';
import { CmsDataService } from '../../shared/services/cms-data.service';

@Component({
    selector: 'adm-subject-management',
    standalone: true,
    imports: [
        SubjectListComponent,
        SubjectDetailComponent,
        SubjectModalComponent,
        UnitModalComponent,
    ],
    templateUrl: './subject-management.component.html',
    styleUrl: './subject-management.component.scss',
})
export class SubjectManagementComponent implements OnInit {
    private readonly data = inject(CmsDataService);

    readonly subjects = this.data.subjects;

    selectedSubjectId: string | null = null;
    overlay: 'subject' | 'unit' | null = null;
    editingSubject: AdminSubject | null = null;
    editingUnit: AdminUnit | null = null;

    ngOnInit(): void {
        this.selectedSubjectId = this.subjects[0]?.id ?? null;
    }

    get selectedSubject(): AdminSubject | null {
        return (
            this.subjects.find(
                (subject) => subject.id === this.selectedSubjectId
            ) ?? null
        );
    }

    selectSubject(subjectId: string): void {
        this.selectedSubjectId = subjectId;
        this.closeOverlay();
    }

    closeOverlay(): void {
        this.overlay = null;
        this.editingSubject = null;
        this.editingUnit = null;
    }

    openSubjectModal(subject: AdminSubject | null): void {
        this.editingSubject = subject;
        this.overlay = 'subject';
    }

    openUnitModal(unit: AdminUnit | null): void {
        this.editingUnit = unit;
        this.overlay = 'unit';
    }

    saveSubject(draft: SubjectDraft): void {
        if (this.editingSubject) {
            this.editingSubject.name = draft.name;
            this.editingSubject.description = draft.description;
        } else {
            const subject: AdminSubject = {
                id: this.data.nextId('subject'),
                name: draft.name || 'Untitled subject',
                description: draft.description,
                units: [],
            };
            this.subjects.push(subject);
            this.selectedSubjectId = subject.id;
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
                id: unit.subUnits[index]?.id ?? this.data.nextId('sub'),
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
        this.data.exams.forEach((exam) =>
            exam.sections.forEach((section) => {
                section.unitIds = section.unitIds.filter(
                    (id) => id !== unit.id
                );
            })
        );
    }

    removeSubUnit(unit: AdminUnit, subUnitId: string): void {
        unit.subUnits = unit.subUnits.filter((sub) => sub.id !== subUnitId);
        unit.questionCount = unit.subUnits.reduce(
            (total, sub) => total + sub.questionCount,
            0
        );
    }

    private createUnit(subjectId: string): AdminUnit {
        return {
            id: this.data.nextId('unit'),
            subjectId,
            title: '',
            description: '',
            iconUrl: '',
            subUnits: [],
            questionCount: 0,
        };
    }
}
