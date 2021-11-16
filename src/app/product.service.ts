import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from './state/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

   getProducts = (): Observable<Product[]> =>  of([
      {
        id: 1,
        name: 'table'
      },
      {
        id: 2,
        name: 'stool'
      }
    ])
  
}
