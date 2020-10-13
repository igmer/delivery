import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreHomePage } from './store-home.page';

const routes: Routes = [
  {
    path: '',
    component: StoreHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreHomePageRoutingModule {}
