import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { getCacheExpirationProvider } from './cache.token';
import { ProductEffects } from './state/product.effects';
import { productFeature } from './state/product.reducer';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature(productFeature),
    EffectsModule.forRoot([ProductEffects])
  ],
  providers: [getCacheExpirationProvider(1)],
  bootstrap: [AppComponent]
})
export class AppModule { }
