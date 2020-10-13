import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreCategorysPage } from './store-categorys.page';

const routes: Routes = [
  {
    path: '',
    component: StoreCategorysPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreCategorysPageRoutingModule {}
