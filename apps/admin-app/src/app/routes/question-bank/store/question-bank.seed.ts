import { QuestionDifficulties, QuestionTypes } from '@libs/models';
import {
    AdminQuestion,
    QuestionMatch,
} from '../../../shared/models/cms.model';

/**
 * `[id, content, unitId, subUnitId, type, difficulty, level, match count]`
 *
 * Unit and sub-unit ids line up with the ones `seedSubjects()` hands out, so a
 * question is tagged on exactly the axes a mold block filters on.
 */
type QuestionSeed = [
    string,
    string,
    string,
    string,
    QuestionTypes,
    QuestionDifficulties,
    string,
    number
];

const SEEDED_AT = '2026-09-12T00:00:00.000Z';

/** Bank size the pager reports; only the rows below are actually loaded. */
export const SEEDED_BANK_TOTAL = 3481;

const T = QuestionTypes;
const D = QuestionDifficulties;

const QUESTION_SEEDS: QuestionSeed[] = [
    ['q_0149', 'Đạo hàm của hàm số y = sin x bằng biểu thức nào sau đây?', 'toan-u1', 'toan-u1-s1', T.MultipleChoice, D.Easy, 'Theoretical', 4],
    ['q_0150', 'Cho f(x) = 2x + 1. Giá trị f′(x) bằng bao nhiêu?', 'toan-u1', 'toan-u1-s1', T.MultipleChoice, D.Easy, 'Theoretical', 2],
    ['q_0141', 'Tính đạo hàm của hàm số f(x) = x³ − 3x + 2 tại x = 2.', 'toan-u1', 'toan-u1-s1', T.MultipleChoice, D.Medium, 'Basic application', 3],
    ['q_0144', 'Ghép mỗi hàm số với đạo hàm tương ứng của nó.', 'toan-u1', 'toan-u1-s2', T.Matching, D.Medium, 'Interpretation', 0],
    ['q_0147', 'Ứng dụng đạo hàm tìm giá trị lớn nhất của hàm số trên đoạn.', 'toan-u1', 'toan-u1-s3', T.MultipleChoice, D.Hard, 'Analysis', 1],
    ['q_0143', 'Nguyên hàm của cos(2x) là (1/2)sin(2x) + C.', 'toan-u2', 'toan-u2-s1', T.TrueFalse, D.Easy, 'Theoretical', 1],
    ['q_0146', 'Tính tích phân xác định của f(x) = 2x trên đoạn [0, 3].', 'toan-u2', 'toan-u2-s2', T.MultipleChoice, D.Easy, 'Basic application', 3],
    ['q_0148', 'Một vật chuyển động với v(t) = 3t² — tính quãng đường sau 4s.', 'toan-u2', 'toan-u2-s3', T.EssayAnswer, D.Hard, 'Practical application', 5],
    ['q_0142', 'Đồ thị hàm số y = 1/x có bao nhiêu đường tiệm cận?', 'toan-u3', 'toan-u3-s2', T.MultipleChoice, D.Easy, 'Theoretical', 2],
    ['q_0145', 'Trình bày các bước khảo sát và vẽ đồ thị hàm bậc ba.', 'toan-u3', 'toan-u3-s1', T.EssayAnswer, D.Hard, 'Synthesis', 2],
    ['q_0208', 'Xác định phong cách ngôn ngữ của đoạn trích sau.', 'van-u7', 'van-u7-s1', T.MultipleChoice, D.Easy, 'Nhận biết', 4],
    ['q_0211', 'Chỉ ra và nêu tác dụng của biện pháp tu từ trong câu thơ.', 'van-u7', 'van-u7-s2', T.ShortAnswer, D.Medium, 'Thông hiểu', 2],
    ['q_0203', 'Phân tích hình tượng người lính trong bài thơ "Tây Tiến".', 'van-u5', 'van-u5-s1', T.EssayAnswer, D.Hard, 'Vận dụng cao', 3],
    ['q_0262', 'Choose the word whose underlined part is pronounced differently.', 'anh-u3', 'anh-u3-s2', T.MultipleChoice, D.Easy, 'Recognition', 3],
];

/** Blocks the seeded questions are drawn against, cycled per match count. */
const MATCH_POOL: QuestionMatch[] = [
    { examId: 'thptqg-2025-math', examName: 'Kỳ thi THPT Quốc gia 2025 — Toán', moldName: 'Đề thi thử THPTQG — Mẫu A', blockLabel: 'PAGE 01 · BLOCK 2' },
    { examId: 'hust-2025-tsa', examName: 'ĐH Bách Khoa HN 2025 — Đánh giá tư duy', moldName: 'Đề đánh giá tư duy — Mẫu chuẩn', blockLabel: 'PAGE 01 · BLOCK 1' },
    { examId: 'thptqg-2024-math', examName: 'Kỳ thi THPT Quốc gia 2024 — Toán', moldName: 'Luyện tập theo chuyên đề — Đạo hàm', blockLabel: 'PAGE 01 · BLOCK 1' },
    { examId: 'vnu-2025-hsa', examName: 'ĐHQG Hà Nội 2025 — Đánh giá năng lực (HSA)', moldName: 'Đề HSA — Mẫu chuẩn', blockLabel: 'PAGE 01 · BLOCK 1' },
    { examId: 'hust-2025-tsa', examName: 'ĐH Bách Khoa HN 2025 — Đánh giá tư duy', moldName: 'Luyện tập — Tư duy Khoa học', blockLabel: 'PAGE 01 · BLOCK 2' },
];

/** The blocks a given question matches — the first `count` of the pool. */
export function seedMatches(count: number): QuestionMatch[] {
    return MATCH_POOL.slice(0, count).map((match) => ({ ...match }));
}

export function seedQuestions(): AdminQuestion[] {
    return QUESTION_SEEDS.map(
        ([id, content, unitId, subUnitId, qType, difficulty, level]) => ({
            id,
            subjectId: unitId.split('-')[0],
            unitIds: [unitId],
            subUnitIds: [subUnitId],
            qType,
            difficulty,
            level,
            content,
            solution: '',
            choices: seedChoices(qType),
            pairs: seedPairs(qType),
            trueFalseAnswer: true,
            modelAnswer: '',
            maxPoints: qType === QuestionTypes.EssayAnswer ? 10 : 1,
            updatedAt: SEEDED_AT,
        })
    );
}

/** Match counts live beside the questions so the service can answer for them. */
export function seedMatchCounts(): Record<string, number> {
    return Object.fromEntries(
        QUESTION_SEEDS.map(([id, , , , , , , matches]) => [id, matches])
    );
}

function seedChoices(qType: QuestionTypes) {
    if (qType !== QuestionTypes.MultipleChoice) {
        return [];
    }
    return [
        ['A', '16 m', false],
        ['B', '64 m', true],
        ['C', '48 m', false],
        ['D', '24 m', false],
    ].map(([key, text, correct], index) => ({
        id: `c${index + 1}`,
        key: key as string,
        text: text as string,
        correct: correct as boolean,
    }));
}

function seedPairs(qType: QuestionTypes) {
    if (qType !== QuestionTypes.Matching) {
        return [];
    }
    return [
        ['y = x²', 'y′ = 2x'],
        ['y = sin x', 'y′ = cos x'],
        ['y = ln x', 'y′ = 1/x'],
    ].map(([left, right], index) => ({
        id: `p${index + 1}`,
        left,
        right,
    }));
}
