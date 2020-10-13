import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoreCategorysPageRoutingModule } from './store-categorys-routing.module';

import { StoreCategorysPage } from './store-categorys.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreCategorysPageRoutingModule,
    PipesModule,
    FontAwesomeModule
  ],
  declarations: [StoreCategorysPage]
})
export class StoreCategorysPageModule {}
