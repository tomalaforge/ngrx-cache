import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { CACHE_DURATION } from '../cache.token';
import { ProductService } from '../product.service';
import { isPast, newDateInXMinutes } from '../utils';
import * as actions from './product.actions';

@Injectable()
export class ProductEffects {

  cacheExpirationTime: Date | undefined = undefined;

  loadProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        actions.loadProducts
      ),
      mergeMap(() => {
        if (
          (this.cacheExpirationTime && isPast(this.cacheExpirationTime)) ||
          !this.cacheExpirationTime
        ) {
          return this.productService.getProducts().pipe(
            map((products) => {
              this.cacheExpirationTime = newDateInXMinutes(this.cacheDuration);
              return actions.loadProductsSuccess({ products });
            }),
            catchError((error) => of(actions.loadProductsFailure({ error })))
          );
        } else {
          return of(actions.NO_OP_CACHE());
        }
      })
    );
  });

  constructor(private actions$: Actions, private productService: ProductService, @Inject(CACHE_DURATION) private cacheDuration: number) {}

}

// @Injectable()
// export class ProductEffects {

//   loadProduct$ = createEffect(() => {
//     return this.actions$.pipe(
//       ofType(actions.loadProducts),
//       mergeMap(() => this.productService.getProducts().pipe(
//             map((products) => actions.loadProductsSuccess({ products })),
//             catchError((error) => of(actions.loadProductsFailure({ error })))
//       ))
//     );
//   });

//   constructor(private actions$: Actions, private productService: ProductService) {}

// }

// @Injectable()
// export class ProductEffects {



//     loadProduct$ = createEffect(() => {
//     return this.actions$.pipe(
//       ofType(actions.loadProducts),
//       concatLatestFrom(() => this.store.select(selectProducts)),
//       mergeMap(([, products]) => {
//         if (products?.length === 0) {
//           return this.productService.getProducts().pipe(
//             map((products) => {
//               return actions.loadProductsSuccess({ products });
//             }),
//             catchError((error) => of(actions.loadProductsFailure({ error })))
//           );
//         } else {
//           return of(actions.NO_OP_CACHE());
//         }
//       })
//     );
//   });

//   constructor(private actions$: Actions, private store: Store, private productService: ProductService) {}

// }
