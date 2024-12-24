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
    course: {
        list: Course[];
        selectedCourseId: string;
        data: Course;
    };
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
}

export const initialState: DashboardStoreState = {
    course: {
        list: [],
        selectedCourseId: 'abc',
        data: null,
    },
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
    on(CourseActions.getCoursesSuccess, (state, { list }) => ({
        ...state,
        course: {
            ...state.course,
            list,
            data: list.find(
                (item) => item.id === state.course.selectedCourseId
            ),
        },
    })),
    on(CourseActions.selectCourseSuccess, (state, { data }) => ({
        ...state,
        course: {
            ...state.course,
            data,
        },
    }))
);
