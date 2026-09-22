import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import {
    areaPath,
    axisTicks,
    chartScale,
    monotonePath,
    plotPoints,
    pointLeft,
    pointTop,
    tooltipShift,
} from '../../../../shared/charts/chart-geometry';
import {
    describeTrend,
    METRIC_RANGES,
    MetricPoint,
    MetricRange,
    MetricSeries,
    TrendTone,
} from '../../../../shared/models/cms.model';

interface PlottedPoint {
    index: number;
    left: string;
    top: string;
    label: string;
    value: string;
}

/**
 * One metric over time: area under a monotone line, with a range selector and a
 * crosshair tooltip. A single series, so it needs no legend — the card title
 * names it.
 */
@Component({
    selector: 'adm-trend-chart',
    standalone: true,
    imports: [],
    templateUrl: './trend-chart.component.html',
    styleUrl: './trend-chart.component.scss',
})
export class TrendChartComponent {
    @Input({ required: true }) title!: string;
    @Input() series: MetricSeries | null = null;
    @Input() range: MetricRange = '1M';
    @Input() color = '#1f6e52';
    /** Tint under the line; the line colour at low alpha. */
    @Input() fill = 'rgba(31, 110, 82, 0.1)';
    /** Prefixed to values, e.g. `$`. */
    @Input() prefix = '';
    /** Sentence after the total, e.g. `Total revenue`. */
    @Input() caption = '';

    @Output() rangeChange = new EventEmitter<MetricRange>();

    readonly ranges = METRIC_RANGES;
    readonly hovered = signal<number | null>(null);

    get points(): MetricPoint[] {
        return this.series?.points ?? [];
    }

    private get values(): number[] {
        return this.points.map((point) => point.value);
    }

    get linePath(): string {
        const scale = chartScale(this.values, this.points.length);
        return monotonePath(plotPoints(this.values, scale));
    }

    get areaPath(): string {
        return areaPath(this.linePath);
    }

    get plotted(): PlottedPoint[] {
        const scale = chartScale(this.values, this.points.length);
        return this.points.map((point, index) => ({
            index,
            left: pointLeft(index, this.points.length),
            top: pointTop(point.value, scale.max),
            label: point.label,
            value: this.format(point.value),
        }));
    }

    get hitWidth(): string {
        return chartScale(this.values, this.points.length).hitWidth;
    }

    get axisLabels(): MetricPoint[] {
        return axisTicks(this.points);
    }

    get yTop(): string {
        return this.format(
            Math.round(chartScale(this.values, this.points.length).max)
        );
    }

    get yMid(): string {
        return this.format(
            Math.round(chartScale(this.values, this.points.length).max / 2)
        );
    }

    get yZero(): string {
        return this.format(0);
    }

    get total(): string {
        return this.format(this.series?.total ?? 0);
    }

    get trend(): TrendTone {
        return describeTrend(this.series?.changePct ?? null);
    }

    get captionLine(): string {
        return `${this.caption} · vs prior ${this.range}`;
    }

    get hoveredPoint(): PlottedPoint | null {
        const index = this.hovered();
        return index === null ? null : this.plotted[index] ?? null;
    }

    get tooltipShift(): string {
        return tooltipShift(this.hovered(), this.points.length);
    }

    /** The hovered marker grows, so it reads as the one being measured. */
    markerSize(index: number): number {
        return this.hovered() === index ? 14 : 10;
    }

    private format(value: number): string {
        return `${this.prefix}${value.toLocaleString('en-US')}`;
    }
}
