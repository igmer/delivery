import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminDeliveryListPage } from './admin-delivery-list.page';

const routes: Routes = [
  {
    path: '',
    component: AdminDeliveryListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminDeliveryListPageRoutingModule {}
