import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import * as actions from './product.actions';
import { Product } from './product.model';

export interface ProductState {
  products: EntityState<Product>,
  log: string[],
  loading: boolean;
  error: string | undefined;
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>();

export const initialState: ProductState = {
  products: adapter.getInitialState(),
  log: [],
  loading: false,
  error: undefined
};


const reducer = createReducer(
  initialState,
  on(
    actions.loadProducts,
    (state): ProductState => ({ ...state, log: [...state.log,'load product'], loading: true })
  ),
  on(
    actions.NO_OP_CACHE,
    (state): ProductState => ({ ...state, log: [...state.log,'load product from cache'], loading: false })
  ),
  on(actions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products: adapter.setAll(products, state.products),
    log: [...state.log,'load product sucess from backend'],
    loading: false
  })
  ),
  on(
    actions.loadProductsFailure,
    (state, {error}): ProductState => ({ ...state, loading: false, error })
  )
);

export const productFeature = createFeature({
  name: 'products',
  reducer
})

