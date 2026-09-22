/**
 * Pure SVG geometry for the dashboard charts.
 *
 * The charts draw into a fixed 640×200 viewBox stretched to the card's width
 * (`preserveAspectRatio: none`), so everything here works in view units and the
 * component positions its overlays in percentages.
 */

export const CHART_WIDTH = 640;
export const CHART_HEIGHT = 200;

/** Headroom above the tallest point so the peak never touches the top edge. */
export const CHART_HEADROOM = 1.12;

export interface ChartScale {
    /** Value at the top gridline. */
    max: number;
    /** Horizontal gap between points, in view units. */
    step: number;
    /** Width of one hover hit column, as a CSS percentage. */
    hitWidth: string;
}

export function chartScale(values: number[], pointCount: number): ChartScale {
    const peak = values.length ? Math.max(...values) : 0;
    return {
        max: peak * CHART_HEADROOM || 1,
        step: pointCount > 1 ? CHART_WIDTH / (pointCount - 1) : CHART_WIDTH,
        hitWidth: `${100 / Math.max(pointCount - 1, 1)}%`,
    };
}

/** Horizontal position of point `index`, as a CSS percentage. */
export function pointLeft(index: number, count: number): string {
    return `${count > 1 ? (index / (count - 1)) * 100 : 0}%`;
}

/** Vertical position of `value` measured from the top, as a CSS percentage. */
export function pointTop(value: number, max: number): string {
    return `${100 - (value / max) * 100}%`;
}

/**
 * Keeps a tooltip inside the plot: anchored left near the start, right near the
 * end, centred in between.
 */
export function tooltipShift(index: number | null, count: number): string {
    if (index === null || count < 2) {
        return 'translateX(-50%)';
    }
    const fraction = index / (count - 1);
    if (fraction < 0.18) {
        return 'translateX(0)';
    }
    return fraction > 0.82 ? 'translateX(-100%)' : 'translateX(-50%)';
}

/**
 * Fritsch–Carlson monotone cubic interpolation.
 *
 * A plain cubic spline overshoots between points, which on a metrics chart
 * invents peaks and dips that aren't in the data. This one never leaves the
 * interval between two neighbouring values.
 */
export function monotonePath(points: [number, number][]): string {
    const n = points.length;
    if (!n) {
        return '';
    }
    if (n < 2) {
        return `M${points[0][0]} ${points[0][1]}`;
    }

    const dx: number[] = [];
    const slope: number[] = [];
    for (let i = 0; i < n - 1; i++) {
        dx[i] = points[i + 1][0] - points[i][0];
        slope[i] = (points[i + 1][1] - points[i][1]) / dx[i];
    }

    const tangent: number[] = [slope[0]];
    for (let i = 1; i < n - 1; i++) {
        if (slope[i - 1] * slope[i] <= 0) {
            // A local extremum: flatten so the curve turns without overshooting.
            tangent[i] = 0;
        } else {
            const w1 = 2 * dx[i] + dx[i - 1];
            const w2 = dx[i - 1] + 2 * dx[i];
            tangent[i] = (w1 + w2) / (w1 / slope[i - 1] + w2 / slope[i]);
        }
    }
    tangent[n - 1] = slope[n - 2];

    let d = `M${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)}`;
    for (let i = 0; i < n - 1; i++) {
        const h = dx[i] / 3;
        const c1x = (points[i][0] + h).toFixed(1);
        const c1y = (points[i][1] + tangent[i] * h).toFixed(1);
        const c2x = (points[i + 1][0] - h).toFixed(1);
        const c2y = (points[i + 1][1] - tangent[i + 1] * h).toFixed(1);
        d += ` C${c1x} ${c1y} ${c2x} ${c2y} ${points[i + 1][0].toFixed(
            1
        )} ${points[i + 1][1].toFixed(1)}`;
    }
    return d;
}

/** Turns a line path into a filled area by closing it down to the baseline. */
export function areaPath(line: string): string {
    return `${line} L${CHART_WIDTH} ${CHART_HEIGHT} L0 ${CHART_HEIGHT} Z`;
}

/** The plotted points as view-unit coordinates. */
export function plotPoints(
    values: number[],
    scale: ChartScale
): [number, number][] {
    return values.map((value, index) => [
        index * scale.step,
        CHART_HEIGHT - (value / scale.max) * CHART_HEIGHT,
    ]);
}

/** Four evenly spaced axis labels — start, two thirds, end. */
export function axisTicks<T>(items: T[]): T[] {
    const last = items.length - 1;
    if (last < 0) {
        return [];
    }
    const indexes = [
        ...new Set([
            0,
            Math.round(last / 3),
            Math.round((2 * last) / 3),
            last,
        ]),
    ];
    return indexes.map((index) => items[index]);
}
