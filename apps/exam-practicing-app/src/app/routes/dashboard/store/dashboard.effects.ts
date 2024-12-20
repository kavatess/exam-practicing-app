import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, withLatestFrom } from 'rxjs/operators';
import { DashboardService } from './dashboard.service';
import {
    CourseActions,
    EnergyActions,
    GemActions,
    QuestActions,
    StreakActions,
} from './dashboard.actions';
import { Store } from '@ngrx/store';
import { DashboardStoreState } from './dashboard.reducer';
import { CourseSelectors } from './dashboard.selectors';

@Injectable()
export class DashboardEffects {
    private readonly actions$: Actions = inject(Actions);
    private readonly store: Store<DashboardStoreState> = inject(Store<DashboardStoreState>);

    readonly getUserStreakDays$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StreakActions.getStreakDays),
            exhaustMap(() =>
                this.service.getUserStreakDays().pipe(
                    map((streakDays) =>
                        StreakActions.getStreakDaysSuccess({ streakDays })
                    ),
                    catchError((error) =>
                        of(StreakActions.getStreakDaysFailure({ error }))
                    )
                )
            )
        )
    );

    readonly getUserEnergyAmount$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EnergyActions.getEnergyAmount),
            exhaustMap(() =>
                this.service.getUserEnergyAmount().pipe(
                    map((energy) =>
                        EnergyActions.getEnergyAmountSuccess({ value: energy })
                    ),
                    catchError((error) =>
                        of(EnergyActions.getEnergyAmountFailure({ error }))
                    )
                )
            )
        )
    );

    readonly getUserGemAmount$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GemActions.getGemAmount),
            exhaustMap(() =>
                this.service.getUserGemAmount().pipe(
                    map((gem) =>
                        GemActions.getGemAmountSuccess({ value: gem })
                    ),
                    catchError((error) =>
                        of(GemActions.getGemAmountFailure({ error }))
                    )
                )
            )
        )
    );

    readonly getQuests$ = createEffect(() =>
        this.actions$.pipe(
            ofType(QuestActions.getQuests),
            exhaustMap(() =>
                this.service.getUserQuests().pipe(
                    map((list) => QuestActions.getQuestsSuccess({ list })),
                    catchError((error) =>
                        of(QuestActions.getQuestsFailure({ error }))
                    )
                )
            )
        )
    );

    readonly getCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CourseActions.getCourse),
            withLatestFrom(this.store.select(CourseSelectors.SelectedCourseId)),
            exhaustMap(([, selectedCourseId]) =>
                this.service.getCourseById(selectedCourseId).pipe(
                    map((data) => CourseActions.getCourseSuccess({ data })),
                    catchError((error) =>
                        of(CourseActions.getCourseFailure({ error }))
                    )
                )
            )
        )
    );

    constructor(private readonly service: DashboardService) {}
}
