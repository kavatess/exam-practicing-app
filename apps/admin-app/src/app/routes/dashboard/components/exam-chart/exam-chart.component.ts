import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import {
    axisTicks,
    chartScale,
    monotonePath,
    plotPoints,
    pointLeft,
    pointTop,
    tooltipShift,
} from '../../../../shared/charts/chart-geometry';
import {
    METRIC_RANGES,
    MetricPoint,
    MetricRange,
} from '../../../../shared/models/cms.model';
import { ExamSeriesView } from '../../store/dashboard.selectors';
import { ExamLegendComponent } from '../exam-legend/exam-legend.component';

interface PlottedSeries {
    id: string;
    name: string;
    color: string;
    line: string;
    markers: { left: string; top: string }[];
}

interface HoverRow {
    name: string;
    color: string;
    value: string;
}

/**
 * Attempts per exam over time. Every plotted series carries a named legend chip,
 * so identity never rests on colour alone.
 */
@Component({
    selector: 'adm-exam-chart',
    standalone: true,
    imports: [ExamLegendComponent],
    templateUrl: './exam-chart.component.html',
    styleUrl: './exam-chart.component.scss',
})
export class ExamChartComponent {
    @Input() series: ExamSeriesView[] = [];
    @Input() range: MetricRange = '1M';

    @Output() rangeChange = new EventEmitter<MetricRange>();
    @Output() toggleExam = new EventEmitter<string>();
    @Output() showAll = new EventEmitter<void>();
    @Output() resetToTop = new EventEmitter<void>();

    readonly ranges = METRIC_RANGES;
    readonly hovered = signal<number | null>(null);

    get visible(): ExamSeriesView[] {
        return this.series.filter((exam) => exam.visible);
    }

    get empty(): boolean {
        return this.visible.length === 0;
    }

    /** Buckets come back identical across series, so the first one sets the axis. */
    private get axisPoints(): MetricPoint[] {
        return this.series[0]?.points ?? [];
    }

    /** The scale spans the plotted series only, so hiding one rescales the rest. */
    private get scaleMax(): number {
        const peaks = this.visible.map((exam) =>
            Math.max(...exam.points.map((point) => point.value), 0)
        );
        return chartScale(peaks, this.axisPoints.length).max;
    }

    get plotted(): PlottedSeries[] {
        const count = this.axisPoints.length;
        const max = this.scaleMax;
        const scale = { ...chartScale([max / 1.12], count), max };

        return this.visible.map((exam) => {
            const values = exam.points.map((point) => point.value);
            return {
                id: exam.id,
                name: exam.name,
                color: exam.color,
                line: monotonePath(plotPoints(values, scale)),
                markers: exam.points.map((point, index) => ({
                    left: pointLeft(index, count),
                    top: pointTop(point.value, max),
                })),
            };
        });
    }

    get columns(): { index: number; left: string; label: string }[] {
        return this.axisPoints.map((point, index) => ({
            index,
            left: pointLeft(index, this.axisPoints.length),
            label: point.label,
        }));
    }

    get hitWidth(): string {
        return chartScale([], this.axisPoints.length).hitWidth;
    }

    get axisLabels(): MetricPoint[] {
        return axisTicks(this.axisPoints);
    }

    get yTop(): string {
        return this.format(Math.round(this.scaleMax));
    }

    get yMid(): string {
        return this.format(Math.round(this.scaleMax / 2));
    }

    /** Attempts across the plotted exams — the figure beside the title. */
    get total(): string {
        return this.format(
            this.visible.reduce((sum, exam) => sum + exam.total, 0)
        );
    }

    get hoveredLabel(): string {
        const index = this.hovered();
        return index === null ? '' : this.axisPoints[index]?.label ?? '';
    }

    get hoveredLeft(): string {
        const index = this.hovered();
        return index === null
            ? '0%'
            : pointLeft(index, this.axisPoints.length);
    }

    get tooltipShift(): string {
        return tooltipShift(this.hovered(), this.axisPoints.length);
    }

    /** Biggest first, so the tooltip reads in the same order as the lines stack. */
    get hoverRows(): HoverRow[] {
        const index = this.hovered();
        if (index === null) {
            return [];
        }
        return this.visible
            .map((exam) => ({
                name: exam.name,
                color: exam.color,
                raw: exam.points[index]?.value ?? 0,
            }))
            .sort((a, b) => b.raw - a.raw)
            .map(({ name, color, raw }) => ({
                name,
                color,
                value: this.format(raw),
            }));
    }

    markerSize(index: number): number {
        return this.hovered() === index ? 14 : 10;
    }

    private format(value: number): string {
        return value.toLocaleString('en-US');
    }
}
