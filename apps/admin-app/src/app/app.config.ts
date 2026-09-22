import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { appRoutes } from './app.routes';
import { CatalogEffects } from './routes/catalog/store/catalog.effects';
import { catalogReducer } from './routes/catalog/store/catalog.reducer';
import { catalogStoreKey } from './routes/catalog/store/catalog.selectors';
import { CurrenciesEffects } from './routes/currencies/store/currencies.effects';
import { currenciesReducer } from './routes/currencies/store/currencies.reducer';
import { currenciesStoreKey } from './routes/currencies/store/currencies.selectors';
import { DashboardEffects } from './routes/dashboard/store/dashboard.effects';
import { dashboardReducer } from './routes/dashboard/store/dashboard.reducer';
import { dashboardStoreKey } from './routes/dashboard/store/dashboard.selectors';
import { ExamsEffects } from './routes/exams/store/exams.effects';
import { examsReducer } from './routes/exams/store/exams.reducer';
import { examsStoreKey } from './routes/exams/store/exams.selectors';
import { QuestionBankEffects } from './routes/question-bank/store/question-bank.effects';
import { questionBankReducer } from './routes/question-bank/store/question-bank.reducer';
import { questionBankStoreKey } from './routes/question-bank/store/question-bank.selectors';
import { OrdersPaymentsEffects } from './routes/orders-payments/store/orders-payments.effects';
import { ordersPaymentsReducer } from './routes/orders-payments/store/orders-payments.reducer';
import { ordersPaymentsStoreKey } from './routes/orders-payments/store/orders-payments.selectors';
import { SubjectManagementEffects } from './routes/subject-management/store/subject-management.effects';
import { UserManagementEffects } from './routes/user-management/store/user-management.effects';
import { userManagementReducer } from './routes/user-management/store/user-management.reducer';
import { userManagementStoreKey } from './routes/user-management/store/user-management.selectors';
import { subjectManagementReducer } from './routes/subject-management/store/subject-management.reducer';
import { subjectManagementStoreKey } from './routes/subject-management/store/subject-management.selectors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideStore(),
    // Both features are registered at the root rather than on their lazy
    // routes: the subject taxonomy is shared (exam sections are scoped to its
    // units), and deleting a unit has to reach the exams feature even when the
    // exams page has never been opened.
    provideState(subjectManagementStoreKey, subjectManagementReducer),
    provideState(examsStoreKey, examsReducer),
    provideState(questionBankStoreKey, questionBankReducer),
    provideState(dashboardStoreKey, dashboardReducer),
    provideState(catalogStoreKey, catalogReducer),
    provideState(userManagementStoreKey, userManagementReducer),
    provideState(ordersPaymentsStoreKey, ordersPaymentsReducer),
    provideState(currenciesStoreKey, currenciesReducer),
    provideEffects(
      SubjectManagementEffects,
      ExamsEffects,
      QuestionBankEffects,
      DashboardEffects,
      CatalogEffects,
      UserManagementEffects,
      OrdersPaymentsEffects,
      CurrenciesEffects
    ),
  ],
};
