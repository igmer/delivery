import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminCategoryListPageRoutingModule } from './admin-category-list-routing.module';

import { AdminCategoryListPage } from './admin-category-list.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminCategoryListPageRoutingModule,
    PipesModule
  ],
  declarations: [AdminCategoryListPage]
})
export class AdminCategoryListPageModule {}
