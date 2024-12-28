/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { Course, Pagination, Quest, SubjectUnit, Test } from '@libs/models';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LibraryService {
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
                            iconUrl:
                                'https://i.ibb.co/D8T0ndv/function-2628251.png',
                        },
                        {
                            title: 'Vi phân',
                            description: 'Vi phân',
                            iconUrl:
                                'https://i.ibb.co/D8T0ndv/function-2628251.png',
                        },
                        {
                            title: 'Ứng dụng của đạo hàm',
                            description: 'Ứng dụng của đạo hàm',
                            iconUrl:
                                'https://i.ibb.co/D8T0ndv/function-2628251.png',
                        },
                    ],
                    iconUrl: 'https://i.ibb.co/BfSBYGN/derivative-icon.png',
                } as SubjectUnit,
                {
                    id: 234,
                    title: 'Hàm số',
                    subUnits: [
                        {
                            title: 'Giới thiệu về hàm số',
                            description: 'Giới thiệu về hàm số',
                            iconUrl:
                                'https://i.ibb.co/D8T0ndv/function-2628251.png',
                        },
                        {
                            title: 'Hàm bậc 1',
                            description: 'Hàm bậc 1',
                            iconUrl:
                                'https://i.ibb.co/D8T0ndv/function-2628251.png',
                        },
                        {
                            title: 'Hàm bậc 2',
                            description: 'Hàm bậc 2',
                            iconUrl:
                                'https://i.ibb.co/D8T0ndv/function-2628251.png',
                        },
                        {
                            title: 'Hàm bậc 3',
                            description: 'Hàm bậc 3',
                            iconUrl:
                                'https://i.ibb.co/D8T0ndv/function-2628251.png',
                        },
                    ],
                    iconUrl: 'https://i.ibb.co/BfSBYGN/derivative-icon.png',
                } as SubjectUnit,
                {
                    id: 265,
                    title: 'Tích phân',
                    subUnits: [
                        {
                            title: 'Nguyên hàm',
                            description: 'Nguyên hàm',
                            iconUrl:
                                'https://i.ibb.co/D8T0ndv/function-2628251.png',
                        },
                    ],
                    iconUrl: 'https://i.ibb.co/BfSBYGN/derivative-icon.png',
                } as SubjectUnit,
            ],
            stats: {
                todayTestsCompleted: 66,
                currStudierCount: 12,
                completedQuestions: 50,
                totalQuestions: 5000,
                avgScore: 450,
            },
        } as Course);
    }

    getTestHistory(
        courseId: string,
        pagination: Pagination
    ): Observable<Test[]> {
        return of([
            {
                id: 1,
                type: 'Standard',
                score: 800,
                createdAt: new Date(),
            } as unknown as Test,
            {
                id: 2,
                type: 'Practice',
                score: 740,
                createdAt: new Date(),
            } as unknown as Test,
            {
                id: 3,
                type: 'Practice',
                score: 900,
                createdAt: new Date(),
            } as unknown as Test,
            {
                id: 4,
                type: 'Standard',
                score: 400,
                createdAt: new Date(),
            } as unknown as Test,
            {
                id: 5,
                type: 'Standard',
                score: 300,
                createdAt: new Date(),
            } as unknown as Test,
        ]);
    }
}
