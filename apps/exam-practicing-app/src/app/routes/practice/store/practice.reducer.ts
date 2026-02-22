import {
    PracticeExam,
    PracticeQuestion,
    PracticeResult,
    QuestionStates,
} from '@libs/models';
import { createReducer, on } from '@ngrx/store';
import { PracticeActions } from './practice.actions';

export enum PracticeStates {
    InProgress = 'InProgress',
    CheckingAnswer = 'CheckingAnswer',
    Completed = 'Completed',
}

export interface PracticeStoreState {
    practiceExam: {
        state: PracticeStates;
        loading: boolean;
        data: PracticeExam;
        currIndex: number;
        userAnswer: string;
        isCorrect: boolean | null;
    };
    result: PracticeResult;
}

export const initialState: PracticeStoreState = {
    practiceExam: {
        state: PracticeStates.InProgress,
        loading: false,
        data: null,
        currIndex: 0,
        userAnswer: null,
        isCorrect: null,
    },
    result: {
        evalTxt: '',
        rewards: {
            gems: 0,
            energies: 0,
        },
    },
};

export const practiceReducer = createReducer(
    initialState,
    on(PracticeActions.initPractice, (state) => ({
        ...state,
        practiceExam: {
            ...state.practiceExam,
            currIndex: 0,
            userAnswer: null,
            isCorrect: null,
            state: PracticeStates.InProgress,
        },
    })),
    on(PracticeActions.getPracticeExamSuccess, (state, { data }) => ({
        ...state,
        practiceExam: {
            ...state.practiceExam,
            loading: false,
            data,
            userAnswer: data.questions[0]?.userAnswer || null,
        },
    })),
    on(PracticeActions.nextQuestion, (state) => ({
        ...state,
        practiceExam: {
            ...state.practiceExam,
            currIndex: state.practiceExam.currIndex + 1,
            userAnswer: null,
            isCorrect: null,
            state: PracticeStates.InProgress,
        },
    })),
    on(PracticeActions.skipQuestion, (state) => {
        const currIndex = state.practiceExam.currIndex;
        const currQuestion = state.practiceExam.data.questions[currIndex];
        const newQuestions = [
            ...state.practiceExam.data.questions.slice(0, currIndex),
            ...state.practiceExam.data.questions.slice(currIndex + 1),
            currQuestion,
        ];
        return {
            ...state,
            practiceExam: {
                ...state.practiceExam,
                data: {
                    ...state.practiceExam.data,
                    questions: newQuestions,
                },
                userAnswer: null,
            },
        };
    }),
    on(PracticeActions.checkAnswer, (state, { answer }) => ({
        ...state,
        practiceExam: {
            ...state.practiceExam,
            state: PracticeStates.CheckingAnswer,
            userAnswer: answer,
        },
    })),
    on(PracticeActions.checkAnswerSuccess, (state, { isCorrect }) => ({
        ...state,
        practiceExam: {
            ...state.practiceExam,
            isCorrect,
            data: {
                ...state.practiceExam.data,
                questions: state.practiceExam.data.questions.map(
                    (question: PracticeQuestion, i) => {
                        if (i === state.practiceExam.currIndex) {
                            return {
                                ...question,
                                state: isCorrect
                                    ? QuestionStates.Correct
                                    : QuestionStates.Incorrect,
                            };
                        }
                        return question;
                    }
                ),
            },
        },
    })),
    on(PracticeActions.complete, (state) => ({
        ...state,
        practiceExam: {
            ...state.practiceExam,
            state: PracticeStates.Completed,
        },
    })),
    on(PracticeActions.completeSuccess, (state, { result }) => ({
        ...state,
        result,
    }))
);
