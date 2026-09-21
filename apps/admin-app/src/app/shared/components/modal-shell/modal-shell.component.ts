import {
    Component,
    EventEmitter,
    HostListener,
    Input,
    Output,
} from '@angular/core';

@Component({
    selector: 'adm-modal-shell',
    standalone: true,
    imports: [],
    templateUrl: './modal-shell.component.html',
    styleUrl: './modal-shell.component.scss',
})
export class ModalShellComponent {
    @Input({ required: true }) eyebrow!: string;
    @Input({ required: true }) title!: string;
    @Input() width = 480;
    @Input() confirmLabel = 'Save';
    @Input() note = '';
    /** Leading destructive action, e.g. "Delete question". Hidden when empty. */
    @Input() dangerLabel = '';

    @Output() dismiss = new EventEmitter<void>();
    @Output() confirm = new EventEmitter<void>();
    @Output() danger = new EventEmitter<void>();

    @HostListener('document:keydown.escape')
    onEscape(): void {
        this.dismiss.emit();
    }
}
