import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
    DashboardKpi,
    ExamMetricSeries,
    MetricPoint,
    MetricRange,
    MetricSeries,
} from '../../../shared/models/cms.model';
import {
    KPI_SEEDS,
    seedExamAttempts,
    seedRevenue,
    seedTestCompletions,
    SEEDED_TODAY,
} from './dashboard.seed';

export interface DashboardQuery {
    revenueRange: MetricRange;
    testsRange: MetricRange;
    examsRange: MetricRange;
}

export interface DashboardSnapshot {
    kpis: DashboardKpi[];
    revenue: MetricSeries;
    tests: MetricSeries;
    exams: ExamMetricSeries[];
}

/** `[days covered, days per bucket]` — a month is daily, a year is monthly. */
const RANGE_BUCKETS: Record<MetricRange, [number, number]> = {
    '1M': [30, 1],
    '3M': [91, 7],
    '6M': [182, 7],
    '1Y': [360, 30],
};

interface Bucket {
    /** Days ago the bucket starts (inclusive, counting back from today). */
    from: number;
    /** Days ago the bucket ends (inclusive). */
    to: number;
    label: string;
    axis: string;
}

/**
 * The dashboard's data boundary.
 *
 * The bucketing below is what the metrics endpoint will do server-side: it
 * answers with points already rolled up for the requested range, plus the
 * totals and period-over-period change, so the charts only ever draw what they
 * are given. Swapping in `HttpClient` is a change confined to this file.
 */
@Injectable({ providedIn: 'root' })
export class DashboardService {
    private readonly revenue = seedRevenue();
    private readonly tests = seedTestCompletions();
    private readonly exams = seedExamAttempts();

    getDashboard(query: DashboardQuery): Observable<DashboardSnapshot> {
        return of({
            kpis: KPI_SEEDS.map((kpi) => ({ ...kpi })),
            revenue: this.rollUp(this.revenue, query.revenueRange),
            tests: this.rollUp(this.tests, query.testsRange),
            exams: this.exams
                .map((exam) => {
                    const series = this.rollUp(exam.values, query.examsRange);
                    return {
                        id: exam.id,
                        name: exam.name,
                        total: series.total,
                        points: series.points,
                    };
                })
                // Busiest first, so the default "top 5" means the top 5.
                .sort((a, b) => b.total - a.total),
        });
    }

    private rollUp(values: number[], range: MetricRange): MetricSeries {
        const buckets = this.bucketsFor(range);
        const points = buckets.map((bucket) => ({
            label: bucket.label,
            axis: bucket.axis,
            value: this.sumDays(values, bucket.from, bucket.to),
        }));
        const total = points.reduce((sum, point) => sum + point.value, 0);

        // The window immediately before this one, same length, for the trend.
        const [days] = RANGE_BUCKETS[range];
        const prior = this.sumDays(
            values.slice(0, values.length - days),
            days - 1,
            0
        );

        return {
            points,
            total,
            changePct: prior ? ((total - prior) / prior) * 100 : null,
        };
    }

    /** Sums the daily readings between two "days ago" offsets, inclusive. */
    private sumDays(values: number[], from: number, to: number): number {
        let sum = 0;
        for (let daysAgo = from; daysAgo >= to; daysAgo--) {
            sum += values[values.length - 1 - daysAgo] ?? 0;
        }
        return sum;
    }

    private bucketsFor(range: MetricRange): Bucket[] {
        const [days, step] = RANGE_BUCKETS[range];
        const buckets: Bucket[] = [];

        for (let from = days - 1; from >= 0; from -= step) {
            const to = Math.max(0, from - step + 1);
            buckets.push({
                from,
                to,
                ...this.labelFor(from, to, step),
            });
        }

        return buckets;
    }

    private labelFor(
        from: number,
        to: number,
        step: number
    ): Pick<MetricPoint, 'label' | 'axis'> {
        const start = this.dateAt(from);

        if (step === 1) {
            return {
                label: formatDate(start, {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                }),
                axis: formatDate(start, { day: 'numeric', month: 'short' }),
            };
        }

        if (step === 7) {
            const short = formatDate(start, {
                day: '2-digit',
                month: '2-digit',
            });
            return { label: `Week of ${short}`, axis: short };
        }

        // Monthly buckets read better labelled by the month they sit in.
        const middle = this.dateAt(Math.round((from + to) / 2));
        return {
            label: formatDate(middle, { month: 'long', year: 'numeric' }),
            axis: formatDate(middle, { month: 'short' }),
        };
    }

    private dateAt(daysAgo: number): Date {
        return new Date(SEEDED_TODAY.getTime() - daysAgo * 86400000);
    }
}

function formatDate(date: Date, options: Intl.DateTimeFormatOptions): string {
    return date.toLocaleDateString('en-GB', { ...options, timeZone: 'UTC' });
}
