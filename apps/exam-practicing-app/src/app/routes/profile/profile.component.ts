import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
import { AlertService } from '../../shared/components/alert/alert.service'; // Import AlertService

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
export class ProfileComponent implements OnInit {
    readonly profile$: Observable<Profile | null>;
    readonly isUploading$: Observable<boolean>;

    @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

    constructor(
        private readonly store: Store<ProfileStoreState>,
        private readonly alertService: AlertService // Inject AlertService
    ) {
        this.profile$ = this.store.select(ProfileSelectors.Data);
        this.isUploading$ = this.store.select(ProfileSelectors.IsUploading);
    }

    ngOnInit(): void {
        this.store.dispatch(ProfileActions.initProfile());
    }

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            if (file.type.startsWith('image/')) {
                this.store.dispatch(ProfileActions.uploadProfilePicture({ file }));
            } else {
                this.alertService.showAlert('Bạn chọn sai định dạng ảnh. Hãy thử lại!', 'danger');
            }
        }
        // Reset the file input to allow selecting the same file again if needed
        input.value = '';
    }

    triggerFileInput(): void {
        this.fileInput.nativeElement.click();
    }
}
