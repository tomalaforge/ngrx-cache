import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from './state/product.actions';
import { selectLogs, selectProducts } from './state/product.selectors';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {

  products$ = this.store.select(selectProducts);
  logs$ = this.store.select(selectLogs);

  constructor(private store : Store) {}
  
  loadProduct() {
    this.store.dispatch(actions.loadProducts());
  }
}
