import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { DashboardService } from './dashboard.service';
import {
    EnergyActions,
    GemActions,
    QuestActions,
    StreakActions,
} from './dashboard.actions';

@Injectable()
export class DashboardEffects {
    private readonly actions$: Actions = inject(Actions);

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

    constructor(private readonly service: DashboardService) {}
}
