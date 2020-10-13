import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminNewsListPage } from './admin-news-list.page';

const routes: Routes = [
  {
    path: '',
    component: AdminNewsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminNewsListPageRoutingModule {}
