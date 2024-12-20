/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { Course, Quest, SubjectUnit } from '@libs/models';
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
            } as Quest,
        ]);
    }

    getCourseById(courseId: string): Observable<Course> {
        return of({
            name: 'Đề THPTQG Môn Toán',
            subject: {
                name: 'Toán',
                description: 'Chương trình của bộ giáo dục',
            },
            units: [
                {
                    id: 213,
                    title: 'Đạo hàm',
                    subUnits: [
                        {
                            title: 'Khái niệm',
                            description: 'Khái niệm',
                        },
                        {
                            title: 'Vi phân',
                            description: 'Vi phân',
                        },
                        {
                            title: 'Ứng dụng của đạo hàm',
                            description: 'Ứng dụng của đạo hàm',
                        },
                    ],
                } as SubjectUnit,
                {
                    id: 234,
                    title: 'Hàm số',
                    subUnits: [
                        {
                            title: 'Giới thiệu về hàm số',
                            description: 'Giới thiệu về hàm số',
                        },
                        {
                            title: 'Hàm bậc 1',
                            description: 'Hàm bậc 1',
                        },
                        {
                            title: 'Hàm bậc 2',
                            description: 'Hàm bậc 2',
                        },
                        {
                            title: 'Hàm bậc 3',
                            description: 'Hàm bậc 3',
                        },
                    ],
                } as SubjectUnit,
            ],
        } as Course);
    }
}
