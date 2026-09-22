import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EXAM_SERIES_COLORS } from '../../../shared/models/cms.model';
import { DashboardState, DEFAULT_EXAM_COUNT } from './dashboard.reducer';

export const dashboardStoreKey = 'dashboard';

export const dashboardFeatureSelector =
    createFeatureSelector<DashboardState>(dashboardStoreKey);

/** An exam plus the colour and on/off state the chart and its legend need. */
export interface ExamSeriesView {
    id: string;
    name: string;
    total: number;
    points: { label: string; axis: string; value: number }[];
    color: string;
    visible: boolean;
}

export const DashboardSelectors = {
    Kpis: createSelector(
        dashboardFeatureSelector,
        (state: DashboardState) => state.kpis
    ),
    Revenue: createSelector(
        dashboardFeatureSelector,
        (state: DashboardState) => state.revenue
    ),
    Tests: createSelector(
        dashboardFeatureSelector,
        (state: DashboardState) => state.tests
    ),
    RevenueRange: createSelector(
        dashboardFeatureSelector,
        (state: DashboardState) => state.revenueRange
    ),
    TestsRange: createSelector(
        dashboardFeatureSelector,
        (state: DashboardState) => state.testsRange
    ),
    ExamsRange: createSelector(
        dashboardFeatureSelector,
        (state: DashboardState) => state.examsRange
    ),
    /**
     * Colour is bound to the exam's own position in the catalogue, never to its
     * current rank, so hiding a series doesn't repaint the ones left behind.
     */
    ExamSeries: createSelector(
        dashboardFeatureSelector,
        (state: DashboardState): ExamSeriesView[] => {
            const visible =
                state.visibleExamIds ??
                state.exams.slice(0, DEFAULT_EXAM_COUNT).map((e) => e.id);
            return state.exams.map((exam, index) => ({
                ...exam,
                color: EXAM_SERIES_COLORS[index % EXAM_SERIES_COLORS.length],
                visible: visible.includes(exam.id),
            }));
        }
    ),
    Loading: createSelector(
        dashboardFeatureSelector,
        (state: DashboardState) => state.loading
    ),
    Error: createSelector(
        dashboardFeatureSelector,
        (state: DashboardState) => state.error
    ),
};
