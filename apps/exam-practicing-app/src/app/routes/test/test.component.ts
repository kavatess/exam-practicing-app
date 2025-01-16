import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { TestStoreState } from './store/test.reducer';
import { TestActions } from './store/test.actions';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
    selector: 'epa-test',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './test.component.html',
    styleUrl: './test.component.scss',
})
export class TestComponent implements OnInit {
    constructor(
        private readonly store: Store<TestStoreState>,
        private readonly router: ActivatedRoute
    ) {}

    get testId() {
        return this.router.snapshot.paramMap.get('testId') as string;
    }

    ngOnInit(): void {
        this.store.dispatch(TestActions.getTest({ testId: this.testId }));
    }
}
