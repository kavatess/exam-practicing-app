import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    AdminUser,
    avatarTone,
    initials,
    UserRole,
    UserStatus,
} from '../../../../shared/models/cms.model';

@Component({
    selector: 'adm-user-table',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './user-table.component.html',
    styleUrl: './user-table.component.scss',
})
export class UserTableComponent {
    @Input() users: AdminUser[] = [];
    @Input() total = 0;
    @Input() role: UserRole | null = null;
    @Input() status: UserStatus | null = null;
    @Input() search = '';

    @Output() roleChange = new EventEmitter<UserRole | null>();
    @Output() statusChange = new EventEmitter<UserStatus | null>();
    @Output() searchChange = new EventEmitter<string>();
    @Output() openUser = new EventEmitter<AdminUser>();
    @Output() exportCsv = new EventEmitter<void>();

    readonly roles: (UserRole | null)[] = [null, 'User', 'Admin'];
    readonly statuses: (UserStatus | null)[] = [null, 'Active', 'Inactive'];

    get countLabel(): string {
        return `Showing ${this.users.length} of ${this.total.toLocaleString(
            'en-US'
        )} users`;
    }

    avatar(user: AdminUser): { bg: string; fg: string; abbr: string } {
        const [bg, fg] = avatarTone(user.name);
        return { bg, fg, abbr: initials(user.name) };
    }

    roleLabel(role: UserRole | null): string {
        return role ?? 'All';
    }

    statusLabel(status: UserStatus | null): string {
        return status ?? 'All';
    }
}
