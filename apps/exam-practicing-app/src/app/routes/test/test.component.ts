import {
    Component,
    OnInit,
    OnDestroy,
    ViewChildren,
    QueryList,
    ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { TestStoreState } from './store/test.reducer';
import { TestActions } from './store/test.actions';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TestSelectors } from './store/test.selectors';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import {
    FormsModule,
    ReactiveFormsModule,
    FormBuilder,
    FormGroup,
    FormControl,
} from '@angular/forms';
import {
    Observable,
    Subscription,
    interval,
    combineLatest,
    BehaviorSubject,
} from 'rxjs';
import {
    map,
    takeWhile,
    filter,
    distinctUntilChanged,
    take,
} from 'rxjs/operators';
import { QuestionTypes, Test, TestPage } from '@libs/models';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CloseTestPopupComponent } from './close-test-popup/close-test-popup.component';

interface UnansweredQuestion {
    pageIndex: number;
    pageName: string;
    questionIndex: number;
    questionId: string;
}

@Component({
    selector: 'epa-test',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatIconModule,
        MatButtonModule,
        MatProgressBarModule,
        MatRadioModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    templateUrl: './test.component.html',
    styleUrl: './test.component.scss',
})
export class TestComponent implements OnInit, OnDestroy {
    isMenuVisible = true;
    remainingTime = 0;
    timerSubscription?: Subscription;

    // State for current page (Part)
    private _currentPageIndex = new BehaviorSubject<number>(0);
    currentPageIndex$ = this._currentPageIndex.asObservable();

    // State for active question (for highlighting in sidebar)
    activeQuestionId: string | null = null;

    QuestionTypes = QuestionTypes;

    // Form to hold all answers
    testForm: FormGroup;
    formSubscriptions: Subscription[] = [];

    // To scroll to questions
    @ViewChildren('questionItem') questionElements!: QueryList<ElementRef>;

    // For submission modal
    unansweredQuestions$: Observable<UnansweredQuestion[]>;
    private submissionModal?: NgbModalRef;

    // Selectors from store
    test$: Observable<Test | null>;
    pages$: Observable<TestPage[]>;
    progress$: Observable<number>;
    totalQuestions$: Observable<number>;
    loading$: Observable<boolean>;

    constructor(
        private readonly store: Store<TestStoreState>,
        private readonly router: ActivatedRoute,
        private fb: FormBuilder,
        private modalService: NgbModal
    ) {
        this.testForm = this.fb.group({});

        // Initialize observables here where `this.store` is available
        this.test$ = this.store.select(TestSelectors.TestData);
        this.pages$ = this.store.select(TestSelectors.Pages);
        this.progress$ = this.store.select(TestSelectors.Progress);
        this.totalQuestions$ = this.store.select(TestSelectors.TotalQuestions);
        this.unansweredQuestions$ = this.store.select(
            TestSelectors.UnansweredQuestions
        );
        this.loading$ = this.store.select(TestSelectors.SubmitLoading);
    }

    get testId() {
        return this.router.snapshot.paramMap.get('testId') as string;
    }

    get currentPage$() {
        return combineLatest([this.pages$, this.currentPageIndex$]).pipe(
            map(([pages, index]) => pages[index])
        );
    }

    ngOnInit(): void {
        this.store.dispatch(TestActions.getTest({ testId: this.testId }));
        this.initTimer();
        this.initForm();
    }

    ngOnDestroy(): void {
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
        }
        this.formSubscriptions.forEach((sub) => sub.unsubscribe());
    }

    private initTimer(): void {
        this.test$
            .pipe(
                filter((t) => !!t),
                takeWhile(() => !this.timerSubscription)
            )
            .subscribe((test) => {
                if (test && test.duration) {
                    this.remainingTime = test.duration * 60;
                    this.startTimer();
                } else {
                    this.remainingTime = 60 * 60; // Default to 60 mins if not provided
                    this.startTimer();
                }
            });
    }

    private initForm(): void {
        this.test$
            .pipe(
                filter((t) => !!t),
                takeWhile(
                    () => Object.keys(this.testForm.controls).length === 0
                ) // Only initialize once
            )
            .subscribe((test) => {
                if (test && test.pages) {
                    test.pages.forEach((page, pIndex) => {
                        page.questions.forEach((q, qIndex) => {
                            const controlName = this.getControlName(
                                pIndex,
                                qIndex
                            );
                            const control = new FormControl(q.userAnswer);
                            this.testForm.addControl(controlName, control);

                            // Subscribe to individual control changes
                            const sub = control.valueChanges
                                .pipe(distinctUntilChanged())
                                .subscribe((value) => {
                                    this.store.dispatch(
                                        TestActions.fetchQuestionAnswer({
                                            pIndex,
                                            qIndex,
                                            answer: value,
                                        })
                                    );
                                });
                            this.formSubscriptions.push(sub);
                        });
                    });
                }
            });
    }

    startTimer() {
        this.timerSubscription = interval(1000).subscribe(() => {
            if (this.remainingTime > 0) {
                this.remainingTime--;
            } else {
                this.timerSubscription?.unsubscribe();
            }
        });
    }

    get formattedTime(): string {
        const minutes = Math.floor(this.remainingTime / 60);
        const seconds = this.remainingTime % 60;
        return `${this.pad(minutes)}:${this.pad(seconds)}`;
    }

    pad(val: number): string {
        return val < 10 ? `0${val}` : val.toString();
    }

    toggleMenu() {
        this.isMenuVisible = !this.isMenuVisible;
    }

    setPage(index: number) {
        this._currentPageIndex.next(index);
        const mainContent = document.querySelector('.epa-test-main');
        if (mainContent) {
            mainContent.scrollTop = 0;
        }

        // Reset active question to the first one on the new page
        this.pages$.pipe(take(1)).subscribe((pages) => {
            const newPage = pages[index];
            if (newPage && newPage.questions && newPage.questions.length > 0) {
                this.activeQuestionId = newPage.questions[0].questionId;
            } else {
                this.activeQuestionId = null;
            }
        });
    }

    nextPage() {
        this.pages$.pipe(take(1)).subscribe((pages) => {
            const current = this._currentPageIndex.value;
            if (current < pages.length - 1) {
                this.setPage(current + 1);
            }
        });
    }

    prevPage() {
        const current = this._currentPageIndex.value;
        if (current > 0) {
            this.setPage(current - 1);
        }
    }

    jumpToQuestion(pageIndex: number, questionId: string) {
        // If not on the correct page, switch to it. `setPage` will handle resetting the active question.
        if (this._currentPageIndex.value !== pageIndex) {
            this.setPage(pageIndex);
        }
        // Set the specific active question
        this.activeQuestionId = questionId;

        setTimeout(() => {
            const element = document.getElementById(`question-${questionId}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    }

    submitExam(content: any) {
        this.submissionModal = this.modalService.open(content, {
            centered: true,
            backdrop: 'static',
        });
    }

    confirmSubmit() {
        this.store.dispatch(TestActions.submitTest());
    }

    jumpToQuestionFromModal(pageIndex: number, questionId: string) {
        if (this.submissionModal) {
            this.submissionModal.close();
        }
        this.jumpToQuestion(pageIndex, questionId);
    }

    closeExam() {
        this.modalService.open(CloseTestPopupComponent, { centered: true });
    }

    // Helper to get control name
    getControlName(pIndex: number, qIndex: number): string {
        return `p${pIndex}_q${qIndex}`;
    }
}
