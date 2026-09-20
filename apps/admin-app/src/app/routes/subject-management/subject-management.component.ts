import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AdminSubject, AdminUnit } from '../../shared/models/cms.model';
import { SubjectModalComponent } from './components/modals/subject-modal/subject-modal.component';
import { UnitModalComponent } from './components/modals/unit-modal/unit-modal.component';
import { SubjectDetailComponent } from './components/subject-detail/subject-detail.component';
import { SubjectListComponent } from './components/subject-list/subject-list.component';
import { SubjectManagementActions } from './store/subject-management.actions';
import {
    SubjectDraft,
    UnitDraft,
} from './store/subject-management.service';
import { SubjectManagementSelectors } from './store/subject-management.selectors';

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
    private readonly store = inject(Store);

    readonly subjects = this.store.selectSignal(
        SubjectManagementSelectors.Subjects
    );
    readonly selectedSubject = this.store.selectSignal(
        SubjectManagementSelectors.SelectedSubject
    );
    readonly selectedSubjectId = this.store.selectSignal(
        SubjectManagementSelectors.SelectedSubjectId
    );

    // Overlay bookkeeping is view state, so it stays with the component.
    overlay: 'subject' | 'unit' | null = null;
    editingSubject: AdminSubject | null = null;
    editingUnit: AdminUnit | null = null;

    ngOnInit(): void {
        this.store.dispatch(SubjectManagementActions.loadSubjects());
    }

    selectSubject(subjectId: string): void {
        this.store.dispatch(SubjectManagementActions.selectSubject({ subjectId }));
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
        const editing = this.editingSubject;
        this.store.dispatch(
            editing
                ? SubjectManagementActions.updateSubject({
                      subjectId: editing.id,
                      draft,
                  })
                : SubjectManagementActions.createSubject({ draft })
        );
        this.closeOverlay();
    }

    saveUnit(draft: UnitDraft): void {
        const subjectId = this.selectedSubjectId();
        if (!subjectId) {
            return;
        }
        this.store.dispatch(
            SubjectManagementActions.saveUnit({
                subjectId,
                unitId: this.editingUnit?.id ?? null,
                draft,
            })
        );
        this.closeOverlay();
    }

    removeUnit(unit: AdminUnit): void {
        const subjectId = this.selectedSubjectId();
        if (!subjectId) {
            return;
        }
        this.store.dispatch(
            SubjectManagementActions.removeUnit({ subjectId, unitId: unit.id })
        );
    }

    removeSubUnit(unit: AdminUnit, subUnitId: string): void {
        const subjectId = this.selectedSubjectId();
        if (!subjectId) {
            return;
        }
        this.store.dispatch(
            SubjectManagementActions.removeSubUnit({
                subjectId,
                unitId: unit.id,
                subUnitId,
            })
        );
    }
}
