import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminProductListPage } from './admin-product-list.page';

const routes: Routes = [
  {
    path: '',
    component: AdminProductListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminProductListPageRoutingModule {}
