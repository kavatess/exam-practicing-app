import { ShopSection } from '@libs/models';
import { createReducer, on } from '@ngrx/store';
import { ShopActions } from './shop.actions';

export interface ShopStoreState {
    testId: string;
    data: ShopSection[];
}

export const initialState: ShopStoreState = {
    testId: '',
    data: null,
};

export const shopReducer = createReducer(
    initialState,
    on(ShopActions.getShopListSuccess, (state, { data }) => ({
        ...state,
        data,
    }))
);
