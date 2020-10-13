import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminCategoryEditPage } from './admin-category-edit.page';

const routes: Routes = [
  {
    path: '',
    component: AdminCategoryEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminCategoryEditPageRoutingModule {}
