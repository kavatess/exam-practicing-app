import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AdminUnit } from '../../models/subject-management.model';

@Component({
    selector: 'adm-scope-card',
    standalone: true,
    imports: [],
    templateUrl: './scope-card.component.html',
    styleUrl: './scope-card.component.scss',
})
export class ScopeCardComponent {
    @Input({ required: true }) units: AdminUnit[] = [];
    @Input({ required: true }) subjectName!: string;

    @Output() editScope = new EventEmitter<void>();
}
