import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminDeliveryListPageRoutingModule } from './admin-delivery-list-routing.module';

import { AdminDeliveryListPage } from './admin-delivery-list.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminDeliveryListPageRoutingModule,
    PipesModule
  ],
  declarations: [AdminDeliveryListPage]
})
export class AdminDeliveryListPageModule {}
