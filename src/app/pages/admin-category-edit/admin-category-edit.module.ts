import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminCategoryEditPageRoutingModule } from './admin-category-edit-routing.module';

import { AdminCategoryEditPage } from './admin-category-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminCategoryEditPageRoutingModule
  ],
  declarations: [AdminCategoryEditPage]
})
export class AdminCategoryEditPageModule {}
