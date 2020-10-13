import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompleteUserDataPageRoutingModule } from './complete-user-data-routing.module';

import { CompleteUserDataPage } from './complete-user-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompleteUserDataPageRoutingModule
  ],
  declarations: [CompleteUserDataPage]
})
export class CompleteUserDataPageModule {}
