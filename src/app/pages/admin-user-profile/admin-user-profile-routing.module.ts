import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminUserProfilePage } from './admin-user-profile.page';

const routes: Routes = [
  {
    path: '',
    component: AdminUserProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminUserProfilePageRoutingModule {}
