import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserEditProfilePage } from './user-edit-profile.page';

const routes: Routes = [
  {
    path: '',
    component: UserEditProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserEditProfilePageRoutingModule {}
