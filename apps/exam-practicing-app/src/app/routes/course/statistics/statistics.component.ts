import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { CourseSelectors } from '../store/course.selectors';
import { distinctUntilChanged, map, Subscription } from 'rxjs';
import { Chart } from 'chart.js/auto';

@Component({
    selector: 'epa-statistics',
    standalone: true,
    imports: [CommonModule, NgbNavModule],
    templateUrl: './statistics.component.html',
    styleUrl: './statistics.component.scss',
})
export class StatisticsComponent implements OnInit, OnDestroy {
    radarChart: Chart = null;
    barChart: Chart = null;
    subscription: Subscription = null;

    constructor(private readonly store: Store) {}

    get course$() {
        return this.store.select(CourseSelectors.CourseData);
    }

    get evals$() {
        return this.course$.pipe(map((course) => course.stats.evaluations));
    }

    ngOnInit(): void {
        this.createBarChart();
        this.createRadarChart();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    private createRadarChart(): void {
        this.subscription = this.course$
            .pipe(
                map((course) => ({
                    labels: course.units.map((unit) => unit.title),
                    data: course.units.map((unit) => unit.stats?.avgScore || 0),
                })),
                distinctUntilChanged(
                    (prev, curr) =>
                        JSON.stringify(prev) === JSON.stringify(curr)
                )
            )
            .subscribe(({ labels, data }) => {
                setTimeout(() => {
                    this.radarChart = new Chart('RadarChart', {
                        type: 'radar',
                        options: {
                            responsive: true,
                            elements: {
                                line: {
                                    borderWidth: 3,
                                },
                            },
                            scales: {
                                r: {
                                    suggestedMin: 0,
                                    suggestedMax: 1000,
                                },
                            },
                        },
                        data: {
                            labels,
                            datasets: [
                                {
                                    label: 'Điểm đánh giá',
                                    data,
                                    fill: true,
                                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                    borderColor: 'rgb(255, 99, 132)',
                                    pointBackgroundColor: 'rgb(255, 99, 132)',
                                    pointBorderColor: '#fff',
                                    pointHoverBackgroundColor: '#fff',
                                    pointHoverBorderColor: 'rgb(255, 99, 132)',
                                },
                            ],
                        },
                    });
                }, 400);
            });
    }

    createBarChart() {
        this.subscription = this.course$
            .pipe(
                map((course) => ({
                    MultipleChoice: course.stats.difficulties.map(
                        (stats) => stats.questionTypes.MultipleChoice.correct
                    ),
                    TrueFalse: course.stats.difficulties.map(
                        (stats) => stats.questionTypes.TrueFalse.correct
                    ),
                    Matching: course.stats.difficulties.map(
                        (stats) => stats.questionTypes.Matching.correct
                    ),
                })),
                distinctUntilChanged(
                    (prev, curr) =>
                        JSON.stringify(prev) === JSON.stringify(curr)
                )
            )
            .subscribe((data) => {
                console.log(data);
                setTimeout(() => {
                    this.barChart = new Chart('BarChart', {
                        type: 'bar', //this denotes tha type of chart
                        data: {
                            // values on X-Axis
                            labels: ['Dễ', 'Tiêu chuẩn', 'Nâng cao', 'Khó'],
                            datasets: [
                                {
                                    label: 'Multiple Choice',
                                    data: data.MultipleChoice,
                                    backgroundColor: 'blue',
                                },
                                {
                                    label: 'True/False',
                                    data: data.TrueFalse,
                                    backgroundColor: 'pink',
                                },
                                {
                                    label: 'Matching',
                                    data: data.Matching,
                                    backgroundColor: 'orange',
                                },
                            ],
                        },
                        options: {
                            responsive: true,
                        },
                    });
                }, 400);
            });
    }
}
