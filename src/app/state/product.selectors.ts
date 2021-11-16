import { createSelector } from '@ngrx/store';
import { adapter, productFeature } from './product.reducer';

// export const selectProductsState = createFeatureSelector<ProductState>(productsFeatureKey);

const { selectAll } = adapter.getSelectors();

export const selectProducts = createSelector(productFeature.selectProducts, selectAll);
export const selectLogs = productFeature.selectLog;