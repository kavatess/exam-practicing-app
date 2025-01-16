/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { Test } from '@libs/models';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TestService {
    getTestById(testId: string): Observable<Test> {
        return of({
            id: '0x89ef',
            status: 'InProgress',
            testQuestions: [
                {
                    questionId: 1,
                    question: {
                        difficulty: 0,
                        type: 'MultipleChoice',
                        level: 'Theoretical',
                        content: 'Nguyên hàm của hàm số (f(x)=e^{x}) là:',
                        choices: [
                            '(\\frac{e^{z+1}}{x+1}+C.\\)',
                            '(e^{x}+C.\\)',
                            '(\\frac{e^{x}}{x}+C.\\)',
                            '(xe^{x-1}+C.\\)',
                        ],
                        answer: 'B',
                        solution: 'Nguyên hàm của e^x là e^x + C.',
                    },
                    isCorrect: false,
                },
                {
                    questionId: 2,
                    question: {
                        difficulty: 1,
                        type: 'MultipleChoice',
                        level: 'Theoretical',
                        content:
                            'Cho hàm số (y=f(x)) liên tục, nhận giá trị dương trên đoạn [a,b]. Xét hình phẳng (H) giới hạn bởi đồ thị hàm số (y=f(x),) trục hoành và hai đường thẳng (x=a_{s} x=b,) Khối tròn xoay được tạo thành khi quay hình phẳng (H) quanh trục Ox có thể tích là:',
                        choices: [
                            '(V=\\pi\\int_{a}^{b}|f(x)|dx.\\)',
                            '(V=\\pi^{2}\\int_{a}^{b}f(x)dx.\\)',
                            '(V=\\pi^{2}\\int_{a}^{b}[f(z)]^{2}dx.\\)',
                            '(V=\\pi\\int_{a}^{b}[f(x)]^{2}dx.\\)',
                        ],
                        answer: 'D',
                        solution:
                            'Công thức tính thể tích vật thể tròn xoay khi quay quanh Ox là V = π∫[a,b] f(x)^2 dx.',
                    },
                },
                {
                    questionId: 3,
                    question: {
                        difficulty: 2,
                        type: 'MultipleChoice',
                        level: 'CombinedAnalysis',
                        content:
                            'Hai mẫu số liệu ghép nhóm (M_{1}, M_{2}) có bảng tần số ghép nhóm như sau:\n\nNhóm\n[8:10)\n[10:12)\n[12:14)\n[14:16)\n[16:18)\nM1\nTần số\n3\n4\n8\n6\n4\nNhóm\n[8:10)\n[10:12)\n[12:14)\n[14:16)\n[16:18)\nM1\nTần số\n6\n8\n16\n12\n8\nGọi (s_{1}) lần lượt là độ lệch chuẩn của mẫu số liệu ghép nhóm (M_{v} M_{2}.) Phát biểu nào sau đây là đúng?',
                        choices: [
                            '(s_{1}=s_{2}.\\)',
                            '(s_{1}=2s_{2}.\\)',
                            '(2s_{1}=s_{2}\\)',
                            '(4x_{1}=x_{2}\\)',
                        ],
                        answer: 'C',
                        solution:
                            'Mẫu số liệu M2 có tần số gấp đôi M1 ở mỗi nhóm, do đó độ lệch chuẩn của M2 gấp đôi M1.',
                    },
                },
                {
                    questionId: 4,
                    question: {
                        difficulty: 1,
                        type: 'MultipleChoice',
                        level: 'Theoretical',
                        content:
                            'Trong không gian với hệ trục tọa độ Oxyz, phương trình của đường thẳng đi qua điểm (M(1;-3;5)) và có một vectơ chỉ phương (\\vec{u}(2;-1;1)) là:',
                        choices: [
                            '(\\frac{x-1}{2}=\\frac{y-3}{-1}=\\frac{z-5}{1}.\\)',
                            '(\\frac{x-1}{2}=\\frac{y-3}{-1}=\\frac{z+5}{1}.\\)',
                            '(\\frac{x+1}{2}=\\frac{y+3}{-1}=\\frac{z-5}{1}.\\)',
                            '(\\frac{x-1}{2}=\\frac{y+3}{-1}=\\frac{z-5}{1}.\\)',
                        ],
                        answer: 'D',
                        solution:
                            'Phương trình đường thẳng đi qua M(x0, y0, z0) và có VTCP u(a, b, c) là (x-x0)/a = (y-y0)/b = (z-z0)/c.',
                    },
                },
                {
                    questionId: 5,
                    question: {
                        difficulty: 1,
                        type: 'MultipleChoice',
                        level: 'Interpretation',
                        content:
                            'Cho hàm số (y=\\frac{ax+b}{cx+d}(c\\ne0,ad-bc\\ne0)) có đồ thị như hình vẽ bên. Tiệm cận ngang của đồ thị hàm số là:',
                        choices: [
                            '(x=-1.\\)',
                            '(y=\\frac{1}{2}\\)',
                            '(y=-1.\\)',
                            '(x=\\frac{1}{2}\\)',
                        ],
                        answer: 'B',
                        solution:
                            'Tiệm cận ngang là đường thẳng y = a/c. Từ đồ thị thấy y tiến đến 1/2 khi x tiến đến vô cùng.',
                    },
                },
            ],
        } as any as Test);
    }
}
