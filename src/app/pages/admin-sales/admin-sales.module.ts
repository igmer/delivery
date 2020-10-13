import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminSalesPageRoutingModule } from './admin-sales-routing.module';

import { AdminSalesPage } from './admin-sales.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminSalesPageRoutingModule
  ],
  declarations: [AdminSalesPage]
})
export class AdminSalesPageModule {}
