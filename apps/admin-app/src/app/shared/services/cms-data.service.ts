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
            updatedAt: '2026-09-12T00:00:00.000Z',
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
        const mathScope = [
            'toan-u1',
            'toan-u2',
            'toan-u3',
            'toan-u5',
            'toan-u7',
        ];
        const tsaSections: SectionSeed[] = [
            ['toan', 'Tư duy Toán học', ['toan-u1', 'toan-u3', 'toan-u5', 'toan-u7']],
            ['van', 'Tư duy Đọc hiểu', ['van-u7', 'van-u6', 'van-u5']],
            [
                'khoahoc',
                'Tư duy Khoa học',
                ['khoahoc-u1', 'khoahoc-u3', 'khoahoc-u4', 'khoahoc-u5'],
            ],
        ];
        const hsaSections: SectionSeed[] = [
            ['toan', 'Tư duy định lượng', ['toan-u1', 'toan-u3', 'toan-u7']],
            ['van', 'Tư duy định tính', ['van-u7', 'van-u6']],
            ['khoahoc', 'Khoa học', ['khoahoc-u2', 'khoahoc-u4', 'khoahoc-u5']],
        ];
        const mathSection: SectionSeed[] = [['toan', '', mathScope]];

        return [
            this.exam(
                'thptqg-2025-math',
                'Kỳ thi THPT Quốc gia 2025 — Toán',
                'THPTQG-2025-MATH',
                2025,
                ExamTypes.National,
                'Bộ Giáo dục và Đào tạo',
                NATIONAL_DESC,
                mathSection,
                (examId, sections) => this.mathMolds(examId, sections[0].id)
            ),
            this.exam(
                'hust-2025-tsa',
                'ĐH Bách Khoa HN 2025 — Đánh giá tư duy',
                'HUST-2025-TSA',
                2025,
                ExamTypes.University,
                'ĐH Bách Khoa Hà Nội',
                UNIVERSITY_DESC,
                tsaSections,
                (examId, sections) => this.tsaMolds(examId, sections)
            ),
            this.exam(
                'vnu-2025-hsa',
                'ĐHQG Hà Nội 2025 — Đánh giá năng lực (HSA)',
                'VNU-2025-HSA',
                2025,
                ExamTypes.University,
                'ĐH Quốc gia Hà Nội',
                UNIVERSITY_DESC,
                hsaSections,
                (examId, sections) => this.hsaMolds(examId, sections)
            ),
            this.exam(
                'thptqg-2024-math',
                'Kỳ thi THPT Quốc gia 2024 — Toán',
                'THPTQG-2024-MATH',
                2024,
                ExamTypes.National,
                'Bộ Giáo dục và Đào tạo',
                NATIONAL_DESC,
                mathSection,
                (examId, sections) =>
                    this.mathMolds(examId, sections[0].id).slice(0, 2)
            ),
            this.exam(
                'hust-2024-tsa',
                'ĐH Bách Khoa HN 2024 — Đánh giá tư duy',
                'HUST-2024-TSA',
                2024,
                ExamTypes.University,
                'ĐH Bách Khoa Hà Nội',
                UNIVERSITY_DESC,
                tsaSections,
                (examId, sections) => this.tsaMolds(examId, sections).slice(0, 1)
            ),
            this.exam(
                'thptqg-2023-math',
                'Kỳ thi THPT Quốc gia 2023 — Toán',
                'THPTQG-2023-MATH',
                2023,
                ExamTypes.National,
                'Bộ Giáo dục và Đào tạo',
                NATIONAL_DESC,
                mathSection,
                (examId, sections) =>
                    this.mathMolds(examId, sections[0].id).slice(0, 1)
            ),
            this.exam(
                'internal-2023-math',
                'Đề ôn luyện nội bộ 2023',
                'INTERNAL-2023-MATH',
                2023,
                ExamTypes.Custom,
                'ExamPrep',
                'Internal practice prototype built by the content team. Not tied to any official sitting.',
                mathSection,
                (examId, sections) =>
                    this.mathMolds(examId, sections[0].id).slice(1, 2)
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
        sectionSeeds: SectionSeed[],
        moldFactory?: (examId: string, sections: ExamSection[]) => AdminMold[]
    ): AdminExam {
        const sections: ExamSection[] = sectionSeeds.map(
            ([subjectId, label, unitIds], index) => ({
                id: `${id}-sec${index + 1}`,
                examId: id,
                subjectId,
                label,
                unitIds: [...unitIds],
            })
        );
        return {
            id,
            name,
            code,
            year,
            examType,
            org,
            description,
            iconUrl: '',
            updatedAt: '2026-09-12T00:00:00.000Z',
            sections,
            molds: moldFactory ? moldFactory(id, sections) : [],
        };
    }

    private mathMolds(examId: string, sectionId: string): AdminMold[] {
        const prefix = `${examId}-m`;
        return [
            this.mold(`${prefix}1`, examId, 'Đề thi thử THPTQG — Mẫu A', {
                type: MoldTypes.Test,
                status: MoldStatuses.Active,
                numOfQuestions: 50,
                duration: 90,
                passingScore: 30,
                pages: [
                    [
                        'Phần 1 — Nhận biết & Thông hiểu',
                        [
                            [sectionId, 'toan-u1', ['toan-u1-s1', 'toan-u1-s2'], QuestionTypes.MultipleChoice, QuestionDifficulties.Easy, 12],
                            [sectionId, 'toan-u3', ['toan-u3-s1'], QuestionTypes.TrueFalse, QuestionDifficulties.Easy, 8],
                        ],
                    ],
                    [
                        'Phần 2 — Vận dụng',
                        [
                            [sectionId, 'toan-u2', ['toan-u2-s2', 'toan-u2-s3'], QuestionTypes.MultipleChoice, QuestionDifficulties.Medium, 12],
                            [sectionId, 'toan-u5', ['toan-u5-s3'], QuestionTypes.MultipleChoice, QuestionDifficulties.Medium, 8],
                        ],
                    ],
                    [
                        'Phần 3 — Vận dụng cao',
                        [
                            [sectionId, 'toan-u7', ['toan-u7-s2'], QuestionTypes.Matching, QuestionDifficulties.Hard, 6],
                            [sectionId, 'toan-u1', ['toan-u1-s3'], QuestionTypes.EssayAnswer, QuestionDifficulties.Hard, 4],
                        ],
                    ],
                ],
            }),
            this.mold(`${prefix}2`, examId, 'Luyện tập theo chuyên đề — Đạo hàm', {
                type: MoldTypes.Practice,
                status: MoldStatuses.Active,
                numOfQuestions: 15,
                duration: 25,
                passingScore: 9,
                pages: [
                    [
                        'Luyện tập',
                        [
                            [sectionId, 'toan-u1', ['toan-u1-s1'], QuestionTypes.MultipleChoice, QuestionDifficulties.Easy, 9],
                            [sectionId, 'toan-u1', ['toan-u1-s3'], QuestionTypes.MultipleChoice, QuestionDifficulties.Medium, 6],
                        ],
                    ],
                ],
            }),
            this.mold(`${prefix}3`, examId, 'Đề thi thử THPTQG — Mẫu B (rút gọn)', {
                type: MoldTypes.Test,
                status: MoldStatuses.Inactive,
                numOfQuestions: 30,
                duration: 60,
                passingScore: 18,
                pages: [
                    [
                        'Phần 1',
                        [
                            [sectionId, 'toan-u3', ['toan-u3-s1', 'toan-u3-s2'], QuestionTypes.MultipleChoice, QuestionDifficulties.Easy, 12],
                            [sectionId, 'toan-u6', ['toan-u6-s1'], QuestionTypes.MultipleChoice, QuestionDifficulties.Medium, 8],
                        ],
                    ],
                    [
                        'Phần 2',
                        [
                            [sectionId, 'toan-u7', ['toan-u7-s1'], QuestionTypes.Matching, QuestionDifficulties.Hard, 10],
                        ],
                    ],
                ],
            }),
        ];
    }

    private tsaMolds(examId: string, sections: ExamSection[]): AdminMold[] {
        const [math, reading, science] = sections.map((section) => section.id);
        return [
            this.mold(`${examId}-m1`, examId, 'Đề đánh giá tư duy — Mẫu chuẩn', {
                type: MoldTypes.Test,
                status: MoldStatuses.Active,
                numOfQuestions: 100,
                duration: 150,
                passingScore: 60,
                pages: [
                    [
                        'Phần 1 — Tư duy Toán học',
                        [
                            [math, 'toan-u1', ['toan-u1-s1', 'toan-u1-s3'], QuestionTypes.MultipleChoice, QuestionDifficulties.Medium, 24],
                            [math, 'toan-u7', ['toan-u7-s2'], QuestionTypes.Matching, QuestionDifficulties.Hard, 16],
                        ],
                    ],
                    [
                        'Phần 2 — Tư duy Đọc hiểu',
                        [
                            [reading, 'van-u7', ['van-u7-s1', 'van-u7-s2'], QuestionTypes.EssayAnswer, QuestionDifficulties.Medium, 12],
                            [reading, 'van-u6', ['van-u6-s1'], QuestionTypes.MultipleChoice, QuestionDifficulties.Easy, 8],
                        ],
                    ],
                    [
                        'Phần 3 — Tư duy Khoa học',
                        [
                            [science, 'khoahoc-u5', ['khoahoc-u5-s1', 'khoahoc-u5-s2'], QuestionTypes.Matching, QuestionDifficulties.Medium, 22],
                            [science, 'khoahoc-u3', ['khoahoc-u3-s1'], QuestionTypes.MultipleChoice, QuestionDifficulties.Hard, 18],
                        ],
                    ],
                ],
            }),
            this.mold(`${examId}-m2`, examId, 'Luyện tập — Tư duy Khoa học', {
                type: MoldTypes.Practice,
                status: MoldStatuses.Active,
                numOfQuestions: 20,
                duration: 30,
                passingScore: 12,
                pages: [
                    [
                        'Luyện tập',
                        [
                            [science, 'khoahoc-u1', ['khoahoc-u1-s1'], QuestionTypes.MultipleChoice, QuestionDifficulties.Medium, 10],
                            [science, 'khoahoc-u4', ['khoahoc-u4-s1'], QuestionTypes.MultipleChoice, QuestionDifficulties.Hard, 10],
                        ],
                    ],
                ],
            }),
        ];
    }

    private hsaMolds(examId: string, sections: ExamSection[]): AdminMold[] {
        const [quant, qual, science] = sections.map((section) => section.id);
        return [
            this.mold(`${examId}-m1`, examId, 'Đề HSA — Mẫu chuẩn', {
                type: MoldTypes.Test,
                status: MoldStatuses.Active,
                numOfQuestions: 150,
                duration: 195,
                passingScore: 90,
                pages: [
                    [
                        'Phần 1 — Tư duy định lượng',
                        [
                            [quant, 'toan-u3', ['toan-u3-s1', 'toan-u3-s3'], QuestionTypes.MultipleChoice, QuestionDifficulties.Medium, 50],
                        ],
                    ],
                    [
                        'Phần 2 — Tư duy định tính',
                        [
                            [qual, 'van-u7', ['van-u7-s1'], QuestionTypes.MultipleChoice, QuestionDifficulties.Medium, 50],
                        ],
                    ],
                    [
                        'Phần 3 — Khoa học',
                        [
                            [science, 'khoahoc-u5', ['khoahoc-u5-s1'], QuestionTypes.MultipleChoice, QuestionDifficulties.Advanced, 50],
                        ],
                    ],
                ],
            }),
        ];
    }

    private mold(
        id: string,
        examId: string,
        name: string,
        spec: {
            type: MoldTypes;
            status: MoldStatuses;
            numOfQuestions: number;
            duration: number;
            passingScore: number;
            pages: [string, BlockSeed[]][];
        }
    ): AdminMold {
        return {
            id,
            courseId: examId,
            name,
            description: '',
            type: spec.type,
            status: spec.status,
            numOfQuestions: spec.numOfQuestions,
            duration: spec.duration,
            passingScore: spec.passingScore,
            pages: spec.pages.map(([pageName, blocks], pageIndex) => {
                const pageId = `${id}-p${pageIndex + 1}`;
                return {
                    id: pageId,
                    moldId: id,
                    name: pageName,
                    description: '',
                    blocks: blocks.map(
                        (
                            [
                                sectionId,
                                courseUnitId,
                                subUnitIds,
                                qType,
                                difficulty,
                                questionCount,
                            ],
                            blockIndex
                        ) => ({
                            id: `${pageId}-b${blockIndex + 1}`,
                            moldId: id,
                            pageId,
                            qIndex: blockIndex,
                            sectionId,
                            courseUnitId,
                            subUnitIds: [...subUnitIds],
                            qType,
                            difficulty,
                            questionCount,
                        })
                    ),
                };
            }),
        };
    }
}

type SectionSeed = [string, string, string[]];

type BlockSeed = [
    string,
    string,
    string[],
    QuestionTypes,
    QuestionDifficulties,
    number
];

const NATIONAL_DESC =
    'Yearly prototype of the national high-school graduation exam. Each subject is sat as its own paper, so this exam has exactly one section.';

const UNIVERSITY_DESC =
    'Independent university entrance assessment: a single timed sitting spanning several subjects, marked as one combined score.';

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
