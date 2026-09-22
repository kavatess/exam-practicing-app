import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DrawerShellComponent } from '../../../../shared/components/drawer-shell/drawer-shell.component';
import {
    AdminUser,
    avatarTone,
    initials,
    UserRole,
    UserStatus,
} from '../../../../shared/models/cms.model';
import { UserProfile } from '../../store/user-management.service';

@Component({
    selector: 'adm-user-drawer',
    standalone: true,
    imports: [DrawerShellComponent],
    templateUrl: './user-drawer.component.html',
    styleUrl: './user-drawer.component.scss',
})
export class UserDrawerComponent {
    @Input({ required: true }) user!: AdminUser;
    @Input() profile: UserProfile | null = null;

    @Output() dismiss = new EventEmitter<void>();
    @Output() setStatus = new EventEmitter<UserStatus>();
    @Output() setRole = new EventEmitter<UserRole>();

    get avatar(): { bg: string; fg: string; abbr: string } {
        const [bg, fg] = avatarTone(this.user.name);
        return { bg, fg, abbr: initials(this.user.name) };
    }

    get active(): boolean {
        return this.user.status === 'Active';
    }

    get isAdmin(): boolean {
        return this.user.role === 'Admin';
    }

    get suspendLabel(): string {
        return this.active ? 'Deactivate' : 'Reactivate';
    }

    get roleLabel(): string {
        return this.isAdmin ? 'Demote to user' : 'Promote to admin';
    }

    toggleStatus(): void {
        this.setStatus.emit(this.active ? 'Inactive' : 'Active');
    }

    toggleRole(): void {
        this.setRole.emit(this.isAdmin ? 'User' : 'Admin');
    }
}
