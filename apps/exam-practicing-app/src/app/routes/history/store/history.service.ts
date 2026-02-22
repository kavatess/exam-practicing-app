/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import {
    PracticeExam,
    PracticeExamStatuses,
    QuestionStates,
    Result,
    ResultTypes,
    CourseUnit,
} from '@libs/models';
import { map, Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class HistoryService {
    getHistoryList(): Observable<Result[]> {
        return of([]);
    }

    getPracticeResult(practiceId: string): Observable<Result> {
        return of({
            completedAt: new Date(),
            timeUsed: 60,
            testId: '1',
            score: 4,
            maxScore: 5,
            incorrect: 1,
            correct: 4,
            practice: {
                id: '1',
                courseId: 'abc',
                course: {
                    code: 'MATH-THPTQG-2025',
                    name: 'Đề THPTQG Môn Toán',
                    description: 'Chương trình của bộ giáo dục',
                    iconUrl: 'https://i.ibb.co/HFDbM1v/math-test-icon.png',
                },
                unitId: 'def',
                unit: {
                    title: 'Đạo hàm',
                } as CourseUnit,
                subUnitId: 'ghi',
                subUnit: {
                    title: 'Vi phân',
                    description: 'Vi phân',
                    iconUrl: 'https://i.ibb.co/D8T0ndv/function-2628251.png',
                },
                userId: 'jkl',
                title: 'Đề THPTQG Môn Toán - Luyện tập 1',
                status: PracticeExamStatuses.Completed,
                questions: [
                    {
                        id: '123',
                        practiceId: '1',
                        courseId: 'abc',
                        userId: 'jkl',
                        unitId: 'def',
                        questionId: 'zxc',
                        data: {
                            difficulty: 0,
                            type: 'MultipleChoice',
                            level: 'Theoretical',
                            content:
                                'Nguyên hàm của hàm số <i>f(x)=e<sup>x</sup></i> là:',
                            choices: [
                                {
                                    content:
                                        '<math><mfrac><msup><mi>e</mi><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></msup><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></mfrac><mo>+</mo><mi>C</mi></math>',
                                },
                                {
                                    content:
                                        '<math><msup><mi>e</mi><mi>x</mi></msup><mo>+</mo><mi>C</mi></math>',
                                    isCorrect: true,
                                },
                                {
                                    content:
                                        '<math><mfrac><msup><mi>e</mi><mi>x</mi></msup><mi>x</mi></mfrac><mo>+</mo><mi>C</mi></math>',
                                },
                                {
                                    content:
                                        '<math><mi>x</mi><msup><mi>e</mi><mrow><mi>x</mi><mo>-</mo><mn>1</mn></mrow></msup><mo>+</mo><mi>C</mi></math>',
                                },
                            ],
                            answer: 1,
                            solution:
                                'Nguyên hàm của e<sup>x</sup> là e<sup>x</sup> + C.',
                        },
                        state: QuestionStates.Correct,
                        userAnswer: 1,
                        points: 1,
                    },
                    {
                        id: '124',
                        practiceId: '1',
                        courseId: 'abc',
                        userId: 'jkl',
                        unitId: 'def',
                        questionId: 'zxc',
                        data: {
                            difficulty: 1,
                            type: 'MultipleChoice',
                            level: 'Theoretical',
                            content:
                                'Cho hàm số <i>y=f(x)</i> liên tục, nhận giá trị dương trên đoạn [a,b]. Xét hình phẳng (H) giới hạn bởi đồ thị hàm số <i>y=f(x)</i>, trục hoành và hai đường thẳng <i>x=a</i>, <i>x=b</i>, Khối tròn xoay được tạo thành khi quay hình phẳng (H) quanh trục Ox có thể tích là:',
                            choices: [
                                {
                                    content:
                                        '<math><mi>V</mi><mo>=</mo><mi>π</mi><msubsup><mo>∫</mo><mi>a</mi><mi>b</mi></msubsup><mo>|</mo><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>|</mo><mi>d</mi><mi>x</mi></math>',
                                },
                                {
                                    content:
                                        '<math><mi>V</mi><mo>=</mo><msup><mi>π</mi><mn>2</mn></msup><msubsup><mo>∫</mo><mi>a</mi><mi>b</mi></msubsup><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo><mi>d</mi><mi>x</mi></math>',
                                },
                                {
                                    content:
                                        '<math><mi>V</mi><mo>=</mo><msup><mi>π</mi><mn>2</mn></msup><msubsup><mo>∫</mo><mi>a</mi><mi>b</mi></msubsup><mo>[</mo><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo><msup><mo>]</mo><mn>2</mn></msup><mi>d</mi><mi>x</mi></math>',
                                },
                                {
                                    content:
                                        '<math><mi>V</mi><mo>=</mo><mi>π</mi><msubsup><mo>∫</mo><mi>a</mi><mi>b</mi></msubsup><mo>[</mo><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo><msup><mo>]</mo><mn>2</mn></msup><mi>d</mi><mi>x</mi></math>',
                                    isCorrect: true,
                                },
                            ],
                            answer: 3,
                            solution:
                                'Công thức tính thể tích khối tròn xoay khi quay hình phẳng quanh trục Ox là V = π∫<sub>a</sub><sup>b</sup>[f(x)]<sup>2</sup>dx.',
                        },
                        state: QuestionStates.Incorrect,
                        userAnswer: 1,
                        points: 1,
                    },
                    {
                        id: '125',
                        practiceId: '1',
                        courseId: 'abc',
                        userId: 'jkl',
                        unitId: 'def',
                        questionId: 'zxc',
                        data: {
                            difficulty: 2,
                            type: 'MultipleChoice',
                            level: 'CombinedAnalysis',
                            media: [
                                {
                                    type: 'image',
                                    url: 'https://i.ibb.co/Z1F1qFdy/Screenshot-2025-06-27-134826.png',
                                },
                            ],
                            content:
                                'Hai mẫu số liệu ghép nhóm M<sub>1</sub>, M<sub>2</sub> có bảng tần số ghép nhóm như sau:<br/>',
                            choices: [
                                {
                                    content:
                                        '<math><msub><mi>s</mi><mn>1</mn></msub><mo>=</mo><msub><mi>s</mi><mn>2</mn></msub></math>',
                                },
                                {
                                    content:
                                        '<math><msub><mi>s</mi><mn>1</mn></msub><mo>=</mo><mn>2</mn><msub><mi>s</mi><mn>2</mn></msub></math>',
                                },
                                {
                                    content:
                                        '<math><mn>2</mn><msub><mi>s</mi><mn>1</mn></msub><mo>=</mo><msub><mi>s</mi><mn>2</mn></msub></math>',
                                    isCorrect: true,
                                },
                                {
                                    content:
                                        '<math><mn>2</mn><msub><mi>s</mi><mn>1</mn></msub><mo>=</mo><mn>2</mn><msub><mi>s</mi><mn>2</mn></msub></math>',
                                },
                            ],
                            answer: 2,
                            solution:
                                'Dựa vào bảng tần số, ta thấy tần số của M<sub>2</sub> gấp đôi tần số của M<sub>1</sub> ở mỗi nhóm. Do đó, độ lệch chuẩn của M<sub>2</sub> gấp đôi độ lệch chuẩn của M<sub>1</sub>.',
                        },
                        state: QuestionStates.Correct,
                        userAnswer: 2,
                        points: 1,
                    },
                    {
                        id: '126',
                        practiceId: '1',
                        courseId: 'abc',
                        userId: 'jkl',
                        unitId: 'def',
                        questionId: 'zxc',
                        data: {
                            difficulty: 1,
                            type: 'MultipleChoice',
                            level: 'Theoretical',
                            content:
                                'Trong không gian với hệ trục tọa độ Oxyz, phương trình của đường thẳng đi qua điểm <i>M(1;-3;5)</i> và có một vectơ chỉ phương <math><mover><mi>u</mi><mo>→</mo></mover><mo>(</mo><mn>2</mn><mo>;</mo><mo>-</mo><mn>1</mn><mo>;</mo><mn>1</mn><mo>)</mo></math> là:',
                            choices: [
                                {
                                    content:
                                        '<math><mfrac><mrow><mi>x</mi><mo>-</mo><mn>1</mn></mrow><mn>2</mn></mfrac><mo>=</mo><mfrac><mrow><mi>y</mi><mo>-</mo><mn>3</mn></mrow><mrow><mo>-</mo><mn>1</mn></mrow></mfrac><mo>=</mo><mfrac><mrow><mi>z</mi><mo>-</mo><mn>5</mn></mrow><mn>1</mn></mfrac></math>',
                                },
                                {
                                    content:
                                        '<math><mfrac><mrow><mi>x</mi><mo>-</mo><mn>1</mn></mrow><mn>2</mn></mfrac><mo>=</mo><mfrac><mrow><mi>y</mi><mo>-</mo><mn>3</mn></mrow><mrow><mo>-</mo><mn>1</mn></mrow></mfrac><mo>=</mo><mfrac><mrow><mi>z</mi><mo>+</mo><mn>5</mn></mrow><mn>1</mn></mfrac></math>',
                                },
                                {
                                    content:
                                        '<math><mfrac><mrow><mi>x</mi><mo>-</mo><mn>1</mn></mrow><mn>2</mn></mfrac><mo>=</mo><mfrac><mrow><mi>y</mi><mo>+</mo><mn>3</mn></mrow><mrow><mo>-</mo><mn>1</mn></mrow></mfrac><mo>=</mo><mfrac><mrow><mi>z</mi><mo>-</mo><mn>5</mn></mrow><mn>1</mn></mfrac></math>',
                                    isCorrect: true,
                                },
                                {
                                    content:
                                        '<math><mfrac><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mn>2</mn></mfrac><mo>=</mo><mfrac><mrow><mi>y</mi><mo>+</mo><mn>3</mn></mrow><mrow><mo>-</mo><mn>1</mn></mrow></mfrac><mo>=</mo><mfrac><mrow><mi>z</mi><mo>-</mo><mn>5</mn></mrow><mn>1</mn></mfrac></math>',
                                },
                            ],
                            answer: 2,
                            solution:
                                'Phương trình đường thẳng đi qua M(x<sub>0</sub>, y<sub>0</sub>, z<sub>0</sub>) và có vectơ chỉ phương u(a, b, c) là (x-x<sub>0</sub>)/a = (y-y<sub>0</sub>)/b = (z-z<sub>0</sub>)/c.',
                        },
                        state: QuestionStates.Correct,
                        userAnswer: 2,
                        points: 1,
                    },
                ],
            },
        } as Result);
    }

    getTestResult(testId: string): Observable<Result> {
        return this.getPracticeResult(testId).pipe(
            map((result) => ({
                ...result,
                resultType: ResultTypes.Test,
            }))
        );
    }
}
