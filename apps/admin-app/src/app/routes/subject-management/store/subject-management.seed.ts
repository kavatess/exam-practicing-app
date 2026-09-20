import { AdminSubject, AdminUnit } from '../../../shared/models/cms.model';

/** `[unit title, sub-unit titles]` */
type UnitSeed = [string, string[]];

/** `[id, name, description, units]` */
type SubjectSeed = [string, string, string, UnitSeed[]];

const SEEDED_AT = '2026-09-12T00:00:00.000Z';

/**
 * Demo taxonomy standing in for the subjects endpoint until the server exists.
 * Ids are stable and human-readable (`toan-u1`, `toan-u1-s2`) so exam seeds can
 * reference units without a lookup.
 */
export function seedSubjects(): AdminSubject[] {
    return SUBJECT_SEEDS.map(([id, name, description, unitSeeds]) => ({
        id,
        name,
        description,
        updatedAt: SEEDED_AT,
        units: unitSeeds.map((seed, index) => seedUnit(id, seed, index)),
    }));
}

function seedUnit(
    subjectId: string,
    [title, subTitles]: UnitSeed,
    index: number
): AdminUnit {
    const unitId = `${subjectId}-u${index + 1}`;
    // Descending counts keep the demo tree looking like a real question bank.
    const unitTotal = 112 - index * 11;
    const share = Math.floor(unitTotal / subTitles.length);
    return {
        id: unitId,
        subjectId,
        title,
        description: '',
        iconUrl: '',
        questionCount: unitTotal,
        subUnits: subTitles.map((subTitle, subIndex) => ({
            id: `${unitId}-s${subIndex + 1}`,
            unitId,
            title: subTitle,
            description: '',
            iconUrl: '',
            questionCount:
                subIndex === 0
                    ? unitTotal - share * (subTitles.length - 1)
                    : share,
        })),
    };
}

const SUBJECT_SEEDS: SubjectSeed[] = [
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
