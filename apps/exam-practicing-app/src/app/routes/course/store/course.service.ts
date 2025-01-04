/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { Course, Pagination, SubjectUnit, Test } from '@libs/models';
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
                            stats: {
                                completedQuestions: 100,
                                correctAnswers: 75,
                                incorrectAnswers: 25,
                                difficulties: [
                                    {
                                        correct: 30,
                                    },
                                    {
                                        correct: 25,
                                    },
                                    {
                                        correct: 20,
                                    },
                                    {
                                        correct: 10,
                                    },
                                ],
                                avgScore: 750,
                            },
                        },
                        {
                            title: 'Vi phân',
                            description: 'Vi phân',
                            iconUrl:
                                'https://i.ibb.co/D8T0ndv/function-2628251.png',
                            stats: {
                                completedQuestions: 100,
                                correctAnswers: 65,
                                incorrectAnswers: 35,
                                difficulties: [
                                    {
                                        correct: 30,
                                    },
                                    {
                                        correct: 25,
                                    },
                                    {
                                        correct: 20,
                                    },
                                    {
                                        correct: 10,
                                    },
                                ],
                                avgScore: 650,
                            },
                        },
                        {
                            title: 'Ứng dụng của đạo hàm',
                            description: 'Ứng dụng của đạo hàm',
                            iconUrl:
                                'https://i.ibb.co/D8T0ndv/function-2628251.png',
                            stats: {
                                completedQuestions: 100,
                                correctAnswers: 85,
                                incorrectAnswers: 15,
                                difficulties: [
                                    {
                                        correct: 30,
                                    },
                                    {
                                        correct: 25,
                                    },
                                    {
                                        correct: 20,
                                    },
                                    {
                                        correct: 30,
                                    },
                                ],
                                avgScore: 850,
                            },
                        },
                    ],
                    iconUrl: 'https://i.ibb.co/BfSBYGN/derivative-icon.png',
                    stats: {
                        completedQuestions: 300,
                        correctAnswers: 225,
                        incorrectAnswers: 75,
                        difficulties: [
                            {
                                correct: 90,
                            },
                            {
                                correct: 75,
                            },
                            {
                                correct: 60,
                            },
                            {
                                correct: 10,
                            },
                        ],
                        avgScore: 700,
                    },
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
                            stats: {
                                completedQuestions: 100,
                                correctAnswers: 75,
                                incorrectAnswers: 25,
                                difficulties: [
                                    {
                                        correct: 30,
                                    },
                                    {
                                        correct: 25,
                                    },
                                    {
                                        correct: 20,
                                    },
                                    {
                                        correct: 10,
                                    },
                                ],
                                avgScore: 750,
                            },
                        },
                        {
                            title: 'Hàm bậc 1',
                            description: 'Hàm bậc 1',
                            iconUrl:
                                'https://i.ibb.co/D8T0ndv/function-2628251.png',
                            stats: {
                                completedQuestions: 50,
                                correctAnswers: 25,
                                incorrectAnswers: 25,
                                difficulties: [
                                    {
                                        correct: 30,
                                    },
                                    {
                                        correct: 25,
                                    },
                                    {
                                        correct: 20,
                                    },
                                    {
                                        correct: 10,
                                    },
                                ],
                                avgScore: 500,
                            },
                        },
                        {
                            title: 'Hàm bậc 2',
                            description: 'Hàm bậc 2',
                            iconUrl:
                                'https://i.ibb.co/D8T0ndv/function-2628251.png',
                            stats: {
                                completedQuestions: 100,
                                correctAnswers: 75,
                                incorrectAnswers: 25,
                                difficulties: [
                                    {
                                        correct: 30,
                                    },
                                    {
                                        correct: 25,
                                    },
                                    {
                                        correct: 20,
                                    },
                                    {
                                        correct: 10,
                                    },
                                ],
                                avgScore: 750,
                            },
                        },
                        {
                            title: 'Hàm bậc 3',
                            description: 'Hàm bậc 3',
                            iconUrl:
                                'https://i.ibb.co/D8T0ndv/function-2628251.png',
                            stats: {
                                completedQuestions: 75,
                                correctAnswers: 75,
                                incorrectAnswers: 0,
                                difficulties: [
                                    {
                                        correct: 30,
                                    },
                                    {
                                        correct: 25,
                                    },
                                    {
                                        correct: 20,
                                    },
                                    {
                                        correct: 10,
                                    },
                                ],
                                avgScore: 1000,
                            },
                        },
                    ],
                    iconUrl: 'https://i.ibb.co/BfSBYGN/derivative-icon.png',
                    stats: {
                        completedQuestions: 300,
                        correctAnswers: 75,
                        incorrectAnswers: 225,
                        difficulties: [
                            {
                                correct: 30,
                            },
                            {
                                correct: 25,
                            },
                            {
                                correct: 20,
                            },
                            {
                                correct: 10,
                            },
                        ],
                        avgScore: 300,
                    },
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
                            stats: {
                                completedQuestions: 45,
                                correctAnswers: 20,
                                incorrectAnswers: 25,
                                difficulties: [
                                    {
                                        correct: 30,
                                    },
                                    {
                                        correct: 25,
                                    },
                                    {
                                        correct: 20,
                                    },
                                    {
                                        correct: 10,
                                    },
                                ],
                                avgScore: 400,
                            },
                        },
                    ],
                    iconUrl: 'https://i.ibb.co/BfSBYGN/derivative-icon.png',
                    stats: {
                        completedQuestions: 45,
                        correctAnswers: 20,
                        incorrectAnswers: 25,
                        difficulties: [
                            {
                                correct: 30,
                            },
                            {
                                correct: 25,
                            },
                            {
                                correct: 20,
                            },
                            {
                                correct: 10,
                            },
                        ],
                        avgScore: 400,
                    },
                } as SubjectUnit,
            ],
            stats: {
                difficulties: [
                    {
                        questionTypes: {
                            MultipleChoice: {
                                correct: 50,
                            },
                            Matching: {
                                correct: 30,
                            },
                            TrueFalse: {
                                correct: 20,
                            },
                        },
                    },
                    {
                        questionTypes: {
                            MultipleChoice: {
                                correct: 40,
                            },
                            Matching: {
                                correct: 20,
                            },
                            TrueFalse: {
                                correct: 21,
                            },
                        },
                    },
                    {
                        questionTypes: {
                            MultipleChoice: {
                                correct: 20,
                            },
                            Matching: {
                                correct: 25,
                            },
                            TrueFalse: {
                                correct: 5,
                            },
                        },
                    },
                    {
                        questionTypes: {
                            MultipleChoice: {
                                correct: 2,
                            },
                            Matching: {
                                correct: 2,
                            },
                            TrueFalse: {
                                correct: 1,
                            },
                        },
                    },
                ],
                todayTestsCompleted: 66,
                currStudierCount: 12,
                completedQuestions: 50,
                totalQuestions: 5000,
                avgScore: 450,
                evaluations: {
                    strengths: `
                    <ul>
                        <li class="epa-stats-text">
                            Bạn đã hoàn thành khá tốt
                            các bài toán của chương Đạo
                            hàm từ cơ bản đến nâng cao.
                        </li>

                        <li class="epa-stats-text">
                            Bên cạnh đó, tỷ lệ trả lời
                            chính xác các câu hỏi
                            multiple choice của bạn khá
                            cao, đặc biệt ở chương Tích
                            phân.
                        </li>
                    </ul>`,
                    weaknesses: `
                    <ul>
                        <li class="epa-stats-text">
                            Bạn hiện tại chưa thể
                            hiện tốt ở các bài toán
                            của chương Tích phân và
                            Hàm số, đặc biệt là
                            chương Hàm số.
                        </li>

                        <li class="epa-stats-text">
                            Bạn vẫn còn làm sai
                            những câu hỏi lý thuyết,
                            áp dụng cơ bản ở tất cả
                            các chương, đặc biệt là
                            dạng câu hỏi True/False.
                        </li>
                    </ul>`,
                    threats: `
                    <ul>
                        <li class="epa-stats-text">
                            Thống kê cho thấy hơn
                            80% học sinh thể hiện
                            không tốt ở chương Hàm
                            số, cũng thể hiện không
                            tốt ở chương Tích phân.
                        </li>

                        <li class="epa-stats-text">
                            Bạn vẫn còn làm sai
                            những câu hỏi lý thuyết,
                            áp dụng cơ bản ở tất cả
                            các chương.
                        </li>
                    </ul>`,
                    opportunities: `
                    <ul>
                        <li class="epa-stats-text">
                            Bạn khá vững lý thuyết
                            và giải tốt các bài toán
                            cơ bản ở chương Hàm số,
                            do đó bạn có thể nhanh
                            chóng cải thiện chương
                            này nếu luyện tập bền
                            bỉ.
                        </li>

                        <li class="epa-stats-text">
                            Bạn thể hiện rất tốt ở
                            chương Đạo hàm, đây là
                            nền tảng vững chắc giúp
                            bạn làm tốt chương Tích
                            phân.
                        </li>
                    </ul>`,
                },
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
