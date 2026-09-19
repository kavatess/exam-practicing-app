import { Injectable } from '@angular/core';
import {
    MoldStatuses,
    MoldTypes,
    QuestionDifficulties,
    QuestionTypes,
} from '@libs/models';
import {
    AdminCourse,
    AdminMold,
    AdminSubject,
    AdminUnit,
    CourseTypes,
} from '../models/subject-management.model';

type UnitSeed = [string, string[]];

@Injectable({ providedIn: 'root' })
export class SubjectManagementDataService {
    getSubjects(): AdminSubject[] {
        return [
            this.buildSubject(
                'toan',
                'Toán',
                'Toàn bộ kiến thức Toán THPT',
                MATH_UNITS,
                this.mathCourses()
            ),
            this.buildSubject(
                'van',
                'Ngữ văn',
                'Văn học và tiếng Việt THPT',
                LITERATURE_UNITS,
                this.literatureCourses()
            ),
            this.buildSubject(
                'ly',
                'Vật lý',
                'Cơ, nhiệt, điện, quang',
                PHYSICS_UNITS,
                this.physicsCourses()
            ),
            this.buildSubject(
                'hoa',
                'Hoá học',
                'Hoá đại cương, vô cơ, hữu cơ',
                CHEMISTRY_UNITS,
                this.chemistryCourses()
            ),
            this.buildSubject(
                'anh',
                'Tiếng Anh',
                'Ngữ pháp, từ vựng, kỹ năng',
                ENGLISH_UNITS,
                this.englishCourses()
            ),
            this.buildSubject(
                'sinh',
                'Sinh học',
                'Sinh học tế bào đến tiến hoá',
                BIOLOGY_UNITS,
                []
            ),
        ];
    }

    private buildSubject(
        id: string,
        name: string,
        description: string,
        unitSeeds: UnitSeed[],
        courses: AdminCourse[]
    ): AdminSubject {
        const units = unitSeeds.map((seed, index) =>
            this.buildUnit(id, seed, index)
        );
        courses.forEach((course) => {
            course.subjectId = id;
            if (!course.unitIds.length) {
                course.unitIds = units.slice(0, 4).map((unit) => unit.id);
            }
        });
        return { id, name, description, units, courses };
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

    private course(
        id: string,
        name: string,
        code: string,
        year: number,
        courseType: CourseTypes,
        unitIds: string[] = [],
        molds: AdminMold[] = []
    ): AdminCourse {
        return {
            id,
            subjectId: '',
            code,
            name,
            year,
            courseType,
            unitIds,
            description:
                courseType === CourseTypes.National
                    ? 'Yearly prototype of the national high-school graduation exam. Structure follows the official specification issued by the Ministry of Education.'
                    : courseType === CourseTypes.University
                    ? 'Yearly prototype of this university’s own entrance assessment. Content is drawn from the subject’s units but weighted to the university’s published format.'
                    : 'Internal practice prototype used for revision rounds. Not tied to an official exam specification.',
            iconUrl: '',
            molds,
        };
    }

    private mathCourses(): AdminCourse[] {
        const scope = [
            'toan-u1',
            'toan-u2',
            'toan-u3',
            'toan-u5',
            'toan-u7',
        ];
        return [
            this.course(
                'thptqg-2025-math',
                'Kỳ thi THPT Quốc gia 2025 — Toán',
                'THPTQG-2025-MATH',
                2025,
                CourseTypes.National,
                scope,
                this.mathMolds()
            ),
            this.course(
                'hust-2025-math',
                'ĐH Bách Khoa HN 2025 — Đánh giá tư duy Toán',
                'HUST-2025-MATH',
                2025,
                CourseTypes.University,
                ['toan-u1', 'toan-u3', 'toan-u5']
            ),
            this.course(
                'vnu-2025-math',
                'ĐHQG Hà Nội 2025 — HSA Toán',
                'VNU-2025-MATH',
                2025,
                CourseTypes.University,
                ['toan-u2', 'toan-u4', 'toan-u7']
            ),
            this.course(
                'thptqg-2024-math',
                'Kỳ thi THPT Quốc gia 2024 — Toán',
                'THPTQG-2024-MATH',
                2024,
                CourseTypes.National,
                scope
            ),
            this.course(
                'hust-2024-math',
                'ĐH Bách Khoa HN 2024 — Đánh giá tư duy Toán',
                'HUST-2024-MATH',
                2024,
                CourseTypes.University,
                ['toan-u1', 'toan-u3']
            ),
            this.course(
                'thptqg-2023-math',
                'Kỳ thi THPT Quốc gia 2023 — Toán',
                'THPTQG-2023-MATH',
                2023,
                CourseTypes.National,
                scope
            ),
            this.course(
                'internal-2023-math',
                'Đề ôn luyện nội bộ 2023',
                'INTERNAL-2023-MATH',
                2023,
                CourseTypes.Custom,
                ['toan-u1', 'toan-u2']
            ),
        ];
    }

    private mathMolds(): AdminMold[] {
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
                                courseUnitId: 'toan-u1',
                                subUnitIds: ['toan-u1-s1', 'toan-u1-s2'],
                                qType: QuestionTypes.MultipleChoice,
                                difficulty: QuestionDifficulties.Easy,
                                questionCount: 12,
                            }),
                            this.block('mold-a-p1-b2', 'mold-a', 'mold-a-p1', 1, {
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
                                courseUnitId: 'toan-u2',
                                subUnitIds: ['toan-u2-s2', 'toan-u2-s3'],
                                qType: QuestionTypes.MultipleChoice,
                                difficulty: QuestionDifficulties.Medium,
                                questionCount: 12,
                            }),
                            this.block('mold-a-p2-b2', 'mold-a', 'mold-a-p2', 1, {
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
                                courseUnitId: 'toan-u7',
                                subUnitIds: ['toan-u7-s2'],
                                qType: QuestionTypes.Matching,
                                difficulty: QuestionDifficulties.Hard,
                                questionCount: 6,
                            }),
                            this.block('mold-a-p3-b2', 'mold-a', 'mold-a-p3', 1, {
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
                                courseUnitId: 'toan-u1',
                                subUnitIds: ['toan-u1-s1'],
                                qType: QuestionTypes.MultipleChoice,
                                difficulty: QuestionDifficulties.Easy,
                                questionCount: 9,
                            }),
                            this.block('mold-b-p1-b2', 'mold-b', 'mold-b-p1', 1, {
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
            {
                id: 'mold-c',
                courseId: 'thptqg-2025-math',
                name: 'Đề thi thử THPTQG — Mẫu B (rút gọn)',
                description: '',
                type: MoldTypes.Test,
                status: MoldStatuses.Inactive,
                numOfQuestions: 30,
                duration: 60,
                passingScore: 18,
                pages: [
                    {
                        id: 'mold-c-p1',
                        moldId: 'mold-c',
                        name: 'Phần 1',
                        description: '',
                        blocks: [
                            this.block('mold-c-p1-b1', 'mold-c', 'mold-c-p1', 0, {
                                courseUnitId: 'toan-u3',
                                subUnitIds: ['toan-u3-s1', 'toan-u3-s2'],
                                qType: QuestionTypes.MultipleChoice,
                                difficulty: QuestionDifficulties.Easy,
                                questionCount: 12,
                            }),
                            this.block('mold-c-p1-b2', 'mold-c', 'mold-c-p1', 1, {
                                courseUnitId: 'toan-u2',
                                subUnitIds: ['toan-u2-s1'],
                                qType: QuestionTypes.MultipleChoice,
                                difficulty: QuestionDifficulties.Medium,
                                questionCount: 8,
                            }),
                        ],
                    },
                    {
                        id: 'mold-c-p2',
                        moldId: 'mold-c',
                        name: 'Phần 2',
                        description: '',
                        blocks: [
                            this.block('mold-c-p2-b1', 'mold-c', 'mold-c-p2', 0, {
                                courseUnitId: 'toan-u7',
                                subUnitIds: ['toan-u7-s1'],
                                qType: QuestionTypes.Matching,
                                difficulty: QuestionDifficulties.Hard,
                                questionCount: 10,
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
            courseUnitId: string;
            subUnitIds: string[];
            qType: QuestionTypes;
            difficulty: QuestionDifficulties;
            questionCount: number;
        }
    ) {
        return { id, moldId, pageId, qIndex, ...rest };
    }

    private literatureCourses(): AdminCourse[] {
        return [
            this.course(
                'thptqg-2025-lit',
                'Kỳ thi THPT Quốc gia 2025 — Ngữ văn',
                'THPTQG-2025-LIT',
                2025,
                CourseTypes.National
            ),
            this.course(
                'thptqg-2024-lit',
                'Kỳ thi THPT Quốc gia 2024 — Ngữ văn',
                'THPTQG-2024-LIT',
                2024,
                CourseTypes.National
            ),
        ];
    }

    private physicsCourses(): AdminCourse[] {
        return [
            this.course(
                'thptqg-2025-phy',
                'Kỳ thi THPT Quốc gia 2025 — Vật lý',
                'THPTQG-2025-PHY',
                2025,
                CourseTypes.National
            ),
            this.course(
                'hust-2025-phy',
                'ĐH Bách Khoa HN 2025 — Đánh giá tư duy Vật lý',
                'HUST-2025-PHY',
                2025,
                CourseTypes.University
            ),
        ];
    }

    private chemistryCourses(): AdminCourse[] {
        return [
            this.course(
                'thptqg-2025-che',
                'Kỳ thi THPT Quốc gia 2025 — Hoá học',
                'THPTQG-2025-CHE',
                2025,
                CourseTypes.National
            ),
        ];
    }

    private englishCourses(): AdminCourse[] {
        return [
            this.course(
                'thptqg-2025-eng',
                'Kỳ thi THPT Quốc gia 2025 — Tiếng Anh',
                'THPTQG-2025-ENG',
                2025,
                CourseTypes.National
            ),
            this.course(
                'vnu-2024-eng',
                'ĐHQG Hà Nội 2024 — HSA Tiếng Anh',
                'VNU-2024-ENG',
                2024,
                CourseTypes.University
            ),
        ];
    }
}

const MATH_UNITS: UnitSeed[] = [
    [
        'Giải tích — Đạo hàm',
        ['Định nghĩa & quy tắc', 'Đạo hàm hàm hợp', 'Ứng dụng đạo hàm'],
    ],
    [
        'Giải tích — Nguyên hàm & Tích phân',
        ['Nguyên hàm cơ bản', 'Tích phân xác định', 'Ứng dụng tích phân'],
    ],
    ['Hàm số & Đồ thị', ['Khảo sát hàm số', 'Tiệm cận', 'Tương giao đồ thị']],
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
];

const LITERATURE_UNITS: UnitSeed[] = [
    [
        'Văn học Việt Nam 1930–1945',
        ['Thơ mới', 'Truyện ngắn hiện thực'],
    ],
    ['Văn học Việt Nam 1945–1975', ['Thơ kháng chiến', 'Truyện và ký']],
    [
        'Văn học Việt Nam sau 1975',
        ['Thơ hiện đại', 'Truyện ngắn đương đại'],
    ],
    ['Văn học nước ngoài', ['Văn học Nga', 'Văn học Pháp']],
    ['Nghị luận văn học', ['Phân tích tác phẩm', 'So sánh tác phẩm']],
    ['Nghị luận xã hội', ['Hiện tượng đời sống', 'Tư tưởng đạo lý']],
    ['Tiếng Việt & Làm văn', ['Phong cách ngôn ngữ', 'Biện pháp tu từ']],
];

const PHYSICS_UNITS: UnitSeed[] = [
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
];

const CHEMISTRY_UNITS: UnitSeed[] = [
    ['Hoá đại cương', ['Cấu tạo nguyên tử', 'Liên kết hoá học']],
    [
        'Phản ứng & Tốc độ phản ứng',
        ['Cân bằng hoá học', 'Tốc độ phản ứng'],
    ],
    ['Hoá vô cơ — Kim loại', ['Kim loại kiềm & kiềm thổ', 'Nhôm và sắt']],
    ['Hoá vô cơ — Phi kim', ['Nhóm halogen', 'Nitơ và lưu huỳnh']],
    ['Hoá hữu cơ cơ bản', ['Hiđrocacbon', 'Dẫn xuất halogen, ancol']],
    [
        'Hoá hữu cơ nâng cao',
        ['Este và lipit', 'Amin, amino axit', 'Polime'],
    ],
];

const ENGLISH_UNITS: UnitSeed[] = [
    ['Grammar — Tenses & Voice', ['Verb tenses', 'Passive voice']],
    ['Grammar — Clauses', ['Relative clauses', 'Conditionals']],
    ['Vocabulary & Word forms', ['Collocations', 'Word formation']],
    ['Pronunciation & Stress', ['Sounds', 'Word stress']],
    ['Reading comprehension', ['Skimming & scanning', 'Inference']],
    ['Writing', ['Sentence transformation', 'Essay writing']],
];

const BIOLOGY_UNITS: UnitSeed[] = [
    ['Sinh học tế bào', ['Cấu trúc tế bào', 'Chuyển hoá vật chất']],
    ['Di truyền học', ['Quy luật Mendel', 'ADN và gen', 'Đột biến']],
    [
        'Sinh học cơ thể',
        ['Chuyển hoá ở thực vật', 'Chuyển hoá ở động vật'],
    ],
    ['Tiến hoá', ['Học thuyết tiến hoá', 'Nguồn gốc loài']],
    ['Sinh thái học', ['Quần thể và quần xã', 'Hệ sinh thái']],
];
