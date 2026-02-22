import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgbDropdown, NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

@Directive({
    selector: '[epaDropdownItem]',
    standalone: true,
    hostDirectives: [
        {
            directive: NgbDropdown,
            inputs: ['placement', 'container', 'display'],
        },
    ],
})
export class DropdownItemDirective {
    constructor(
        private el: ElementRef<HTMLSpanElement>,
        private dropdown: NgbDropdown,
        private config: NgbDropdownConfig
    ) {
        this.config.autoClose = 'outside';
    }

    @HostListener('mouseover') onMouseOver() {
        this.dropdown.open();
    }

    @HostListener('mouseout') onMouseOut() {
        setTimeout(() => {
            if (this.el.nativeElement.classList.contains('hovering')) return;
            this.dropdown.close();
        }, 100);
    }
}
