import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminNewsListPageRoutingModule } from './admin-news-list-routing.module';

import { AdminNewsListPage } from './admin-news-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminNewsListPageRoutingModule
  ],
  declarations: [AdminNewsListPage]
})
export class AdminNewsListPageModule {}
