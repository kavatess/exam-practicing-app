import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ADMIN_APP_ROUTES } from '../../app.routes';
import { MetricRange } from '../../shared/models/cms.model';
import { ExamChartComponent } from './components/exam-chart/exam-chart.component';
import { KpiCardComponent } from './components/kpi-card/kpi-card.component';
import { TrendChartComponent } from './components/trend-chart/trend-chart.component';
import { DashboardActions } from './store/dashboard.actions';
import { DashboardSelectors } from './store/dashboard.selectors';

@Component({
    selector: 'adm-dashboard',
    standalone: true,
    imports: [KpiCardComponent, TrendChartComponent, ExamChartComponent],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
    private readonly store = inject(Store);
    private readonly router = inject(Router);

    readonly kpis = this.store.selectSignal(DashboardSelectors.Kpis);
    readonly revenue = this.store.selectSignal(DashboardSelectors.Revenue);
    readonly tests = this.store.selectSignal(DashboardSelectors.Tests);
    readonly examSeries = this.store.selectSignal(
        DashboardSelectors.ExamSeries
    );
    readonly revenueRange = this.store.selectSignal(
        DashboardSelectors.RevenueRange
    );
    readonly testsRange = this.store.selectSignal(
        DashboardSelectors.TestsRange
    );
    readonly examsRange = this.store.selectSignal(
        DashboardSelectors.ExamsRange
    );

    ngOnInit(): void {
        this.store.dispatch(DashboardActions.loadDashboard());
    }

    selectRevenueRange(range: MetricRange): void {
        this.store.dispatch(DashboardActions.selectRevenueRange({ range }));
    }

    selectTestsRange(range: MetricRange): void {
        this.store.dispatch(DashboardActions.selectTestsRange({ range }));
    }

    selectExamsRange(range: MetricRange): void {
        this.store.dispatch(DashboardActions.selectExamsRange({ range }));
    }

    toggleExam(examId: string): void {
        this.store.dispatch(DashboardActions.toggleExam({ examId }));
    }

    showAllExams(): void {
        this.store.dispatch(DashboardActions.showAllExams());
    }

    resetExamsToTop(): void {
        this.store.dispatch(DashboardActions.resetExamsToTop());
    }

    openExams(): void {
        this.router.navigate(['/', ADMIN_APP_ROUTES.EXAMS]);
    }
}
