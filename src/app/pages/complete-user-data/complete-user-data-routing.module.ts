import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompleteUserDataPage } from './complete-user-data.page';

const routes: Routes = [
  {
    path: '',
    component: CompleteUserDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompleteUserDataPageRoutingModule {}
