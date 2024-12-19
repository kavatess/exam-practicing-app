import { Injectable } from '@angular/core';
import { Quest } from '@libs/models';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DashboardService {
    getUserStreakDays(): Observable<number> {
        return of(1);
    }

    getUserEnergyAmount(): Observable<number> {
        return of(100);
    }

    getUserGemAmount(): Observable<number> {
        return of(195);
    }

    getUserQuests(): Observable<Quest[]> {
        return of([
            {
                type: 'EnergiesEarned',
                name: 'Kiếm 100 energies',
                totalProgress: 100,
                progress: 100,
                iconUrl:
                    'https://d35aaqx5ub95lt.cloudfront.net/images/goals/2b5a211d830a24fab92e291d50f65d1d.svg',
            } as Quest,
            {
                type: 'TestsCompleted',
                name: 'Hoàn thành 2 bài test',
                totalProgress: 2,
                progress: 1,
                iconUrl:
                    'https://d35aaqx5ub95lt.cloudfront.net/images/goals/39f13d2de304cad2ac2f88b31a7e2ff4.svg',
            } as Quest,
            {
                type: 'QuestionsCompleted',
                name: 'Hoàn thành 50 câu hỏi môn Toán',
                totalProgress: 50,
                progress: 40,
                iconUrl:
                    'https://d35aaqx5ub95lt.cloudfront.net/images/goals/39f13d2de304cad2ac2f88b31a7e2ff4.svg',
            } as Quest
        ]);
    }
}
