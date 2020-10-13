import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoreProductsPageRoutingModule } from './store-products-routing.module';

import { StoreProductsPage } from './store-products.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreProductsPageRoutingModule,
    PipesModule,
    FontAwesomeModule
  ],
  declarations: [StoreProductsPage]
})
export class StoreProductsPageModule {}
