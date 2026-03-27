import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { ProfileStoreState } from './store/profile.reducer';
import { Observable } from 'rxjs';
import { Profile } from '@libs/models';
import { ProfileSelectors } from './store/profile.selectors';
import { DropdownItemComponent } from '../dashboard/dropdown-item/dropdown-item.component';
import { QuestListComponent } from '../dashboard/quest-list/quest-list.component';
import { MatIconModule } from '@angular/material/icon';
import { AchievementsComponent } from './achievements/achievements.component';
import { ProfileActions } from './store/profile.actions';

@Component({
    selector: 'epa-profile',
    standalone: true,
    imports: [
        CommonModule,
        DropdownItemComponent,
        QuestListComponent,
        MatIconModule,
        AchievementsComponent,
    ],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit{
    readonly profile$: Observable<Profile>;

    constructor(private readonly store: Store<ProfileStoreState>) {
        this.profile$ = this.store.select(ProfileSelectors.Data);
    }

    ngOnInit(): void {
        this.store.dispatch(ProfileActions.initProfile());
    }
}
