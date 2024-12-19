import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgbDropdown, NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

@Directive({
    selector: '[epaDropdownItem]',
    standalone: true,
    hostDirectives: [
        {
            directive: NgbDropdown,
            inputs: ['placement', 'container'],
        },
    ],
})
export class DropdownItemDirective {
    constructor(
        private el: ElementRef,
        private dropdown: NgbDropdown,
        private config: NgbDropdownConfig
    ) {
        this.config.autoClose = 'outside';
    }

    @HostListener('mouseover') onMouseOver() {
        this.dropdown.open();
    }

    @HostListener('mouseout') onMouseOut() {
        this.dropdown.close();
    }
}
