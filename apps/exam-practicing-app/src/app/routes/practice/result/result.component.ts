import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { PracticeStoreState } from '../store/practice.reducer';
import { APP_ROUTES } from '../../../app.routes';
import { MatIconModule } from '@angular/material/icon';
import { PracticeSelectors } from '../store/practice.selectors';
import { MatButtonModule } from '@angular/material/button';
import { PracticeActions } from '../store/practice.actions';

@Component({
    selector: 'epa-result',
    standalone: true,
    imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule],
    templateUrl: './result.component.html',
    styleUrl: './result.component.scss',
})
export class ResultComponent implements OnInit {
    constructor(
        private readonly store: Store<PracticeStoreState>,
        private readonly router: Router,
        private readonly route: ActivatedRoute
    ) {}

    get practiceId() {
        return this.route.snapshot.paramMap.get('practiceId') || '';
    }

    get evalTxt$() {
        return this.store.select(PracticeSelectors.EvaluationTxt);
    }

    get rewards$() {
        return this.store.select(PracticeSelectors.Rewards);
    }

    ngOnInit(): void {
        this.store.dispatch(PracticeActions.complete());
    }

    backToDashboard() {
        this.router.navigate([APP_ROUTES.DASHBOARD]);
    }

    reviewPractice() {
        this.router.navigate([APP_ROUTES.HISTORY, this.practiceId]);
    }
}
