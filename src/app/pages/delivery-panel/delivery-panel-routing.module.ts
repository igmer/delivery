import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliveryPanelPage } from './delivery-panel.page';

const routes: Routes = [
  {
    path: '',
    component: DeliveryPanelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryPanelPageRoutingModule {}
