import {
    ApplicationConfig,
    importProvidersFrom,
    provideZoneChangeDetection,
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimations(),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(appRoutes),
        provideStore(),
        importProvidersFrom(
            StoreDevtoolsModule.instrument({
                maxAge: 25, // Retains last 25 states
                logOnly: true, // Restrict extension to log-only mode
                autoPause: false, // Pauses recording actions and state changes when the extension window is not open
                trace: true, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
                traceLimit: 100, // maximum stack trace frames to be stored (in case trace option was provided as true)
            })
        ),
    ],
};
