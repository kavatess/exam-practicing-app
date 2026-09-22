import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
    AdminUser,
    UserRole,
    UserStatus,
} from '../../shared/models/cms.model';
import { UserDrawerComponent } from './components/user-drawer/user-drawer.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { UserManagementActions } from './store/user-management.actions';
import { UserManagementSelectors } from './store/user-management.selectors';

@Component({
    selector: 'adm-user-management',
    standalone: true,
    imports: [UserTableComponent, UserDrawerComponent],
    templateUrl: './user-management.component.html',
    styleUrl: './user-management.component.scss',
})
export class UserManagementComponent implements OnInit {
    private readonly store = inject(Store);

    readonly users = this.store.selectSignal(UserManagementSelectors.Users);
    readonly total = this.store.selectSignal(UserManagementSelectors.Total);
    readonly role = this.store.selectSignal(UserManagementSelectors.Role);
    readonly status = this.store.selectSignal(UserManagementSelectors.Status);
    readonly search = this.store.selectSignal(UserManagementSelectors.Search);
    readonly openUser = this.store.selectSignal(
        UserManagementSelectors.OpenUser
    );
    readonly profile = this.store.selectSignal(
        UserManagementSelectors.Profile
    );

    ngOnInit(): void {
        this.store.dispatch(UserManagementActions.loadUsers());
    }

    selectRole(role: UserRole | null): void {
        this.store.dispatch(UserManagementActions.selectRole({ role }));
    }

    selectStatus(status: UserStatus | null): void {
        this.store.dispatch(UserManagementActions.selectStatus({ status }));
    }

    onSearch(search: string): void {
        this.store.dispatch(UserManagementActions.search({ search }));
    }

    open(user: AdminUser): void {
        this.store.dispatch(
            UserManagementActions.openUser({ userId: user.id })
        );
    }

    close(): void {
        this.store.dispatch(UserManagementActions.closeUser());
    }

    setStatus(userId: string, status: UserStatus): void {
        this.store.dispatch(
            UserManagementActions.setStatus({ userId, status })
        );
    }

    setRole(userId: string, role: UserRole): void {
        this.store.dispatch(UserManagementActions.setRole({ userId, role }));
    }

    exportCsv(): void {
        // Export lands with the users API; the button is a placeholder.
    }
}
