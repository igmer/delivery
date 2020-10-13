import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminUserListPage } from './admin-user-list.page';

const routes: Routes = [
  {
    path: '',
    component: AdminUserListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminUserListPageRoutingModule {}
