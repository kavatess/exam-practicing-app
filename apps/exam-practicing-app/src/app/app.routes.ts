import { Route } from '@angular/router';

export enum APP_ROUTES{
    LOGIN = 'login',
    DASHBOARD = 'dashboard',
    LIBRARY = 'library',
    TEST = 'test',
    PRACTICE = 'practice',
    SHOP = 'shop',
    PROFILE = 'profile',
}

export const appRoutes: Route[] = [
    {
        path: APP_ROUTES.LOGIN,
        loadChildren: () => import('./routes/login/login.component').then(m => m.LoginComponent),
    },
    {
        path: APP_ROUTES.DASHBOARD,
        loadChildren: () => import('./routes/dashboard/dashboard.component').then(m => m.DashboardComponent),
    },
    {
        path: APP_ROUTES.LIBRARY,
        loadChildren: () => import('./routes/library/library.component').then(m => m.LibraryComponent),
    },
    {
        path: APP_ROUTES.TEST,
        loadChildren: () => import('./routes/test/test.component').then(m => m.TestComponent),
    },
    {
        path: APP_ROUTES.PRACTICE,
        loadChildren: () => import('./routes/practice/practice.component').then(m => m.PracticeComponent),
    },
    {
        path: APP_ROUTES.SHOP,
        loadChildren: () => import('./routes/shop/shop.component').then(m => m.ShopComponent),
    },
    {
        path: APP_ROUTES.PROFILE,
        loadChildren: () => import('./routes/profile/profile.component').then(m => m.ProfileComponent),
    },
];
