import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminNewsEditPageRoutingModule } from './admin-news-edit-routing.module';

import { AdminNewsEditPage } from './admin-news-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminNewsEditPageRoutingModule
  ],
  declarations: [AdminNewsEditPage]
})
export class AdminNewsEditPageModule {}
