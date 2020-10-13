import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreCartModalPage } from './store-cart-modal.page';

const routes: Routes = [
  {
    path: '',
    component: StoreCartModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreCartModalPageRoutingModule {}
