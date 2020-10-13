import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminCategoryListPage } from './admin-category-list.page';

const routes: Routes = [
  {
    path: '',
    component: AdminCategoryListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminCategoryListPageRoutingModule {}
