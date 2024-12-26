/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { Course, Quest, SubjectUnit } from '@libs/models';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LibraryService {
    getAvailableCourses(): Observable<Course[]> {
        return of([
            {
                id: 'abc',
                subjectId: '1',
                subject: {
                    name: 'Toán',
                    description: 'Chương trình của bộ giáo dục',
                },
                name: 'Đề THPTQG Môn Toán',
                description: 'Chương trình của bộ giáo dục',
                iconUrl: 'https://i.ibb.co/HFDbM1v/math-test-icon.png',
                units: [
                    {
                        id: 213,
                        title: 'Đạo hàm',
                        iconUrl: 'https://i.ibb.co/BfSBYGN/derivative-icon.png',
                    } as SubjectUnit,
                    {
                        id: 234,
                        title: 'Hàm số',
                        iconUrl: 'https://i.ibb.co/BfSBYGN/derivative-icon.png',
                    } as SubjectUnit,
                    {
                        id: 265,
                        title: 'Tích phân',
                        iconUrl: 'https://i.ibb.co/BfSBYGN/derivative-icon.png',
                    } as SubjectUnit,
                ],
                stats: {
                    currStudierCount: 9,
                    completedQuestions: 100,
                    totalQuestions: 10000,
                    avgScore: 500,
                },
            } as Course,
            {
                id: 'abcd',
                subject: {
                    name: 'Lý',
                    description: 'Chương trình của ĐHQG TPHCM',
                },
                name: 'Đề thi ĐGNL ĐHQG TPHCM',
                description: 'Chương trình của ĐHQG TPHCM',
                iconUrl: 'https://i.ibb.co/HFDbM1v/math-test-icon.png',
                units: [
                    {
                        id: 213,
                        title: 'Đạo hàm',
                        iconUrl: 'https://i.ibb.co/BfSBYGN/derivative-icon.png',
                    } as SubjectUnit,
                    {
                        id: 234,
                        title: 'Hàm số',
                        iconUrl: 'https://i.ibb.co/BfSBYGN/derivative-icon.png',
                    } as SubjectUnit,
                    {
                        id: 265,
                        title: 'Tích phân',
                        iconUrl: 'https://i.ibb.co/BfSBYGN/derivative-icon.png',
                    } as SubjectUnit,
                ],
                stats: {
                    currStudierCount: 12,
                    completedQuestions: 50,
                    totalQuestions: 5000,
                    avgScore: 450,
                },
            } as Course,
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
}
