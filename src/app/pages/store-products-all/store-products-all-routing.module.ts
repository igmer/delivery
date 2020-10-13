import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreProductsAllPage } from './store-products-all.page';

const routes: Routes = [
  {
    path: '',
    component: StoreProductsAllPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreProductsAllPageRoutingModule {}
