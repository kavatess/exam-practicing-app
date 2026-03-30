import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TestStoreState } from './test.reducer';
import { TestPage } from '@libs/models';

// Feature Key
export const testStoreKey = 'Test';

// Base Selectors
export const testFeatureSelector =
    createFeatureSelector<TestStoreState>(testStoreKey);

const TestData = createSelector(
    testFeatureSelector,
    (state: TestStoreState) => state.data
);

const Pages = createSelector(TestData, (data) => data?.pages || []);

// Derived Selectors
const TotalQuestions = createSelector(Pages, (pages) =>
    pages.reduce((acc, page) => acc + (page.questions?.length || 0), 0)
);

const AnsweredQuestionsCount = createSelector(
    Pages,
    (pages) =>
        pages
            .flatMap((p) => p.questions)
            .filter(
                (q) =>
                    q.userAnswer !== undefined &&
                    q.userAnswer !== null &&
                    q.userAnswer !== ''
            ).length
);

const Progress = createSelector(
    TotalQuestions,
    AnsweredQuestionsCount,
    (total, answered) => (total > 0 ? (answered / total) * 100 : 0)
);

const UnansweredQuestions = createSelector(Pages, (pages) => {
    const unanswered = [];
    pages.forEach((page: TestPage, pIndex: number) => {
        page.questions.forEach((q, qIndex) => {
            if (
                q.userAnswer === undefined ||
                q.userAnswer === null ||
                q.userAnswer === ''
            ) {
                unanswered.push({
                    pageIndex: pIndex,
                    pageName: page.name,
                    questionIndex: qIndex + 1,
                    questionId: q.questionId,
                });
            }
        });
    });
    return unanswered;
});

const SubmitLoading = createSelector(
    testFeatureSelector,
    (state: TestStoreState) => state.submitLoading
);

export const TestSelectors = {
    TestData,
    Pages,
    TotalQuestions,
    AnsweredQuestionsCount,
    Progress,
    UnansweredQuestions,
    SubmitLoading,
};
