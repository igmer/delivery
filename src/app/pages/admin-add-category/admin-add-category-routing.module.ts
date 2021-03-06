import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminAddCategoryPage } from './admin-add-category.page';

const routes: Routes = [
  {
    path: '',
    component: AdminAddCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminAddCategoryPageRoutingModule {}
