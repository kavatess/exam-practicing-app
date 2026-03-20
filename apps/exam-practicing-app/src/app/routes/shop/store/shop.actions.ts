/* eslint-disable @typescript-eslint/no-explicit-any */
import { ShopSection } from '@libs/models';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ShopActions = createActionGroup({
    source: 'Shop',
    events: {
        GetShopList: emptyProps,
        GetShopListSuccess: props<{ data: ShopSection[] }>(),
        GetShopListFailure: props<{ error: any }>(),
        PurchaseItem: props<{ itemId: string | number }>(),
        PurchaseItemSuccess: props<{ data: any }>(),
        PurchaseItemFailure: props<{ error: any }>(),
    },
});
