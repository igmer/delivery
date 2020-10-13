import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminNewsAddPageRoutingModule } from './admin-news-add-routing.module';

import { AdminNewsAddPage } from './admin-news-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminNewsAddPageRoutingModule
  ],
  declarations: [AdminNewsAddPage]
})
export class AdminNewsAddPageModule {}
