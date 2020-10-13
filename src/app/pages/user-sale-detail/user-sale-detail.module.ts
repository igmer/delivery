import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserSaleDetailPageRoutingModule } from './user-sale-detail-routing.module';

import { UserSaleDetailPage } from './user-sale-detail.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserSaleDetailPageRoutingModule,
    FontAwesomeModule
  ],
  declarations: [UserSaleDetailPage]
})
export class UserSaleDetailPageModule {}
