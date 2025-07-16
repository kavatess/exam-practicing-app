import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { PracticeStoreState } from './store/practice.reducer';
import { PracticeActions } from './store/practice.actions';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { APP_ROUTES } from '../../app.routes';
import { PracticeSelectors } from './store/practice.selectors';
import { QuestionStates } from '@libs/models';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { QuestionTypes } from '@libs/models';
import {
    FormControl,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { map } from 'rxjs';
import { EnergiesSelectors } from '../dashboard/store/dashboard.selectors';

@Component({
    selector: 'epa-practice',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatRadioModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    templateUrl: './practice.component.html',
    styleUrl: './practice.component.scss',
})
export class PracticeComponent implements OnInit {
    readonly QuestionStates = QuestionStates;
    readonly QuestionTypes = QuestionTypes;

    readonly answer = new FormControl(null, [Validators.required]);

    constructor(
        private readonly store: Store<PracticeStoreState>,
        private readonly route: ActivatedRoute,
        private readonly router: Router
    ) {}

    get practiceTestId() {
        return this.route.snapshot.paramMap.get('practiceId') as string;
    }

    get practiceTest$() {
        return this.store.select(PracticeSelectors.PracticeExam);
    }

    get currIndex$() {
        return this.store.select(PracticeSelectors.CurrIndex);
    }

    get currQuestion$() {
        return this.store.select(PracticeSelectors.CurrQuestion);
    }

    get questionList$() {
        return this.store.select(PracticeSelectors.Questions);
    }

    get progress$() {
        return this.questionList$.pipe(
            map((questions) => {
                const answeredCount = questions.filter(
                    (q) => q.state !== QuestionStates.NotAnswered
                ).length;
                return (answeredCount / questions.length) * 100;
            })
        );
    }

    get energies$() {
        return this.store.select(EnergiesSelectors.EnergyAmount);
    }

    get isCorrect$() {
        return this.store.select(PracticeSelectors.IsCorrect);
    }

    get isLastQuestion$() {
        return this.store.select(PracticeSelectors.IsLastQuestion);
    }

    ngOnInit(): void {
        this.store.dispatch(PracticeActions.initPractice());
        this.store.dispatch(
            PracticeActions.getPracticeExam({
                practiceId: this.practiceTestId,
            })
        );
    }

    backToDashboard() {
        this.router.navigate([APP_ROUTES.DASHBOARD]);
    }

    closePracticeTest() {
        const confirm = window.confirm(
            'Are you sure you want to close the practice test?'
        );
        if (confirm) this.router.navigate([APP_ROUTES.DASHBOARD]);
    }

    checkAnswer() {
        this.store.dispatch(
            PracticeActions.checkAnswer({ answer: this.answer.value })
        );
    }

    skipQuestion() {
        this.store.dispatch(PracticeActions.skipQuestion());
        this.answer.setValue(null);
    }

    continue() {
        this.store.dispatch(PracticeActions.continue());
        this.answer.setValue(null);
    }
}
