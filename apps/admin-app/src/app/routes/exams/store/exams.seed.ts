import {
    MoldStatuses,
    MoldTypes,
    QuestionDifficulties,
    QuestionTypes,
} from '@libs/models';
import {
    AdminExam,
    AdminMold,
    ExamSection,
    ExamTypes,
} from '../../../shared/models/cms.model';

/** `[subjectId, section label, unit ids in scope]` */
type SectionSeed = [string, string, string[]];

/** `[sectionId, unitId, subUnitIds, question type, difficulty, count]` */
type BlockSeed = [
    string,
    string,
    string[],
    QuestionTypes,
    QuestionDifficulties,
    number
];

const SEEDED_AT = '2026-09-12T00:00:00.000Z';

const NATIONAL_DESC =
    'Yearly prototype of the national high-school graduation exam. Each subject is sat as its own paper, so this exam has exactly one section.';

const UNIVERSITY_DESC =
    'Independent university entrance assessment: a single timed sitting spanning several subjects, marked as one combined score.';

/**
 * Demo papers standing in for the exams endpoint until the server exists.
 * Unit ids here match the ones `seedSubjects()` hands out.
 */
export function seedExams(): AdminExam[] {
    return buildExams();
}

function buildExams(): AdminExam[] {
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
        exam(
            'thptqg-2025-math',
            'Kỳ thi THPT Quốc gia 2025 — Toán',
            'THPTQG-2025-MATH',
            2025,
            ExamTypes.National,
            'Bộ Giáo dục và Đào tạo',
            NATIONAL_DESC,
            mathSection,
            (examId, sections) => mathMolds(examId, sections[0].id)
        ),
        exam(
            'hust-2025-tsa',
            'ĐH Bách Khoa HN 2025 — Đánh giá tư duy',
            'HUST-2025-TSA',
            2025,
            ExamTypes.University,
            'ĐH Bách Khoa Hà Nội',
            UNIVERSITY_DESC,
            tsaSections,
            (examId, sections) => tsaMolds(examId, sections)
        ),
        exam(
            'vnu-2025-hsa',
            'ĐHQG Hà Nội 2025 — Đánh giá năng lực (HSA)',
            'VNU-2025-HSA',
            2025,
            ExamTypes.University,
            'ĐH Quốc gia Hà Nội',
            UNIVERSITY_DESC,
            hsaSections,
            (examId, sections) => hsaMolds(examId, sections)
        ),
        exam(
            'thptqg-2024-math',
            'Kỳ thi THPT Quốc gia 2024 — Toán',
            'THPTQG-2024-MATH',
            2024,
            ExamTypes.National,
            'Bộ Giáo dục và Đào tạo',
            NATIONAL_DESC,
            mathSection,
            (examId, sections) =>
                mathMolds(examId, sections[0].id).slice(0, 2)
        ),
        exam(
            'hust-2024-tsa',
            'ĐH Bách Khoa HN 2024 — Đánh giá tư duy',
            'HUST-2024-TSA',
            2024,
            ExamTypes.University,
            'ĐH Bách Khoa Hà Nội',
            UNIVERSITY_DESC,
            tsaSections,
            (examId, sections) => tsaMolds(examId, sections).slice(0, 1)
        ),
        exam(
            'thptqg-2023-math',
            'Kỳ thi THPT Quốc gia 2023 — Toán',
            'THPTQG-2023-MATH',
            2023,
            ExamTypes.National,
            'Bộ Giáo dục và Đào tạo',
            NATIONAL_DESC,
            mathSection,
            (examId, sections) =>
                mathMolds(examId, sections[0].id).slice(0, 1)
        ),
        exam(
            'internal-2023-math',
            'Đề ôn luyện nội bộ 2023',
            'INTERNAL-2023-MATH',
            2023,
            ExamTypes.Custom,
            'ExamPrep',
            'Internal practice prototype built by the content team. Not tied to any official sitting.',
            mathSection,
            (examId, sections) =>
                mathMolds(examId, sections[0].id).slice(1, 2)
        ),
    ];
}

function exam(
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
        updatedAt: SEEDED_AT,
        sections,
        molds: moldFactory ? moldFactory(id, sections) : [],
    };
}

function mathMolds(examId: string, sectionId: string): AdminMold[] {
    const prefix = `${examId}-m`;
    return [
        mold(`${prefix}1`, examId, 'Đề thi thử THPTQG — Mẫu A', {
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
        mold(`${prefix}2`, examId, 'Luyện tập theo chuyên đề — Đạo hàm', {
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
        mold(`${prefix}3`, examId, 'Đề thi thử THPTQG — Mẫu B (rút gọn)', {
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

function tsaMolds(examId: string, sections: ExamSection[]): AdminMold[] {
    const [math, reading, science] = sections.map((section) => section.id);
    return [
        mold(`${examId}-m1`, examId, 'Đề đánh giá tư duy — Mẫu chuẩn', {
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
        mold(`${examId}-m2`, examId, 'Luyện tập — Tư duy Khoa học', {
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

function hsaMolds(examId: string, sections: ExamSection[]): AdminMold[] {
    const [quant, qual, science] = sections.map((section) => section.id);
    return [
        mold(`${examId}-m1`, examId, 'Đề HSA — Mẫu chuẩn', {
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

function mold(
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
