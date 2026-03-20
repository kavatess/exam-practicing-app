import { ShopSection } from '@libs/models';
import { createReducer, on } from '@ngrx/store';
import { ShopActions } from './shop.actions';

export interface ShopStoreState {
    purchasing: boolean;
    testId: string;
    data: ShopSection[];
}

export const initialState: ShopStoreState = {
    purchasing: false,
    testId: '',
    data: null,
};

export const shopReducer = createReducer(
    initialState,
    on(ShopActions.getShopListSuccess, (state, { data }) => ({
        ...state,
        data,
    })),
    on(ShopActions.purchaseItem, (state) => ({
        ...state,
        purchasing: true,
    })),
    on(ShopActions.purchaseItemSuccess, (state) => ({
        ...state,
        purchasing: false,
    })),
    on(ShopActions.purchaseItemFailure, (state) => ({
        ...state,
        purchasing: false,
    }))
);
