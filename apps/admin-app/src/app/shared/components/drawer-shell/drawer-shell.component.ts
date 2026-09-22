import {
    Component,
    EventEmitter,
    HostListener,
    Input,
    Output,
} from '@angular/core';

/** A right-hand panel for inspecting one row without leaving the list. */
@Component({
    selector: 'adm-drawer-shell',
    standalone: true,
    imports: [],
    templateUrl: './drawer-shell.component.html',
    styleUrl: './drawer-shell.component.scss',
})
export class DrawerShellComponent {
    @Input({ required: true }) eyebrow!: string;
    @Input({ required: true }) title!: string;
    @Input() width = 420;

    @Output() dismiss = new EventEmitter<void>();

    @HostListener('document:keydown.escape')
    onEscape(): void {
        this.dismiss.emit();
    }
}
