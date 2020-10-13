import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserSaleDetailPage } from './user-sale-detail.page';

const routes: Routes = [
  {
    path: '',
    component: UserSaleDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserSaleDetailPageRoutingModule {}
