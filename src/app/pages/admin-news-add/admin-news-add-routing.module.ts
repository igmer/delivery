import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminNewsAddPage } from './admin-news-add.page';

const routes: Routes = [
  {
    path: '',
    component: AdminNewsAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminNewsAddPageRoutingModule {}
