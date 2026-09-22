/**
 * Demo metrics standing in for the analytics endpoint until the server exists.
 *
 * The series are generated rather than listed: two years of daily readings per
 * metric is far too much to hand-write, and a seeded generator keeps every
 * reload identical so the charts don't shimmer between renders.
 */

/** The day the demo data ends. Fixed so the charts are reproducible. */
export const SEEDED_TODAY = new Date(Date.UTC(2026, 8, 21));

/** Two years, so the 1Y range has a prior window to compare against. */
const SERIES_DAYS = 366 + 365;

/** `[days ago, multiplier]` — a promo or exam-season bump. */
type Spike = [number, number];

interface SeriesShape {
    seed: number;
    /** Readings per day before growth, seasonality and noise. */
    base: number;
    /** Weekend multiplier — study traffic dips on Saturday and Sunday. */
    weekendDip: number;
    spikes: Spike[];
}

/**
 * A seeded linear congruential generator. Deterministic across reloads, which
 * a chart needs far more than it needs true randomness.
 */
function seededRandom(seed: number): () => number {
    let state = seed;
    return () => {
        state = (state * 1664525 + 1013904223) % 4294967296;
        return state / 4294967296;
    };
}

function dailySeries({ seed, base, weekendDip, spikes }: SeriesShape): number[] {
    const random = seededRandom(seed);
    const out: number[] = [];

    for (let i = 0; i < SERIES_DAYS; i++) {
        const daysAgo = SERIES_DAYS - 1 - i;
        // Day 0 of the range is a Thursday, so 5 and 6 land on the weekend.
        const dayOfWeek = (i + 4) % 7;

        let value = base * (1 + 0.28 * (1 - daysAgo / SERIES_DAYS));
        value *= 1 + 0.35 * Math.exp(-daysAgo / 50); // exam season approaching
        value *= 0.86 + random() * 0.28; // day-to-day noise

        if (dayOfWeek === 5 || dayOfWeek === 6) {
            value *= weekendDip;
        }

        const spike = spikes.find(([at]) => Math.abs(daysAgo - at) <= 1);
        if (spike) {
            value *= spike[1] - Math.abs(daysAgo - spike[0]) * 0.25;
        }

        // A two-day outage, so the charts show what a gap looks like.
        if (daysAgo === 47 || daysAgo === 48) {
            value *= 0.12;
        }

        out.push(Math.round(value));
    }

    return out;
}

export function seedRevenue(): number[] {
    return dailySeries({
        seed: 7717,
        base: 260,
        weekendDip: 0.62,
        spikes: [
            [12, 2.1],
            [63, 1.7],
        ],
    });
}

export function seedTestCompletions(): number[] {
    return dailySeries({
        seed: 4093,
        base: 470,
        weekendDip: 0.7,
        spikes: [
            [9, 1.6],
            [86, 1.45],
        ],
    });
}

export interface ExamSeed {
    id: string;
    name: string;
    values: number[];
}

/** `[id, name, base readings per day, generator seed]` */
const EXAM_SEEDS: [string, string, number, number][] = [
    ['thptqg-2025-math', 'Kỳ thi THPT Quốc gia 2025 — Toán', 162, 5511],
    ['hust-2025-tsa', 'ĐH Bách Khoa HN 2025 — Đánh giá tư duy', 124, 8102],
    ['thptqg-2025-eng', 'Kỳ thi THPT Quốc gia 2025 — Tiếng Anh', 98, 2277],
    ['vnu-2025-hsa', 'ĐHQG Hà Nội 2025 — HSA', 73, 6640],
    ['thptqg-2025-phys', 'Kỳ thi THPT Quốc gia 2025 — Vật lý', 49, 3184],
    ['thptqg-2025-chem', 'Kỳ thi THPT Quốc gia 2025 — Hoá học', 34, 9021],
    ['thptqg-2025-lit', 'Kỳ thi THPT Quốc gia 2025 — Ngữ văn', 26, 1207],
];

export function seedExamAttempts(): ExamSeed[] {
    return EXAM_SEEDS.map(([id, name, base, seed]) => ({
        id,
        name,
        values: dailySeries({
            seed,
            base,
            weekendDip: 0.72,
            spikes: [
                [11, 1.5],
                [70, 1.35],
            ],
        }),
    }));
}

/** Headline figures; the wireframe's icons ride along so the cards stay data-driven. */
export const KPI_SEEDS = [
    {
        id: 'learners',
        label: 'Total learners',
        value: '12,480',
        caption: 'vs last week',
        changePct: 2.6,
        live: false,
        icon: 'M16 19v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M9.5 10.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM17 4.6a3.5 3.5 0 0 1 0 6.8M21 19v-1a4 4 0 0 0-3-3.8',
    },
    {
        id: 'questions',
        label: 'Questions live',
        value: '3,481',
        caption: '96 added',
        changePct: 2.8,
        live: false,
        icon: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 13.5v.01M9.6 9.3a2.5 2.5 0 1 1 3.6 2.4c-.7.4-1.2 1-1.2 1.8',
    },
    {
        id: 'active',
        label: 'Active students',
        value: '142',
        caption: 'right now',
        changePct: null,
        live: true,
        icon: 'M8 3h8l-1.6 5.2M8 3l1.6 5.2M12 21a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z',
    },
    {
        id: 'revenue',
        label: 'Revenue · 30d',
        value: '$8,240',
        caption: 'vs last month',
        changePct: -1.2,
        live: false,
        icon: 'M3 7h18v11H3V7Zm0 4.5h18M6 15h4',
    },
];
