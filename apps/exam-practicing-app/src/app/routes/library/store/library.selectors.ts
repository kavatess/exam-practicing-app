import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LibraryStoreState } from './library.reducer';

// Feature Key
export const libraryStoreKey = 'library';

// Selectors
export const libraryFeatureSelector =
    createFeatureSelector<LibraryStoreState>(libraryStoreKey);

// Selectors
export const LibrarySelectors = {
    CourseList: createSelector(
        libraryFeatureSelector,
        (state: LibraryStoreState) => state.courses.list || []
    ),
    // SelectedCourseId: createSelector(
    //     libraryFeatureSelector,
    //     (state: LibraryStoreState) => state.courseDetails.courseId || ''
    // ),
    CourseData: createSelector(
        libraryFeatureSelector,
        (state: LibraryStoreState) => state.courseDetails.data || null
    ),
    CourseUnits: createSelector(
        libraryFeatureSelector,
        (state: LibraryStoreState) => state.courseDetails.data?.units || []
    ),
};
