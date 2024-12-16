import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DropdownItemStoreState } from './dropdown-item.reducer';

// Feature Key
export const dropdownItemStoreKey = 'dropdown-item';

// Selectors
export const DropdownItemFeatureSelector =
    createFeatureSelector<DropdownItemStoreState>(dropdownItemStoreKey);

export const StreakSelectors = {
    StreakDays: createSelector(
        DropdownItemFeatureSelector,
        (state: DropdownItemStoreState) => state.streak.streakDays || 0
    ),
};

export const EnergiesSelectors = {
    EnergyAmount: createSelector(
        DropdownItemFeatureSelector,
        (state: DropdownItemStoreState) => state.energies.value || 0
    ),
};

export const GemsSelectors = {
    GemAmount: createSelector(
        DropdownItemFeatureSelector,
        (state: DropdownItemStoreState) => state.gems.value || 0
    ),
};
