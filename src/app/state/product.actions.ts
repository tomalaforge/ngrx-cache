import { createAction, props } from "@ngrx/store";
import { Product } from "./product.model";

export const loadProducts = createAction('[App Component] Load products');
export const loadProductsSuccess = createAction(
  '[Product Effect] Load product SUCCESS',
  props<{ products: Product[] }>()
);
export const loadProductsFailure = createAction(
  '[Product Effect] Load product FAILURE',
  props<{ error: string }>()
);

export const NO_OP_CACHE = createAction('[Product Effect] No operation: cache');
