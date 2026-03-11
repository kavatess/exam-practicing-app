import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ShopStoreState } from './shop.reducer';

// Feature Key
export const shopStoreKey = 'Shop';

// Selectors
export const shopFeatureSelector = createFeatureSelector<ShopStoreState>(shopStoreKey);

// Selectors
export const ShopSelectors = {
    ShopList: createSelector(
        shopFeatureSelector,
        (state: ShopStoreState) => state.data
    ),
};
