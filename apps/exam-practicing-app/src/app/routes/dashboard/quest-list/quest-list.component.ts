import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { DashboardStoreState } from '../store/dashboard.reducer';
import { QuestActions } from '../store/dashboard.actions';
import { QuestsSelectors } from '../store/dashboard.selectors';
import { Quest } from '@libs/models';

@Component({
    selector: 'epa-quest-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './quest-list.component.html',
    styleUrl: './quest-list.component.scss',
})
export class QuestListComponent implements OnInit {
    constructor(private readonly store: Store<DashboardStoreState>) {}

    get quests$() {
        return this.store.select(QuestsSelectors.QuestList);
    }

    getQuestPercentage(quest: Quest) {
        return (quest.progress / quest.totalProgress) * 100;
    }

    ngOnInit(): void {
        this.store.dispatch(QuestActions.getQuests());
    }
}
