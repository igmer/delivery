import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminAddCategoryPageRoutingModule } from './admin-add-category-routing.module';

import { AdminAddCategoryPage } from './admin-add-category.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminAddCategoryPageRoutingModule
  ],
  declarations: [AdminAddCategoryPage]
})
export class AdminAddCategoryPageModule {}
