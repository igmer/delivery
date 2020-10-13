import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminUserEditPage } from './admin-user-edit.page';

const routes: Routes = [
  {
    path: '',
    component: AdminUserEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminUserEditPageRoutingModule {}
