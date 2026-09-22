import { createReducer, on } from '@ngrx/store';
import {
    DashboardKpi,
    ExamMetricSeries,
    MetricRange,
    MetricSeries,
} from '../../../shared/models/cms.model';
import { DashboardActions } from './dashboard.actions';

/** How many exams the chart plots before the user asks for more. */
export const DEFAULT_EXAM_COUNT = 5;

export interface DashboardState {
    kpis: DashboardKpi[];
    revenue: MetricSeries | null;
    tests: MetricSeries | null;
    exams: ExamMetricSeries[];
    revenueRange: MetricRange;
    testsRange: MetricRange;
    examsRange: MetricRange;
    /**
     * Exams plotted right now. Null means "the default top five" — kept
     * distinct from an empty array, which is the user hiding every series.
     */
    visibleExamIds: string[] | null;
    loading: boolean;
    error: unknown;
}

export const initialState: DashboardState = {
    kpis: [],
    revenue: null,
    tests: null,
    exams: [],
    revenueRange: '1M',
    testsRange: '1M',
    examsRange: '1M',
    visibleExamIds: null,
    loading: false,
    error: null,
};

export const dashboardReducer = createReducer(
    initialState,

    on(DashboardActions.loadDashboard, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(DashboardActions.loadDashboardSuccess, (state, { snapshot }) => ({
        ...state,
        kpis: snapshot.kpis,
        revenue: snapshot.revenue,
        tests: snapshot.tests,
        exams: snapshot.exams,
        loading: false,
    })),
    on(DashboardActions.loadDashboardFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(DashboardActions.selectRevenueRange, (state, { range }) => ({
        ...state,
        revenueRange: range,
    })),
    on(DashboardActions.selectTestsRange, (state, { range }) => ({
        ...state,
        testsRange: range,
    })),
    on(DashboardActions.selectExamsRange, (state, { range }) => ({
        ...state,
        examsRange: range,
    })),

    on(DashboardActions.toggleExam, (state, { examId }) => {
        const visible = state.visibleExamIds ?? defaultVisible(state.exams);
        return {
            ...state,
            visibleExamIds: visible.includes(examId)
                ? visible.filter((id) => id !== examId)
                : [...visible, examId],
        };
    }),
    on(DashboardActions.showAllExams, (state) => ({
        ...state,
        visibleExamIds: state.exams.map((exam) => exam.id),
    })),
    on(DashboardActions.resetExamsToTop, (state) => ({
        ...state,
        visibleExamIds: null,
    }))
);

function defaultVisible(exams: ExamMetricSeries[]): string[] {
    return exams.slice(0, DEFAULT_EXAM_COUNT).map((exam) => exam.id);
}
