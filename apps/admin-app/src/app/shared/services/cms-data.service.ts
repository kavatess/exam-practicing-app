import { Injectable } from '@angular/core';
import {
    MoldStatuses,
    MoldTypes,
    QuestionDifficulties,
    QuestionTypes,
} from '@libs/models';
import {
    AdminExam,
    AdminMold,
    AdminSubject,
    AdminUnit,
    ExamSection,
    ExamTypes,
} from '../models/cms.model';

type UnitSeed = [string, string[]];

@Injectable({ providedIn: 'root' })
export class CmsDataService {
    readonly subjects: AdminSubject[] = this.buildSubjects();
    readonly exams: AdminExam[] = this.buildExams();

    private sequence = 0;

    subjectById(subjectId: string): AdminSubject | undefined {
        return this.subjects.find((subject) => subject.id === subjectId);
    }

    unitsForSection(section: ExamSection): AdminUnit[] {
        const subject = this.subjectById(section.subjectId);
        if (!subject) {
            return [];
        }
        return subject.units.filter((unit) =>
            section.unitIds.includes(unit.id)
        );
    }

    nextId(prefix: string): string {
        this.sequence += 1;
        return `${prefix}-${this.sequence}`;
    }

    private buildSubjects(): AdminSubject[] {
        return SUBJECT_SEEDS.map(([id, name, description, unitSeeds]) => ({
            id,
            name,
            description,
            units: unitSeeds.map((seed, index) =>
                this.buildUnit(id, seed, index)
            ),
        }));
    }

    private buildUnit(
        subjectId: string,
        [title, subTitles]: UnitSeed,
        index: number
    ): AdminUnit {
        const unitId = `${subjectId}-u${index + 1}`;
        const unitTotal = 112 - index * 11;
        const share = Math.floor(unitTotal / subTitles.length);
        const subUnits = subTitles.map((subTitle, subIndex) => ({
            id: `${unitId}-s${subIndex + 1}`,
            unitId,
            title: subTitle,
            description: '',
            iconUrl: '',
            questionCount:
                subIndex === 0
                    ? unitTotal - share * (subTitles.length - 1)
                    : share,
        }));
        return {
            id: unitId,
            subjectId,
            title,
            description: '',
            iconUrl: '',
            subUnits,
            questionCount: unitTotal,
        };
    }

    private buildExams(): AdminExam[] {
        return [
            this.exam(
                'thptqg-2025-math',
                'Kỳ thi THPT Quốc gia 2025 — Toán',
                'THPTQG-2025-MATH',
                2025,
                ExamTypes.National,
                'Bộ Giáo dục và Đào tạo',
                'Yearly prototype of the national high-school graduation exam. One paper per subject, following the official specification.',
                [['toan', ['toan-u1', 'toan-u2', 'toan-u3', 'toan-u5', 'toan-u7']]],
                this.mathMolds()
            ),
            this.exam(
                'thptqg-2025-lit',
                'Kỳ thi THPT Quốc gia 2025 — Ngữ văn',
                'THPTQG-2025-LIT',
                2025,
                ExamTypes.National,
                'Bộ Giáo dục và Đào tạo',
                'Yearly prototype of the national high-school graduation exam for literature.',
                [['van', ['van-u1', 'van-u2', 'van-u5', 'van-u6']]]
            ),
            this.exam(
                'hust-2025-tsa',
                'ĐH Bách Khoa HN 2025 — Đánh giá tư duy',
                'HUST-2025-TSA',
                2025,
                ExamTypes.University,
                'Đại học Bách Khoa Hà Nội',
                'Single timed assessment covering several subjects in one sitting, scored as one combined result.',
                [
                    ['toan', ['toan-u1', 'toan-u3', 'toan-u5', 'toan-u7']],
                    ['van', ['van-u5', 'van-u6', 'van-u7']],
                    ['khoahoc', ['khoahoc-u1', 'khoahoc-u2', 'khoahoc-u5']],
                ],
                this.tsaMolds()
            ),
            this.exam(
                'vnu-2025-hsa',
                'ĐHQG Hà Nội 2025 — HSA',
                'VNU-2025-HSA',
                2025,
                ExamTypes.University,
                'Đại học Quốc gia Hà Nội',
                'High-school student assessment spanning quantitative, literary and scientific reasoning in one sitting.',
                [
                    ['toan', ['toan-u2', 'toan-u4', 'toan-u7']],
                    ['van', ['van-u1', 'van-u7']],
                    ['khoahoc', ['khoahoc-u3', 'khoahoc-u4']],
                ]
            ),
            this.exam(
                'thptqg-2024-math',
                'Kỳ thi THPT Quốc gia 2024 — Toán',
                'THPTQG-2024-MATH',
                2024,
                ExamTypes.National,
                'Bộ Giáo dục và Đào tạo',
                'Yearly prototype of the national high-school graduation exam.',
                [['toan', ['toan-u1', 'toan-u2', 'toan-u3', 'toan-u5', 'toan-u7']]]
            ),
            this.exam(
                'hust-2024-tsa',
                'ĐH Bách Khoa HN 2024 — Đánh giá tư duy',
                'HUST-2024-TSA',
                2024,
                ExamTypes.University,
                'Đại học Bách Khoa Hà Nội',
                'Single timed assessment covering several subjects in one sitting, scored as one combined result.',
                [
                    ['toan', ['toan-u1', 'toan-u3']],
                    ['khoahoc', ['khoahoc-u1', 'khoahoc-u5']],
                ]
            ),
            this.exam(
                'thptqg-2023-math',
                'Kỳ thi THPT Quốc gia 2023 — Toán',
                'THPTQG-2023-MATH',
                2023,
                ExamTypes.National,
                'Bộ Giáo dục và Đào tạo',
                'Yearly prototype of the national high-school graduation exam.',
                [['toan', ['toan-u1', 'toan-u2', 'toan-u3']]]
            ),
            this.exam(
                'internal-2023',
                'Đề ôn luyện nội bộ 2023',
                'INTERNAL-2023',
                2023,
                ExamTypes.Custom,
                'ExamPrep',
                'Internal revision prototype. Not tied to an official exam specification.',
                [['toan', ['toan-u1', 'toan-u2']]]
            ),
        ];
    }

    private exam(
        id: string,
        name: string,
        code: string,
        year: number,
        examType: ExamTypes,
        org: string,
        description: string,
        sections: [string, string[]][],
        molds: AdminMold[] = []
    ): AdminExam {
        return {
            id,
            name,
            code,
            year,
            examType,
            org,
            description,
            iconUrl: '',
            sections: sections.map(([subjectId, unitIds], index) => ({
                id: `${id}-sec${index + 1}`,
                examId: id,
                subjectId,
                unitIds,
            })),
            molds,
        };
    }

    private mathMolds(): AdminMold[] {
        const section = 'thptqg-2025-math-sec1';
        return [
            {
                id: 'mold-a',
                courseId: 'thptqg-2025-math',
                name: 'Đề thi thử THPTQG — Mẫu A',
                description: '',
                type: MoldTypes.Test,
                status: MoldStatuses.Active,
                numOfQuestions: 50,
                duration: 90,
                passingScore: 30,
                pages: [
                    {
                        id: 'mold-a-p1',
                        moldId: 'mold-a',
                        name: 'Phần 1 — Nhận biết & Thông hiểu',
                        description: '',
                        blocks: [
                            this.block('mold-a-p1-b1', 'mold-a', 'mold-a-p1', 0, {
                                sectionId: section,
                                courseUnitId: 'toan-u1',
                                subUnitIds: ['toan-u1-s1', 'toan-u1-s2'],
                                qType: QuestionTypes.MultipleChoice,
                                difficulty: QuestionDifficulties.Easy,
                                questionCount: 12,
                            }),
                            this.block('mold-a-p1-b2', 'mold-a', 'mold-a-p1', 1, {
                                sectionId: section,
                                courseUnitId: 'toan-u3',
                                subUnitIds: ['toan-u3-s1'],
                                qType: QuestionTypes.TrueFalse,
                                difficulty: QuestionDifficulties.Easy,
                                questionCount: 8,
                            }),
                        ],
                    },
                    {
                        id: 'mold-a-p2',
                        moldId: 'mold-a',
                        name: 'Phần 2 — Vận dụng',
                        description: '',
                        blocks: [
                            this.block('mold-a-p2-b1', 'mold-a', 'mold-a-p2', 0, {
                                sectionId: section,
                                courseUnitId: 'toan-u2',
                                subUnitIds: ['toan-u2-s2', 'toan-u2-s3'],
                                qType: QuestionTypes.MultipleChoice,
                                difficulty: QuestionDifficulties.Medium,
                                questionCount: 12,
                            }),
                            this.block('mold-a-p2-b2', 'mold-a', 'mold-a-p2', 1, {
                                sectionId: section,
                                courseUnitId: 'toan-u5',
                                subUnitIds: ['toan-u5-s3'],
                                qType: QuestionTypes.MultipleChoice,
                                difficulty: QuestionDifficulties.Medium,
                                questionCount: 8,
                            }),
                        ],
                    },
                    {
                        id: 'mold-a-p3',
                        moldId: 'mold-a',
                        name: 'Phần 3 — Vận dụng cao',
                        description: '',
                        blocks: [
                            this.block('mold-a-p3-b1', 'mold-a', 'mold-a-p3', 0, {
                                sectionId: section,
                                courseUnitId: 'toan-u7',
                                subUnitIds: ['toan-u7-s2'],
                                qType: QuestionTypes.Matching,
                                difficulty: QuestionDifficulties.Hard,
                                questionCount: 6,
                            }),
                            this.block('mold-a-p3-b2', 'mold-a', 'mold-a-p3', 1, {
                                sectionId: section,
                                courseUnitId: 'toan-u1',
                                subUnitIds: ['toan-u1-s3'],
                                qType: QuestionTypes.EssayAnswer,
                                difficulty: QuestionDifficulties.Hard,
                                questionCount: 4,
                            }),
                        ],
                    },
                ],
            },
            {
                id: 'mold-b',
                courseId: 'thptqg-2025-math',
                name: 'Luyện tập theo chuyên đề — Đạo hàm',
                description: '',
                type: MoldTypes.Practice,
                status: MoldStatuses.Active,
                numOfQuestions: 15,
                duration: 25,
                passingScore: 9,
                pages: [
                    {
                        id: 'mold-b-p1',
                        moldId: 'mold-b',
                        name: 'Luyện tập',
                        description: '',
                        blocks: [
                            this.block('mold-b-p1-b1', 'mold-b', 'mold-b-p1', 0, {
                                sectionId: section,
                                courseUnitId: 'toan-u1',
                                subUnitIds: ['toan-u1-s1'],
                                qType: QuestionTypes.MultipleChoice,
                                difficulty: QuestionDifficulties.Easy,
                                questionCount: 9,
                            }),
                            this.block('mold-b-p1-b2', 'mold-b', 'mold-b-p1', 1, {
                                sectionId: section,
                                courseUnitId: 'toan-u1',
                                subUnitIds: ['toan-u1-s3'],
                                qType: QuestionTypes.MultipleChoice,
                                difficulty: QuestionDifficulties.Medium,
                                questionCount: 6,
                            }),
                        ],
                    },
                ],
            },
        ];
    }

    private tsaMolds(): AdminMold[] {
        const math = 'hust-2025-tsa-sec1';
        const reading = 'hust-2025-tsa-sec2';
        const science = 'hust-2025-tsa-sec3';
        return [
            {
                id: 'mold-tsa',
                courseId: 'hust-2025-tsa',
                name: 'Đề đánh giá tư duy — Mẫu chuẩn',
                description: '',
                type: MoldTypes.Test,
                status: MoldStatuses.Active,
                numOfQuestions: 60,
                duration: 150,
                passingScore: 36,
                pages: [
                    {
                        id: 'mold-tsa-p1',
                        moldId: 'mold-tsa',
                        name: 'Phần 1 — Tư duy Toán học',
                        description: '',
                        blocks: [
                            this.block('mold-tsa-p1-b1', 'mold-tsa', 'mold-tsa-p1', 0, {
                                sectionId: math,
                                courseUnitId: 'toan-u1',
                                subUnitIds: ['toan-u1-s1', 'toan-u1-s3'],
                                qType: QuestionTypes.MultipleChoice,
                                difficulty: QuestionDifficulties.Medium,
                                questionCount: 14,
                            }),
                            this.block('mold-tsa-p1-b2', 'mold-tsa', 'mold-tsa-p1', 1, {
                                sectionId: math,
                                courseUnitId: 'toan-u7',
                                subUnitIds: ['toan-u7-s2'],
                                qType: QuestionTypes.MultipleChoice,
                                difficulty: QuestionDifficulties.Hard,
                                questionCount: 6,
                            }),
                        ],
                    },
                    {
                        id: 'mold-tsa-p2',
                        moldId: 'mold-tsa',
                        name: 'Phần 2 — Tư duy Đọc hiểu',
                        description: '',
                        blocks: [
                            this.block('mold-tsa-p2-b1', 'mold-tsa', 'mold-tsa-p2', 0, {
                                sectionId: reading,
                                courseUnitId: 'van-u5',
                                subUnitIds: ['van-u5-s1'],
                                qType: QuestionTypes.MultipleChoice,
                                difficulty: QuestionDifficulties.Medium,
                                questionCount: 12,
                            }),
                            this.block('mold-tsa-p2-b2', 'mold-tsa', 'mold-tsa-p2', 1, {
                                sectionId: reading,
                                courseUnitId: 'van-u6',
                                subUnitIds: ['van-u6-s1'],
                                qType: QuestionTypes.TrueFalse,
                                difficulty: QuestionDifficulties.Easy,
                                questionCount: 8,
                            }),
                        ],
                    },
                    {
                        id: 'mold-tsa-p3',
                        moldId: 'mold-tsa',
                        name: 'Phần 3 — Tư duy Khoa học',
                        description: '',
                        blocks: [
                            this.block('mold-tsa-p3-b1', 'mold-tsa', 'mold-tsa-p3', 0, {
                                sectionId: science,
                                courseUnitId: 'khoahoc-u1',
                                subUnitIds: ['khoahoc-u1-s1'],
                                qType: QuestionTypes.MultipleChoice,
                                difficulty: QuestionDifficulties.Medium,
                                questionCount: 12,
                            }),
                            this.block('mold-tsa-p3-b2', 'mold-tsa', 'mold-tsa-p3', 1, {
                                sectionId: science,
                                courseUnitId: 'khoahoc-u5',
                                subUnitIds: ['khoahoc-u5-s1', 'khoahoc-u5-s2'],
                                qType: QuestionTypes.Matching,
                                difficulty: QuestionDifficulties.Hard,
                                questionCount: 8,
                            }),
                        ],
                    },
                ],
            },
        ];
    }

    private block(
        id: string,
        moldId: string,
        pageId: string,
        qIndex: number,
        rest: {
            sectionId: string;
            courseUnitId: string;
            subUnitIds: string[];
            qType: QuestionTypes;
            difficulty: QuestionDifficulties;
            questionCount: number;
        }
    ) {
        return { id, moldId, pageId, qIndex, ...rest };
    }
}

const SUBJECT_SEEDS: [string, string, string, UnitSeed[]][] = [
    [
        'toan',
        'Toán',
        'Toàn bộ kiến thức Toán THPT, dùng chung cho mọi kỳ thi tuyển sinh.',
        [
            [
                'Giải tích — Đạo hàm',
                ['Định nghĩa & quy tắc', 'Đạo hàm hàm hợp', 'Ứng dụng đạo hàm'],
            ],
            [
                'Giải tích — Nguyên hàm & Tích phân',
                ['Nguyên hàm cơ bản', 'Tích phân xác định', 'Ứng dụng tích phân'],
            ],
            [
                'Hàm số & Đồ thị',
                ['Khảo sát hàm số', 'Tiệm cận', 'Tương giao đồ thị'],
            ],
            [
                'Đại số — Phương trình & Bất phương trình',
                ['Mũ và logarit', 'Hệ phương trình'],
            ],
            [
                'Hình học không gian',
                ['Khối đa diện', 'Mặt cầu, trụ, nón', 'Toạ độ không gian'],
            ],
            ['Lượng giác', ['Công thức biến đổi', 'Phương trình lượng giác']],
            ['Tổ hợp & Xác suất', ['Hoán vị, chỉnh hợp', 'Xác suất cơ bản']],
        ],
    ],
    [
        'van',
        'Ngữ văn',
        'Văn học và tiếng Việt THPT, gồm đọc hiểu và làm văn.',
        [
            ['Văn học Việt Nam 1930–1945', ['Thơ mới', 'Truyện ngắn hiện thực']],
            ['Văn học Việt Nam 1945–1975', ['Thơ kháng chiến', 'Truyện và ký']],
            [
                'Văn học Việt Nam sau 1975',
                ['Thơ hiện đại', 'Truyện ngắn đương đại'],
            ],
            ['Văn học nước ngoài', ['Văn học Nga', 'Văn học Pháp']],
            ['Nghị luận văn học', ['Phân tích tác phẩm', 'So sánh tác phẩm']],
            ['Nghị luận xã hội', ['Hiện tượng đời sống', 'Tư tưởng đạo lý']],
            ['Tiếng Việt & Làm văn', ['Phong cách ngôn ngữ', 'Biện pháp tu từ']],
        ],
    ],
    [
        'ly',
        'Vật lý',
        'Cơ, nhiệt, điện, quang và vật lý hạt nhân.',
        [
            ['Cơ học', ['Động học', 'Động lực học', 'Các định luật bảo toàn']],
            ['Dao động & Sóng cơ', ['Dao động điều hoà', 'Sóng cơ và âm']],
            [
                'Nhiệt học',
                ['Thuyết động học phân tử', 'Nguyên lý nhiệt động lực học'],
            ],
            [
                'Điện & Từ',
                ['Dòng điện không đổi', 'Dòng điện xoay chiều', 'Từ trường'],
            ],
            ['Sóng điện từ & Quang học', ['Sóng điện từ', 'Giao thoa và tán sắc']],
            ['Vật lý hạt nhân', ['Phóng xạ', 'Phản ứng hạt nhân']],
        ],
    ],
    [
        'hoa',
        'Hoá học',
        'Hoá đại cương, vô cơ và hữu cơ.',
        [
            ['Hoá đại cương', ['Cấu tạo nguyên tử', 'Liên kết hoá học']],
            ['Phản ứng & Tốc độ phản ứng', ['Cân bằng hoá học', 'Tốc độ phản ứng']],
            [
                'Hoá vô cơ — Kim loại',
                ['Kim loại kiềm & kiềm thổ', 'Nhôm và sắt'],
            ],
            ['Hoá vô cơ — Phi kim', ['Nhóm halogen', 'Nitơ và lưu huỳnh']],
            ['Hoá hữu cơ cơ bản', ['Hiđrocacbon', 'Dẫn xuất halogen, ancol']],
            [
                'Hoá hữu cơ nâng cao',
                ['Este và lipit', 'Amin, amino axit', 'Polime'],
            ],
        ],
    ],
    [
        'anh',
        'Tiếng Anh',
        'Ngữ pháp, từ vựng và kỹ năng đọc — viết.',
        [
            ['Grammar — Tenses & Voice', ['Verb tenses', 'Passive voice']],
            ['Grammar — Clauses', ['Relative clauses', 'Conditionals']],
            ['Vocabulary & Word forms', ['Collocations', 'Word formation']],
            ['Pronunciation & Stress', ['Sounds', 'Word stress']],
            ['Reading comprehension', ['Skimming & scanning', 'Inference']],
            ['Writing', ['Sentence transformation', 'Essay writing']],
        ],
    ],
    [
        'sinh',
        'Sinh học',
        'Sinh học tế bào đến tiến hoá và sinh thái.',
        [
            ['Sinh học tế bào', ['Cấu trúc tế bào', 'Chuyển hoá vật chất']],
            ['Di truyền học', ['Quy luật Mendel', 'ADN và gen', 'Đột biến']],
            [
                'Sinh học cơ thể',
                ['Chuyển hoá ở thực vật', 'Chuyển hoá ở động vật'],
            ],
            ['Tiến hoá', ['Học thuyết tiến hoá', 'Nguồn gốc loài']],
            ['Sinh thái học', ['Quần thể và quần xã', 'Hệ sinh thái']],
        ],
    ],
    [
        'khoahoc',
        'Khoa học',
        'Kiến thức khoa học tổng hợp cho các bài thi đánh giá tư duy.',
        [
            [
                'Khoa học — Cơ & Chuyển động',
                ['Chuyển động thẳng', 'Lực và cân bằng'],
            ],
            [
                'Khoa học — Năng lượng & Nhiệt',
                ['Công và năng lượng', 'Truyền nhiệt'],
            ],
            [
                'Khoa học — Phản ứng hoá học',
                ['Chất và biến đổi', 'Tốc độ phản ứng'],
            ],
            ['Khoa học — Sự sống', ['Tế bào và di truyền', 'Hệ sinh thái']],
            [
                'Khoa học — Dữ liệu & Thực nghiệm',
                ['Đọc biểu đồ', 'Thiết kế thí nghiệm'],
            ],
        ],
    ],
];
