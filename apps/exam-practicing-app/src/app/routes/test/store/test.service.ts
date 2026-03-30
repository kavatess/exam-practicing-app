/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { Test } from '@libs/models';
import { delay, Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TestService {
    submitTest(data: Test): Observable<Partial<Test>> {
        return of({
            id: '0x89ef',
        }).pipe(delay(2000));
    }

    getTestById(testId: string): Observable<Test> {
        return of({
            id: '0x89ef',
            course: {
                id: 'abc',
                code: 'MATH-THPTQG-2025',
                name: 'Đề THPTQG Môn Toán',
                description: 'Chương trình của bộ giáo dục',
                iconUrl: 'https://i.ibb.co/HFDbM1v/math-test-icon.png',
            },
            status: 'InProgress',
            pages: [
                {
                    name: 'Part A',
                    questions: [
                        {
                            questionId: 1,
                            data: {
                                difficulty: 0,
                                type: 'MultipleChoice',
                                level: 'Theoretical',
                                content:
                                    'Nguyên hàm của hàm số <i>f(x)=e<sup>x</sup></i> là:',
                                choices: [
                                    '<math><mfrac><msup><mi>e</mi><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></msup><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></mfrac><mo>+</mo><mi>C</mi></math>',
                                    '<math><msup><mi>e</mi><mi>x</mi></msup><mo>+</mo><mi>C</mi></math>',
                                    '<math><mfrac><msup><mi>e</mi><mi>x</mi></msup><mi>x</mi></mfrac><mo>+</mo><mi>C</mi></math>',
                                    '<math><mi>x</mi><msup><mi>e</mi><mrow><mi>x</mi><mo>-</mo><mn>1</mn></mrow></msup><mo>+</mo><mi>C</mi></math>',
                                ],
                                answer: 'B',
                                solution:
                                    'Nguyên hàm của e<sup>x</sup> là e<sup>x</sup> + C.',
                            },
                            isCorrect: false,
                        },
                        {
                            questionId: 2,
                            data: {
                                difficulty: 1,
                                type: 'MultipleChoice',
                                level: 'Theoretical',
                                content:
                                    'Cho hàm số <i>y=f(x)</i> liên tục, nhận giá trị dương trên đoạn [a,b]. Xét hình phẳng (H) giới hạn bởi đồ thị hàm số <i>y=f(x)</i>, trục hoành và hai đường thẳng <i>x=a</i>, <i>x=b</i>, Khối tròn xoay được tạo thành khi quay hình phẳng (H) quanh trục Ox có thể tích là:',
                                choices: [
                                    '<math><mi>V</mi><mo>=</mo><mi>π</mi><msubsup><mo>∫</mo><mi>a</mi><mi>b</mi></msubsup><mo>|</mo><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>|</mo><mi>d</mi><mi>x</mi></math>',
                                    '<math><mi>V</mi><mo>=</mo><msup><mi>π</mi><mn>2</mn></msup><msubsup><mo>∫</mo><mi>a</mi><mi>b</mi></msubsup><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo><mi>d</mi><mi>x</mi></math>',
                                    '<math><mi>V</mi><mo>=</mo><msup><mi>π</mi><mn>2</mn></msup><msubsup><mo>∫</mo><mi>a</mi><mi>b</mi></msubsup><mo>[</mo><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo><msup><mo>]</mo><mn>2</mn></msup><mi>d</mi><mi>x</mi></math>',
                                    '<math><mi>V</mi><mo>=</mo><mi>π</mi><msubsup><mo>∫</mo><mi>a</mi><mi>b</mi></msubsup><mo>[</mo><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo><msup><mo>]</mo><mn>2</mn></msup><mi>d</mi><mi>x</mi></math>',
                                ],
                                answer: 'D',
                                solution:
                                    'Công thức tính thể tích khối tròn xoay khi quay hình phẳng quanh trục Ox là V = π∫<sub>a</sub><sup>b</sup>[f(x)]<sup>2</sup>dx.',
                            },
                        },
                        {
                            questionId: 3,
                            data: {
                                difficulty: 2,
                                type: 'MultipleChoice',
                                level: 'CombinedAnalysis',
                                content:
                                    'Hai mẫu số liệu ghép nhóm <i>M<sub>1</sub>, M<sub>2</sub></i> có bảng tần số ghép nhóm như sau:<br/>[Table data as in the image]',
                                choices: [
                                    '<math><msub><mi>s</mi><mn>1</mn></msub><mo>=</mo><msub><mi>s</mi><mn>2</mn></msub></math>',
                                    '<math><msub><mi>s</mi><mn>1</mn></msub><mo>=</mo><mn>2</mn><msub><mi>s</mi><mn>2</mn></msub></math>',
                                    '<math><mn>2</mn><msub><mi>s</mi><mn>1</mn></msub><mo>=</mo><msub><mi>s</mi><mn>2</mn></msub></math>',
                                    '<math><mn>4</mn><msub><mi>s</mi><mn>1</mn></msub><mo>=</mo><msub><mi>s</mi><mn>2</mn></msub></math>',
                                ],
                                answer: 'C',
                                solution:
                                    'Dựa vào bảng tần số, ta thấy tần số của M<sub>2</sub> gấp đôi tần số của M<sub>1</sub> ở mỗi nhóm. Do đó, độ lệch chuẩn của M<sub>2</sub> gấp đôi độ lệch chuẩn của M<sub>1</sub>.',
                            },
                        },
                        {
                            questionId: 4,
                            data: {
                                difficulty: 1,
                                type: 'MultipleChoice',
                                level: 'Theoretical',
                                content:
                                    'Trong không gian với hệ trục tọa độ Oxyz, phương trình của đường thẳng đi qua điểm <i>M(1;-3;5)</i> và có một vectơ chỉ phương <math><mover><mi>u</mi><mo>→</mo></mover><mo>(</mo><mn>2</mn><mo>;</mo><mo>-</mo><mn>1</mn><mo>;</mo><mn>1</mn><mo>)</mo></math> là:',
                                choices: [
                                    '<math><mfrac><mrow><mi>x</mi><mo>-</mo><mn>1</mn></mrow><mn>2</mn></mfrac><mo>=</mo><mfrac><mrow><mi>y</mi><mo>-</mo><mn>3</mn></mrow><mrow><mo>-</mo><mn>1</mn></mrow></mfrac><mo>=</mo><mfrac><mrow><mi>z</mi><mo>-</mo><mn>5</mn></mrow><mn>1</mn></mfrac></math>',
                                    '<math><mfrac><mrow><mi>x</mi><mo>-</mo><mn>1</mn></mrow><mn>2</mn></mfrac><mo>=</mo><mfrac><mrow><mi>y</mi><mo>-</mo><mn>3</mn></mrow><mrow><mo>-</mo><mn>1</mn></mrow></mfrac><mo>=</mo><mfrac><mrow><mi>z</mi><mo>+</mo><mn>5</mn></mrow><mn>1</mn></mfrac></math>',
                                    '<math><mfrac><mrow><mi>x</mi><mo>-</mo><mn>1</mn></mrow><mn>2</mn></mfrac><mo>=</mo><mfrac><mrow><mi>y</mi><mo>+</mo><mn>3</mn></mrow><mrow><mo>-</mo><mn>1</mn></mrow></mfrac><mo>=</mo><mfrac><mrow><mi>z</mi><mo>-</mo><mn>5</mn></mrow><mn>1</mn></mfrac></math>',
                                    '<math><mfrac><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mn>2</mn></mfrac><mo>=</mo><mfrac><mrow><mi>y</mi><mo>+</mo><mn>3</mn></mrow><mrow><mo>-</mo><mn>1</mn></mrow></mfrac><mo>=</mo><mfrac><mrow><mi>z</mi><mo>-</mo><mn>5</mn></mrow><mn>1</mn></mfrac></math>',
                                ],
                                answer: 'C',
                                solution:
                                    'Phương trình đường thẳng đi qua M(x<sub>0</sub>, y<sub>0</sub>, z<sub>0</sub>) và có vectơ chỉ phương u(a, b, c) là (x-x<sub>0</sub>)/a = (y-y<sub>0</sub>)/b = (z-z<sub>0</sub>)/c.',
                            },
                        },
                    ],
                },
                {
                    name: 'Part B',
                    questions: [
                        {
                            questionId: 1,
                            data: {
                                difficulty: 0,
                                type: 'MultipleChoice',
                                level: 'Theoretical',
                                content:
                                    'Nguyên hàm của hàm số <i>f(x)=e<sup>x</sup></i> là:',
                                choices: [
                                    '<math><mfrac><msup><mi>e</mi><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></msup><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></mfrac><mo>+</mo><mi>C</mi></math>',
                                    '<math><msup><mi>e</mi><mi>x</mi></msup><mo>+</mo><mi>C</mi></math>',
                                    '<math><mfrac><msup><mi>e</mi><mi>x</mi></msup><mi>x</mi></mfrac><mo>+</mo><mi>C</mi></math>',
                                    '<math><mi>x</mi><msup><mi>e</mi><mrow><mi>x</mi><mo>-</mo><mn>1</mn></mrow></msup><mo>+</mo><mi>C</mi></math>',
                                ],
                                answer: 'B',
                                solution:
                                    'Nguyên hàm của e<sup>x</sup> là e<sup>x</sup> + C.',
                            },
                            isCorrect: false,
                        },
                        {
                            questionId: 2,
                            data: {
                                difficulty: 1,
                                type: 'MultipleChoice',
                                level: 'Theoretical',
                                content:
                                    'Cho hàm số <i>y=f(x)</i> liên tục, nhận giá trị dương trên đoạn [a,b]. Xét hình phẳng (H) giới hạn bởi đồ thị hàm số <i>y=f(x)</i>, trục hoành và hai đường thẳng <i>x=a</i>, <i>x=b</i>, Khối tròn xoay được tạo thành khi quay hình phẳng (H) quanh trục Ox có thể tích là:',
                                choices: [
                                    '<math><mi>V</mi><mo>=</mo><mi>π</mi><msubsup><mo>∫</mo><mi>a</mi><mi>b</mi></msubsup><mo>|</mo><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>|</mo><mi>d</mi><mi>x</mi></math>',
                                    '<math><mi>V</mi><mo>=</mo><msup><mi>π</mi><mn>2</mn></msup><msubsup><mo>∫</mo><mi>a</mi><mi>b</mi></msubsup><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo><mi>d</mi><mi>x</mi></math>',
                                    '<math><mi>V</mi><mo>=</mo><msup><mi>π</mi><mn>2</mn></msup><msubsup><mo>∫</mo><mi>a</mi><mi>b</mi></msubsup><mo>[</mo><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo><msup><mo>]</mo><mn>2</mn></msup><mi>d</mi><mi>x</mi></math>',
                                    '<math><mi>V</mi><mo>=</mo><mi>π</mi><msubsup><mo>∫</mo><mi>a</mi><mi>b</mi></msubsup><mo>[</mo><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo><msup><mo>]</mo><mn>2</mn></msup><mi>d</mi><mi>x</mi></math>',
                                ],
                                answer: 'D',
                                solution:
                                    'Công thức tính thể tích khối tròn xoay khi quay hình phẳng quanh trục Ox là V = π∫<sub>a</sub><sup>b</sup>[f(x)]<sup>2</sup>dx.',
                            },
                        },
                        {
                            questionId: 3,
                            data: {
                                difficulty: 2,
                                type: 'MultipleChoice',
                                level: 'CombinedAnalysis',
                                content:
                                    'Hai mẫu số liệu ghép nhóm <i>M<sub>1</sub>, M<sub>2</sub></i> có bảng tần số ghép nhóm như sau:<br/>[Table data as in the image]',
                                choices: [
                                    '<math><msub><mi>s</mi><mn>1</mn></msub><mo>=</mo><msub><mi>s</mi><mn>2</mn></msub></math>',
                                    '<math><msub><mi>s</mi><mn>1</mn></msub><mo>=</mo><mn>2</mn><msub><mi>s</mi><mn>2</mn></msub></math>',
                                    '<math><mn>2</mn><msub><mi>s</mi><mn>1</mn></msub><mo>=</mo><msub><mi>s</mi><mn>2</mn></msub></math>',
                                    '<math><mn>4</mn><msub><mi>s</mi><mn>1</mn></msub><mo>=</mo><msub><mi>s</mi><mn>2</mn></msub></math>',
                                ],
                                answer: 'C',
                                solution:
                                    'Dựa vào bảng tần số, ta thấy tần số của M<sub>2</sub> gấp đôi tần số của M<sub>1</sub> ở mỗi nhóm. Do đó, độ lệch chuẩn của M<sub>2</sub> gấp đôi độ lệch chuẩn của M<sub>1</sub>.',
                            },
                        },
                        {
                            questionId: 4,
                            data: {
                                difficulty: 1,
                                type: 'MultipleChoice',
                                level: 'Theoretical',
                                content:
                                    'Trong không gian với hệ trục tọa độ Oxyz, phương trình của đường thẳng đi qua điểm <i>M(1;-3;5)</i> và có một vectơ chỉ phương <math><mover><mi>u</mi><mo>→</mo></mover><mo>(</mo><mn>2</mn><mo>;</mo><mo>-</mo><mn>1</mn><mo>;</mo><mn>1</mn><mo>)</mo></math> là:',
                                choices: [
                                    '<math><mfrac><mrow><mi>x</mi><mo>-</mo><mn>1</mn></mrow><mn>2</mn></mfrac><mo>=</mo><mfrac><mrow><mi>y</mi><mo>-</mo><mn>3</mn></mrow><mrow><mo>-</mo><mn>1</mn></mrow></mfrac><mo>=</mo><mfrac><mrow><mi>z</mi><mo>-</mo><mn>5</mn></mrow><mn>1</mn></mfrac></math>',
                                    '<math><mfrac><mrow><mi>x</mi><mo>-</mo><mn>1</mn></mrow><mn>2</mn></mfrac><mo>=</mo><mfrac><mrow><mi>y</mi><mo>-</mo><mn>3</mn></mrow><mrow><mo>-</mo><mn>1</mn></mrow></mfrac><mo>=</mo><mfrac><mrow><mi>z</mi><mo>+</mo><mn>5</mn></mrow><mn>1</mn></mfrac></math>',
                                    '<math><mfrac><mrow><mi>x</mi><mo>-</mo><mn>1</mn></mrow><mn>2</mn></mfrac><mo>=</mo><mfrac><mrow><mi>y</mi><mo>+</mo><mn>3</mn></mrow><mrow><mo>-</mo><mn>1</mn></mrow></mfrac><mo>=</mo><mfrac><mrow><mi>z</mi><mo>-</mo><mn>5</mn></mrow><mn>1</mn></mfrac></math>',
                                    '<math><mfrac><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mn>2</mn></mfrac><mo>=</mo><mfrac><mrow><mi>y</mi><mo>+</mo><mn>3</mn></mrow><mrow><mo>-</mo><mn>1</mn></mrow></mfrac><mo>=</mo><mfrac><mrow><mi>z</mi><mo>-</mo><mn>5</mn></mrow><mn>1</mn></mfrac></math>',
                                ],
                                answer: 'C',
                                solution:
                                    'Phương trình đường thẳng đi qua M(x<sub>0</sub>, y<sub>0</sub>, z<sub>0</sub>) và có vectơ chỉ phương u(a, b, c) là (x-x<sub>0</sub>)/a = (y-y<sub>0</sub>)/b = (z-z<sub>0</sub>)/c.',
                            },
                        },
                    ],
                },
                {
                    name: 'Part C',
                    questions: [
                        {
                            questionId: 1,
                            data: {
                                difficulty: 0,
                                type: 'MultipleChoice',
                                level: 'Theoretical',
                                content:
                                    'Nguyên hàm của hàm số <i>f(x)=e<sup>x</sup></i> là:',
                                choices: [
                                    '<math><mfrac><msup><mi>e</mi><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></msup><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></mfrac><mo>+</mo><mi>C</mi></math>',
                                    '<math><msup><mi>e</mi><mi>x</mi></msup><mo>+</mo><mi>C</mi></math>',
                                    '<math><mfrac><msup><mi>e</mi><mi>x</mi></msup><mi>x</mi></mfrac><mo>+</mo><mi>C</mi></math>',
                                    '<math><mi>x</mi><msup><mi>e</mi><mrow><mi>x</mi><mo>-</mo><mn>1</mn></mrow></msup><mo>+</mo><mi>C</mi></math>',
                                ],
                                answer: 'B',
                                solution:
                                    'Nguyên hàm của e<sup>x</sup> là e<sup>x</sup> + C.',
                            },
                            isCorrect: false,
                        },
                        {
                            questionId: 2,
                            data: {
                                difficulty: 1,
                                type: 'MultipleChoice',
                                level: 'Theoretical',
                                content:
                                    'Cho hàm số <i>y=f(x)</i> liên tục, nhận giá trị dương trên đoạn [a,b]. Xét hình phẳng (H) giới hạn bởi đồ thị hàm số <i>y=f(x)</i>, trục hoành và hai đường thẳng <i>x=a</i>, <i>x=b</i>, Khối tròn xoay được tạo thành khi quay hình phẳng (H) quanh trục Ox có thể tích là:',
                                choices: [
                                    '<math><mi>V</mi><mo>=</mo><mi>π</mi><msubsup><mo>∫</mo><mi>a</mi><mi>b</mi></msubsup><mo>|</mo><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>|</mo><mi>d</mi><mi>x</mi></math>',
                                    '<math><mi>V</mi><mo>=</mo><msup><mi>π</mi><mn>2</mn></msup><msubsup><mo>∫</mo><mi>a</mi><mi>b</mi></msubsup><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo><mi>d</mi><mi>x</mi></math>',
                                    '<math><mi>V</mi><mo>=</mo><msup><mi>π</mi><mn>2</mn></msup><msubsup><mo>∫</mo><mi>a</mi><mi>b</mi></msubsup><mo>[</mo><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo><msup><mo>]</mo><mn>2</mn></msup><mi>d</mi><mi>x</mi></math>',
                                    '<math><mi>V</mi><mo>=</mo><mi>π</mi><msubsup><mo>∫</mo><mi>a</mi><mi>b</mi></msubsup><mo>[</mo><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo><msup><mo>]</mo><mn>2</mn></msup><mi>d</mi><mi>x</mi></math>',
                                ],
                                answer: 'D',
                                solution:
                                    'Công thức tính thể tích khối tròn xoay khi quay hình phẳng quanh trục Ox là V = π∫<sub>a</sub><sup>b</sup>[f(x)]<sup>2</sup>dx.',
                            },
                        },
                        {
                            questionId: 3,
                            data: {
                                difficulty: 2,
                                type: 'MultipleChoice',
                                level: 'CombinedAnalysis',
                                content:
                                    'Hai mẫu số liệu ghép nhóm <i>M<sub>1</sub>, M<sub>2</sub></i> có bảng tần số ghép nhóm như sau:<br/>[Table data as in the image]',
                                choices: [
                                    '<math><msub><mi>s</mi><mn>1</mn></msub><mo>=</mo><msub><mi>s</mi><mn>2</mn></msub></math>',
                                    '<math><msub><mi>s</mi><mn>1</mn></msub><mo>=</mo><mn>2</mn><msub><mi>s</mi><mn>2</mn></msub></math>',
                                    '<math><mn>2</mn><msub><mi>s</mi><mn>1</mn></msub><mo>=</mo><msub><mi>s</mi><mn>2</mn></msub></math>',
                                    '<math><mn>4</mn><msub><mi>s</mi><mn>1</mn></msub><mo>=</mo><msub><mi>s</mi><mn>2</mn></msub></math>',
                                ],
                                answer: 'C',
                                solution:
                                    'Dựa vào bảng tần số, ta thấy tần số của M<sub>2</sub> gấp đôi tần số của M<sub>1</sub> ở mỗi nhóm. Do đó, độ lệch chuẩn của M<sub>2</sub> gấp đôi độ lệch chuẩn của M<sub>1</sub>.',
                            },
                        },
                        {
                            questionId: 4,
                            data: {
                                difficulty: 1,
                                type: 'MultipleChoice',
                                level: 'Theoretical',
                                content:
                                    'Trong không gian với hệ trục tọa độ Oxyz, phương trình của đường thẳng đi qua điểm <i>M(1;-3;5)</i> và có một vectơ chỉ phương <math><mover><mi>u</mi><mo>→</mo></mover><mo>(</mo><mn>2</mn><mo>;</mo><mo>-</mo><mn>1</mn><mo>;</mo><mn>1</mn><mo>)</mo></math> là:',
                                choices: [
                                    '<math><mfrac><mrow><mi>x</mi><mo>-</mo><mn>1</mn></mrow><mn>2</mn></mfrac><mo>=</mo><mfrac><mrow><mi>y</mi><mo>-</mo><mn>3</mn></mrow><mrow><mo>-</mo><mn>1</mn></mrow></mfrac><mo>=</mo><mfrac><mrow><mi>z</mi><mo>-</mo><mn>5</mn></mrow><mn>1</mn></mfrac></math>',
                                    '<math><mfrac><mrow><mi>x</mi><mo>-</mo><mn>1</mn></mrow><mn>2</mn></mfrac><mo>=</mo><mfrac><mrow><mi>y</mi><mo>-</mo><mn>3</mn></mrow><mrow><mo>-</mo><mn>1</mn></mrow></mfrac><mo>=</mo><mfrac><mrow><mi>z</mi><mo>+</mo><mn>5</mn></mrow><mn>1</mn></mfrac></math>',
                                    '<math><mfrac><mrow><mi>x</mi><mo>-</mo><mn>1</mn></mrow><mn>2</mn></mfrac><mo>=</mo><mfrac><mrow><mi>y</mi><mo>+</mo><mn>3</mn></mrow><mrow><mo>-</mo><mn>1</mn></mrow></mfrac><mo>=</mo><mfrac><mrow><mi>z</mi><mo>-</mo><mn>5</mn></mrow><mn>1</mn></mfrac></math>',
                                    '<math><mfrac><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mn>2</mn></mfrac><mo>=</mo><mfrac><mrow><mi>y</mi><mo>+</mo><mn>3</mn></mrow><mrow><mo>-</mo><mn>1</mn></mrow></mfrac><mo>=</mo><mfrac><mrow><mi>z</mi><mo>-</mo><mn>5</mn></mrow><mn>1</mn></mfrac></math>',
                                ],
                                answer: 'C',
                                solution:
                                    'Phương trình đường thẳng đi qua M(x<sub>0</sub>, y<sub>0</sub>, z<sub>0</sub>) và có vectơ chỉ phương u(a, b, c) là (x-x<sub>0</sub>)/a = (y-y<sub>0</sub>)/b = (z-z<sub>0</sub>)/c.',
                            },
                        },
                    ],
                },
            ],
        } as any as Test);
    }
}
