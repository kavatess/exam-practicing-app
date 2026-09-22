import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ExamSeriesView } from '../../store/dashboard.selectors';

/**
 * Names every series and toggles it. With seven exams sharing a plot, the chips
 * are what keep identity off colour alone.
 */
@Component({
    selector: 'adm-exam-legend',
    standalone: true,
    imports: [],
    templateUrl: './exam-legend.component.html',
    styleUrl: './exam-legend.component.scss',
})
export class ExamLegendComponent {
    @Input() series: ExamSeriesView[] = [];

    @Output() toggleExam = new EventEmitter<string>();
    @Output() showAll = new EventEmitter<void>();
    @Output() resetToTop = new EventEmitter<void>();

    countLabel(exam: ExamSeriesView): string {
        return exam.total.toLocaleString('en-US');
    }
}
