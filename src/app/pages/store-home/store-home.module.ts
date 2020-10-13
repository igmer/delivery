import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoreHomePageRoutingModule } from './store-home-routing.module';

import { StoreHomePage } from './store-home.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreHomePageRoutingModule,
    PipesModule,
    FontAwesomeModule
  ],
  declarations: [StoreHomePage]
})
export class StoreHomePageModule {}
