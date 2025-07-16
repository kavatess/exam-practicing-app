import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { PracticeStoreState } from '../store/practice.reducer';
import { APP_ROUTES } from '../../../app.routes';
import { MatIconModule } from '@angular/material/icon';
import { PracticeSelectors } from '../store/practice.selectors';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'epa-result',
    standalone: true,
    imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule],
    templateUrl: './result.component.html',
    styleUrl: './result.component.scss',
})
export class ResultComponent {
    constructor(
        private readonly store: Store<PracticeStoreState>,
        private readonly router: Router
    ) {}

    get evalTxt$() {
        return this.store.select(PracticeSelectors.EvaluationTxt);
    }

    get rewards$() {
        return this.store.select(PracticeSelectors.Rewards);
    }

    backToDashboard() {
        this.router.navigate([APP_ROUTES.DASHBOARD]);
    }

    reviewPractice() {
        // TODO: Implement review practice
    }
}
