import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminSalesPage } from './admin-sales.page';

const routes: Routes = [
  {
    path: '',
    component: AdminSalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminSalesPageRoutingModule {}
