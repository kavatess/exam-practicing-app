import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { MetricRange } from '../../../shared/models/cms.model';
import { DashboardSnapshot } from './dashboard.service';

export const DashboardActions = createActionGroup({
    source: 'Dashboard',
    events: {
        LoadDashboard: emptyProps(),
        LoadDashboardSuccess: props<{ snapshot: DashboardSnapshot }>(),
        LoadDashboardFailure: props<{ error: unknown }>(),

        // Each chart carries its own range, so they are separate actions.
        SelectRevenueRange: props<{ range: MetricRange }>(),
        SelectTestsRange: props<{ range: MetricRange }>(),
        SelectExamsRange: props<{ range: MetricRange }>(),

        ToggleExam: props<{ examId: string }>(),
        /** Plot every exam rather than the busiest handful. */
        ShowAllExams: emptyProps(),
        /** Back to the busiest five. */
        ResetExamsToTop: emptyProps(),
    },
});
