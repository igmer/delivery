import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliveryPanelPageRoutingModule } from './delivery-panel-routing.module';

import { DeliveryPanelPage } from './delivery-panel.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeliveryPanelPageRoutingModule,
    FontAwesomeModule
  ],
  declarations: [DeliveryPanelPage]
})
export class DeliveryPanelPageModule {}
