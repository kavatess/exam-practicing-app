import { Route } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { dashboardStoreKey } from './routes/dashboard/store/dashboard.selectors';
import { dashboardReducer } from './routes/dashboard/store/dashboard.reducer';
import { DashboardEffects } from './routes/dashboard/store/dashboard.effects';
import { libraryStoreKey } from './routes/library/store/library.selectors';
import { libraryReducer } from './routes/library/store/library.reducer';
import { LibraryEffects } from './routes/library/store/library.effects';
import { courseStoreKey } from './routes/course/store/course.selectors';
import { courseReducer } from './routes/course/store/course.reducer';
import { CourseEffects } from './routes/course/store/course.effects';

export enum APP_ROUTES {
    LOGIN = 'login',
    DASHBOARD = 'dashboard',
    LIBRARY = 'library',
    COURSE = 'course',
    TEST = 'test',
    PRACTICE = 'practice',
    SHOP = 'shop',
    PROFILE = 'profile',
}

export const appRoutes: Route[] = [
    // {
    //     path: '',
    //     redirectTo: `/${APP_ROUTES.DASHBOARD}`,
    // },
    {
        path: APP_ROUTES.LOGIN,
        loadComponent: () =>
            import('./routes/login/login.component').then(
                (c) => c.LoginComponent
            ),
    },
    {
        path: APP_ROUTES.DASHBOARD,
        loadComponent: () =>
            import('./routes/dashboard/dashboard.component').then(
                (c) => c.DashboardComponent
            ),
        providers: [
            provideState({
                name: dashboardStoreKey,
                reducer: dashboardReducer,
            }),
            provideEffects(DashboardEffects),
        ],
    },
    {
        path: APP_ROUTES.LIBRARY,
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./routes/library/library.component').then(
                        (c) => c.LibraryComponent
                    ),
                providers: [
                    provideState({
                        name: libraryStoreKey,
                        reducer: libraryReducer,
                    }),
                    provideEffects(LibraryEffects),
                ],
            },
            {
                path: ':courseId',
                loadComponent: () =>
                    import('./routes/course/course.component').then(
                        (c) => c.CourseComponent
                    ),
                providers: [
                    provideState({
                        name: dashboardStoreKey,
                        reducer: dashboardReducer,
                    }),
                    provideEffects(DashboardEffects),
                    provideState({
                        name: courseStoreKey,
                        reducer: courseReducer,
                    }),
                    provideEffects(CourseEffects),
                ],
            },
        ],
    },
    {
        path: APP_ROUTES.COURSE,
        loadComponent: () =>
            import('./routes/course/course.component').then(
                (c) => c.CourseComponent
            ),
    },
    {
        path: APP_ROUTES.TEST,
        children: [
            {
                path: ':testId',
                loadComponent: () =>
                    import('./routes/test/test.component').then(
                        (c) => c.TestComponent
                    ),
            },
        ],
    },
    {
        path: APP_ROUTES.PRACTICE,
        loadComponent: () =>
            import('./routes/practice/practice.component').then(
                (c) => c.PracticeComponent
            ),
    },
    {
        path: APP_ROUTES.SHOP,
        loadComponent: () =>
            import('./routes/shop/shop.component').then((c) => c.ShopComponent),
    },
    {
        path: APP_ROUTES.PROFILE,
        loadComponent: () =>
            import('./routes/profile/profile.component').then(
                (c) => c.ProfileComponent
            ),
    },
];
