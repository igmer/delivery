import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoreCartModalPageRoutingModule } from './store-cart-modal-routing.module';

import { StoreCartModalPage } from './store-cart-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreCartModalPageRoutingModule
  ],
  declarations: [StoreCartModalPage]
})
export class StoreCartModalPageModule {}
