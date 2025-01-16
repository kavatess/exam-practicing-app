import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { CourseSelectors } from '../store/course.selectors';
import { AttributeStats, QuestionDifficulties, Statistics } from '@libs/models';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { QuestionDiffPipe } from '@libs/angular';

@Component({
    selector: 'epa-unit-table',
    standalone: true,
    imports: [CommonModule, NgbTooltipModule, QuestionDiffPipe],
    templateUrl: './unit-table.component.html',
    styleUrl: './unit-table.component.scss',
})
export class UnitTableComponent {
    readonly Difficulties = QuestionDifficulties;

    constructor(private readonly store: Store) {}

    get units$() {
        return this.store.select(CourseSelectors.CourseUnits);
    }

    getCorrectPercentage(stats: Statistics) {
        return Math.round(
            (stats.correctAnswers / stats.completedQuestions) * 100
        );
    }

    getIncorrectPercentage(stats: Statistics) {
        return Math.round(
            (stats.incorrectAnswers / stats.completedQuestions) * 100
        );
    }

    getDifficultyPercentage(stats: Statistics, diffStats: AttributeStats) {
        return Math.round((diffStats?.correct / stats.correctAnswers) * 100);
    }
}
