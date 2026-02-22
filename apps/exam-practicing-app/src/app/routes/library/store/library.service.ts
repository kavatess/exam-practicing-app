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
}
