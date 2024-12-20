import { createReducer, on } from '@ngrx/store';
import { Course, Quest } from '@libs/models';
import {
    CourseActions,
    EnergyActions,
    GemActions,
    QuestActions,
    StreakActions,
} from './dashboard.actions';

export interface DashboardStoreState {
    streak: {
        streakDays: number;
    };
    energies: {
        value: number;
    };
    gems: {
        value: number;
    };
    quests: {
        list: Quest[];
        length: number;
    };
    course: {
        selectedCourseId: string;
        data: Course;
    };
}

export const initialState: DashboardStoreState = {
    streak: {
        streakDays: 0,
    },
    energies: {
        value: 0,
    },
    gems: {
        value: 0,
    },
    quests: {
        list: [],
        length: 0,
    },
    course: {
        selectedCourseId: 'abc',
        data: null,
    },
};

export const dashboardReducer = createReducer(
    initialState,
    // Dropdown Events
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
    })),

    // Quest Events
    on(QuestActions.getQuestsSuccess, (state, { list }) => ({
        ...state,
        quests: {
            ...state.quests,
            list,
            length: list.length,
        },
    })),

    // Course Events
    on(CourseActions.getCourseSuccess, (state, { data }) => ({
        ...state,
        course: {
            ...state.course,
            data,
        },
    }))
);
