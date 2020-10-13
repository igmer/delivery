import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminNewsEditPage } from './admin-news-edit.page';

const routes: Routes = [
  {
    path: '',
    component: AdminNewsEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminNewsEditPageRoutingModule {}
