import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardStoreState } from './dashboard.reducer';

// Feature Key
export const dashboardStoreKey = 'dropdown-item';

// Selectors
export const dashboardFeatureSelector =
    createFeatureSelector<DashboardStoreState>(dashboardStoreKey);

// Dropdown Item Selectors
export const StreakSelectors = {
    StreakDays: createSelector(
        dashboardFeatureSelector,
        (state: DashboardStoreState) => state.streak.streakDays || 0
    ),
};

export const EnergiesSelectors = {
    EnergyAmount: createSelector(
        dashboardFeatureSelector,
        (state: DashboardStoreState) => state.energies.value || 0
    ),
};

export const GemsSelectors = {
    GemAmount: createSelector(
        dashboardFeatureSelector,
        (state: DashboardStoreState) => state.gems.value || 0
    ),
};

// Quest Selectors
export const QuestsSelectors = {
    QuestList: createSelector(
        dashboardFeatureSelector,
        (state: DashboardStoreState) => state.quests.list || []
    ),
    QuestLength: createSelector(
        dashboardFeatureSelector,
        (state: DashboardStoreState) => state.quests.length || 0
    ),
};

// Course Selectors
export const CourseSelectors = {
    SelectedCourseId: createSelector(
        dashboardFeatureSelector,
        (state: DashboardStoreState) => state.course.selectedCourseId || ''
    ),
    CourseData: createSelector(
        dashboardFeatureSelector,
        (state: DashboardStoreState) => state.course.data || null
    ),
    CourseUnits: createSelector(
        dashboardFeatureSelector,
        (state: DashboardStoreState) => state.course.data?.units || []
    ),
};
