import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoreProductsAllPageRoutingModule } from './store-products-all-routing.module';

import { StoreProductsAllPage } from './store-products-all.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreProductsAllPageRoutingModule,
    PipesModule,
    FontAwesomeModule
  ],
  declarations: [StoreProductsAllPage]
})
export class StoreProductsAllPageModule {}
