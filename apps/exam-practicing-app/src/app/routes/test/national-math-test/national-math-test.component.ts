import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestQuestion } from '@libs/models';

@Component({
    selector: 'epa-national-math-test',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './national-math-test.component.html',
    styleUrl: './national-math-test.component.scss',
})
export class NationalMathTestComponent {
    @Input()
    questions: TestQuestion[] = [];
}
