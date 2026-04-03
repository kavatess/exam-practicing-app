import { createReducer, on } from '@ngrx/store';
import { Course, Pagination, Quest, Test } from '@libs/models';
import {
    CourseActions,
    EnergyActions,
    GemActions,
    QuestActions,
    StreakActions,
} from './dashboard.actions';

export interface DashboardStoreState {
    courses: {
        list: Course[];
        selectedCourseId: string;
        data: Course;
        loading: boolean;
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
    testHistory: {
        loading: boolean;
        list: Test[];
        pagination: Pagination;
    };
}

export const initialState: DashboardStoreState = {
    courses: {
        list: [],
        selectedCourseId: 'abc',
        data: null,
        loading: false,
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
    testHistory: {
        loading: false,
        list: [],
        pagination: {
            page: 1,
            pageSize: 5,
            count: 0,
        },
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
        courses: {
            ...state.courses,
            list,
            data: {
                ...state.courses?.data,
                ...list[0],
            },
        },
    })),
    on(CourseActions.selectCourseSuccess, (state, { data }) => ({
        ...state,
        courses: {
            ...state.courses,
            data,
        },
    })),

    on(CourseActions.getCurrCourseSuccess, (state, { data }) => ({
        ...state,
        courses: {
            ...state.courses,
            data: {
                ...state.courses?.data,
                ...data,
            },
        },
    })),

    // Test History events
    on(CourseActions.getTestHistorySuccess, (state, { list }) => ({
        ...state,
        testHistory: {
            ...state.testHistory,
            list,
        },
    })),
    on(CourseActions.changeHistoryPage, (state, { page }) => ({
        ...state,
        testHistory: {
            ...state.testHistory,
            pagination: {
                ...state.testHistory.pagination,
                page,
            },
        },
    }))
);
