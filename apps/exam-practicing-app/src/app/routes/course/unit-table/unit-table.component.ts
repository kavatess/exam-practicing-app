import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { CourseSelectors } from '../store/course.selectors';
import { DifficultStats, QuestionDifficulties, Statistics } from '@libs/models';

@Component({
    selector: 'epa-unit-table',
    standalone: true,
    imports: [CommonModule],
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

    getDifficultyPercentage(stats: Statistics, diffStats: DifficultStats) {
        return Math.round((diffStats?.correct / stats.correctAnswers) * 100);
    }
}
