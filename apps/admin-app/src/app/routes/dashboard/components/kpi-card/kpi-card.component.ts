import { Component, Input } from '@angular/core';
import {
    DashboardKpi,
    describeTrend,
    TrendTone,
} from '../../../../shared/models/cms.model';

/**
 * A headline figure. No plot, so no hover layer — the number is the whole point
 * and the pill beside it carries the comparison.
 */
@Component({
    selector: 'adm-kpi-card',
    standalone: true,
    imports: [],
    templateUrl: './kpi-card.component.html',
    styleUrl: './kpi-card.component.scss',
})
export class KpiCardComponent {
    @Input({ required: true }) kpi!: DashboardKpi;

    get trend(): TrendTone {
        return describeTrend(this.kpi.changePct);
    }
}
