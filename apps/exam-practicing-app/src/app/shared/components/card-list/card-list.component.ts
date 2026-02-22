import { Component, Input } from '@angular/core';
import { AsyncPipe, NgForOf } from '@angular/common';

@Component({
    selector: 'epa-card-list',
    standalone: true,
    imports: [AsyncPipe, NgForOf],
    templateUrl: './card-list.component.html',
    styleUrl: './card-list.component.scss',
})
export class CardListComponent {
    @Input()
    title = '';
}
