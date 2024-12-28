import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseStoreState } from './course.reducer';

// Feature Key
export const courseStoreKey = 'course';

// Selectors
export const courseFeatureSelector =
    createFeatureSelector<CourseStoreState>(courseStoreKey);

// Selectors
export const CourseSelectors = {
    CourseID: createSelector(
        courseFeatureSelector,
        (state: CourseStoreState) => state.courseDetails.courseId
    ),
    CourseData: createSelector(
        courseFeatureSelector,
        (state: CourseStoreState) => state.courseDetails.data || null
    ),
    CourseUnits: createSelector(
        courseFeatureSelector,
        (state: CourseStoreState) => state.courseDetails.data?.units || []
    ),
    TestHistoryList: createSelector(
        courseFeatureSelector,
        (state: CourseStoreState) => state.testHistory.list || []
    ),
    TestHistoryPagination: createSelector(
        courseFeatureSelector,
        (state: CourseStoreState) => state.testHistory.pagination || null
    ),
};
