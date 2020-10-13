import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminProductEditPageRoutingModule } from './admin-product-edit-routing.module';

import { AdminProductEditPage } from './admin-product-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminProductEditPageRoutingModule
  ],
  declarations: [AdminProductEditPage]
})
export class AdminProductEditPageModule {}
