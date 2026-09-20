import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import {
    AdminSubject,
    AdminSubUnit,
    AdminUnit,
} from '../../../shared/models/cms.model';
import { seedSubjects } from './subject-management.seed';

/** Request payload for creating or renaming a subject. */
export interface SubjectDraft {
    name: string;
    description: string;
}

/** Request payload for creating or editing a unit and its sub-units. */
export interface UnitDraft {
    title: string;
    description: string;
    order: number;
    subUnitTitles: string[];
}

/**
 * The subject taxonomy's data boundary.
 *
 * Every method already returns an Observable of the shape the API will answer
 * with, so swapping the in-memory store below for `HttpClient` calls is a
 * change confined to this file — the store, effects and components stay as
 * they are.
 */
@Injectable({ providedIn: 'root' })
export class SubjectManagementService {
    private subjects: AdminSubject[] = seedSubjects();
    private sequence = 0;

    getSubjects(): Observable<AdminSubject[]> {
        return of(structuredClone(this.subjects));
    }

    createSubject(draft: SubjectDraft): Observable<AdminSubject> {
        const subject: AdminSubject = {
            id: this.nextId('subject'),
            name: draft.name.trim() || 'Untitled subject',
            description: draft.description,
            updatedAt: new Date().toISOString(),
            units: [],
        };
        this.subjects.push(subject);
        return of(structuredClone(subject));
    }

    updateSubject(
        subjectId: string,
        draft: SubjectDraft
    ): Observable<AdminSubject> {
        return this.mutate(subjectId, (subject) => {
            subject.name = draft.name.trim() || subject.name;
            subject.description = draft.description;
        });
    }

    /** Creates a unit when `unitId` is null, otherwise edits that unit. */
    saveUnit(
        subjectId: string,
        unitId: string | null,
        draft: UnitDraft
    ): Observable<AdminSubject> {
        return this.mutate(subjectId, (subject) => {
            const existing = unitId
                ? subject.units.find((unit) => unit.id === unitId)
                : undefined;
            if (unitId && !existing) {
                throw new Error(`Unit ${unitId} not found`);
            }

            const unit = existing ?? this.createUnit(subject.id);
            unit.title = draft.title.trim() || 'Untitled unit';
            unit.description = draft.description;
            unit.subUnits = this.buildSubUnits(unit, draft.subUnitTitles);
            unit.questionCount = countQuestions(unit);

            if (!existing) {
                const position = Math.min(
                    Math.max(draft.order - 1, 0),
                    subject.units.length
                );
                subject.units.splice(position, 0, unit);
            }
        });
    }

    removeUnit(subjectId: string, unitId: string): Observable<AdminSubject> {
        return this.mutate(subjectId, (subject) => {
            subject.units = subject.units.filter((unit) => unit.id !== unitId);
        });
    }

    removeSubUnit(
        subjectId: string,
        unitId: string,
        subUnitId: string
    ): Observable<AdminSubject> {
        return this.mutate(subjectId, (subject) => {
            const unit = subject.units.find((item) => item.id === unitId);
            if (!unit) {
                throw new Error(`Unit ${unitId} not found`);
            }
            unit.subUnits = unit.subUnits.filter(
                (sub) => sub.id !== subUnitId
            );
            unit.questionCount = countQuestions(unit);
        });
    }

    /**
     * Applies `change` to the stored subject and answers with a copy of it,
     * the way a PATCH endpoint answers with the updated resource.
     */
    private mutate(
        subjectId: string,
        change: (subject: AdminSubject) => void
    ): Observable<AdminSubject> {
        const subject = this.subjects.find((item) => item.id === subjectId);
        if (!subject) {
            return throwError(() => new Error(`Subject ${subjectId} not found`));
        }
        try {
            change(subject);
        } catch (error) {
            return throwError(() => error);
        }
        subject.updatedAt = new Date().toISOString();
        return of(structuredClone(subject));
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

    /** Keeps the question count of sub-units that survive an edit. */
    private buildSubUnits(unit: AdminUnit, titles: string[]): AdminSubUnit[] {
        return titles
            .filter((title) => title.trim())
            .map((title, index) => ({
                id: unit.subUnits[index]?.id ?? this.nextId('sub'),
                unitId: unit.id,
                title,
                description: '',
                iconUrl: '',
                questionCount: unit.subUnits[index]?.questionCount ?? 20,
            }));
    }

    private nextId(prefix: string): string {
        this.sequence += 1;
        return `${prefix}-${this.sequence}`;
    }
}

function countQuestions(unit: AdminUnit): number {
    return unit.subUnits.reduce((total, sub) => total + sub.questionCount, 0);
}
