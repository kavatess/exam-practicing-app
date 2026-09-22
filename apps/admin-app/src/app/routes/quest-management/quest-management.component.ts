import { Component } from '@angular/core';
import { EntityKind } from '../../shared/models/cms.model';
import { CatalogPageComponent } from '../catalog/components/catalog-page/catalog-page.component';

@Component({
    selector: 'adm-quest-management',
    standalone: true,
    imports: [CatalogPageComponent],
    template: `<adm-catalog-page [kind]="kind"></adm-catalog-page>`,
})
export class QuestManagementComponent {
    readonly kind: EntityKind = 'quest';
}
