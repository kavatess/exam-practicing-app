import { Route } from '@angular/router';
import { provideState } from '@ngrx/store';
import { dropdownItemStoreKey } from './routes/dashboard/dropdown-item/store/dropdown-item.selectors';
import { dropdownItemReducer } from './routes/dashboard/dropdown-item/store/dropdown-item.reducer';
import { provideEffects } from '@ngrx/effects';
import { DropdownItemEffects } from './routes/dashboard/dropdown-item/store/dropdown-item.effects';

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
                name: dropdownItemStoreKey,
                reducer: dropdownItemReducer,
            }),
            provideEffects(DropdownItemEffects),
        ],
    },
    {
        path: APP_ROUTES.LIBRARY,
        loadComponent: () =>
            import('./routes/library/library.component').then(
                (c) => c.LibraryComponent
            ),
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
        loadComponent: () =>
            import('./routes/test/test.component').then((c) => c.TestComponent),
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
