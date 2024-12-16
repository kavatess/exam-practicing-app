import { createReducer, on } from '@ngrx/store';
import {
    EnergyActions,
    GemActions,
    StreakActions,
} from './dropdown-item.actions';

export interface DropdownItemStoreState {
    streak: {
        streakDays: number;
    };
    energies: {
        value: number;
    };
    gems: {
        value: number;
    };
}

export const initialState: DropdownItemStoreState = {
    streak: {
        streakDays: 0,
    },
    energies: {
        value: 0,
    },
    gems: {
        value: 0,
    },
};

export const dropdownItemReducer = createReducer(
    initialState,
    on(StreakActions.getStreakDaysSuccess, (state, { streakDays }) => ({
        ...state,
        streak: {
            ...state.streak,
            streakDays,
        },
    })),
    on(EnergyActions.getEnergyAmountSuccess, (state, { value }) => ({
        ...state,
        energies: {
            ...state.streak,
            value,
        },
    })),
    on(GemActions.getGemAmountSuccess, (state, { value }) => ({
        ...state,
        gems: {
            ...state.streak,
            value,
        },
    }))
);
