import { Route } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AuthGuard } from './core/auth.guard';
import { subjectManagementReducer } from './routes/subject-management/store/subject-management.reducer';
import { subjectManagementFeatureKey } from './routes/subject-management/store/subject-management.selectors';
import { SubjectManagementEffects } from './routes/subject-management/store/subject-management.effects';

export enum ADMIN_APP_ROUTES {
    LOGIN = 'login',
    DASHBOARD = 'dashboard',
    SUBJECT_MANAGEMENT = 'subject-management',
    QUESTION_BANK = 'question-bank',
    ACHIEVEMENT_MANAGEMENT = 'achievement-management',
    QUEST_MANAGEMENT = 'quest-management',
    SHOP_MANAGEMENT = 'shop-management',
    USER_MANAGEMENT = 'user-management',
}

export const appRoutes: Route[] = [
    {
        path: ADMIN_APP_ROUTES.LOGIN,
        loadComponent: () =>
            import('./routes/login/login.component').then(
                (c) => c.LoginComponent
            ),
    },
    {
        path: '',
        canActivate: [AuthGuard],
        children: [
            {
                path: ADMIN_APP_ROUTES.DASHBOARD,
                data: { title: 'Dashboard' },
                loadComponent: () =>
                    import('./routes/dashboard/dashboard.component').then(
                        (c) => c.DashboardComponent
                    ),
            },
            {
                path: ADMIN_APP_ROUTES.SUBJECT_MANAGEMENT,
                data: { title: 'Subject Management' },
                providers: [
                    provideState(subjectManagementFeatureKey, subjectManagementReducer),
                    provideEffects(SubjectManagementEffects),
                ],
                loadComponent: () =>
                    import(
                        './routes/subject-management/subject-management.component'
                    ).then((c) => c.SubjectManagementComponent),
            },
            {
                path: ADMIN_APP_ROUTES.QUESTION_BANK,
                data: { title: 'Question Bank' },
                loadComponent: () =>
                    import(
                        './routes/question-bank/question-bank.component'
                    ).then((c) => c.QuestionBankComponent),
            },
            {
                path: ADMIN_APP_ROUTES.ACHIEVEMENT_MANAGEMENT,
                data: { title: 'Achievement Management' },
                loadComponent: () =>
                    import(
                        './routes/achievement-management/achievement-management.component'
                    ).then((c) => c.AchievementManagementComponent),
            },
            {
                path: ADMIN_APP_ROUTES.QUEST_MANAGEMENT,
                data: { title: 'Quest Management' },
                loadComponent: () =>
                    import(
                        './routes/quest-management/quest-management.component'
                    ).then((c) => c.QuestManagementComponent),
            },
            {
                path: ADMIN_APP_ROUTES.SHOP_MANAGEMENT,
                data: { title: 'Shop Management' },
                loadComponent: () =>
                    import(
                        './routes/shop-management/shop-management.component'
                    ).then((c) => c.ShopManagementComponent),
            },
            {
                path: ADMIN_APP_ROUTES.USER_MANAGEMENT,
                data: { title: 'User Management' },
                loadComponent: () =>
                    import(
                        './routes/user-management/user-management.component'
                    ).then((c) => c.UserManagementComponent),
            },
            {
                path: '',
                redirectTo: ADMIN_APP_ROUTES.DASHBOARD,
                pathMatch: 'full',
            },
        ],
    },
];
